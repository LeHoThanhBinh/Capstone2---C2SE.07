from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta

# 1. CẤU HÌNH DATABASE (SQLite)
SQLALCHEMY_DATABASE_URL = "sqlite:///./edututor.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. KHỞI TẠO APP & CORS (Cho phép Angular gọi API)
app = FastAPI(title="EduTutor API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. ĐỊNH NGHĨA MODEL (Bảng lưu trong Database)
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# Tự động tạo bảng nếu chưa có
Base.metadata.create_all(bind=engine)

# 4. ĐỊNH NGHĨA SCHEMA (Dữ liệu Frontend gửi lên)
class UserRegister(BaseModel):
    fullName: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# 5. CẤU HÌNH BẢO MẬT (Băm mật khẩu & JWT Token)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "Tuan_EduTutor_Secret_Key_2026" # Khóa bí mật để tạo Token
ALGORITHM = "HS256"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 6. VIẾT API ENDPOINTS
@app.post("/api/auth/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    # Kiểm tra email tồn tại chưa
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email này đã được đăng ký!")
    
    # Băm mật khẩu và lưu vào DB
    hashed_pwd = pwd_context.hash(user.password)
    new_user = User(full_name=user.fullName, email=user.email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    return {"message": "Đăng ký thành công"}

@app.post("/api/auth/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    # Tìm user theo email
    db_user = db.query(User).filter(User.email == user.email).first()
    
    # Kiểm tra email có tồn tại và mật khẩu có khớp không
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Sai email hoặc mật khẩu. Vui lòng thử lại!")
    
    # Tạo Token giả định hạn sử dụng 1 ngày
    expire = datetime.utcnow() + timedelta(days=1)
    to_encode = {"sub": db_user.email, "exp": expire}
    access_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return {
        "token": access_token, 
        "user": {"name": db_user.full_name, "email": db_user.email}
    }