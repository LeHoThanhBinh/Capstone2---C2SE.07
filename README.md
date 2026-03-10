# EduTutor AI - Hệ Thống Gia Sư AI Thông Minh

Một nền tảng học tập thông minh sử dụng AI, cung cấp gia sư ảo cho 6 môn học trung học cơ sở.

## Tính Năng Chính

- **Chatbot AI Tutor**: Gia sư ảo tương tác cho 6 môn học (Toán, Vật lý, Hóa học, Lịch sử, Địa lý, Công dân)
- **RAG Pipeline**: Kỹ thuật Retrieval-Augmented Generation tự các sách giáo khoa
- **Personalized Learning Path**: Lộ trình học tập cá nhân hóa theo trình độ từng học sinh
- **Quiz & Assessment**: Hệ thống kiểm tra và đánh giá thành tích
- **Admin Dashboard**: Bảng điều khiển quản trị

## Công Nghệ

### Backend
- Django 4.x
- Django REST Framework
- PostgreSQL
- Vertex AI / Google Cloud

### Frontend
- React.js
- Vite
- Axios

### Infrastructure
- Docker & Docker Compose
- Nginx
- GCP

## Cài Đặt Nhanh

### Yêu Cầu
- Docker & Docker Compose
- Python 3.11+
- Node.js 18+

### Bước 1: Clone và Setup
```bash
git clone <repo-url>
cd edututor-ai
cp .env.example .env
```

### Bước 2: Chỉnh Sửa .env
Chỉnh sửa các giá trị trong file `.env`:
- `GCP_PROJECT_ID`
- `VERTEX_API_KEY`
- Database settings

### Bước 3: Khởi Động với Docker Compose
```bash
docker-compose up -d
```

### Bước 4: Khởi Tạo Database
```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

## Cấu Trúc Dự Án

```
edututor-ai/
├── docs/              # Tài liệu dự án
├── infrastructure/    # Cấu hình deployment
├── backend/          # Django REST API
├── frontend/         # React application
└── database/         # Database migrations
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất

### Chat
- `POST /api/chat/message` - Gửi tin nhắn tới AI tutor
- `GET /api/chat/history` - Lấy lịch sử trò chuyện

### Quiz
- `GET /api/quiz/` - Danh sách quiz
- `POST /api/quiz/submit` - Nộp bài làm

### Learning Path
- `GET /api/learning/path` - Lấy lộ trình học

## Hướng Dẫn Phát Triển

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Testing

```bash
# Backend
cd backend
python manage.py test

# Frontend
cd frontend
npm test
```

## Deployment

Xem tài liệu chi tiết trong `docs/deployment.md`

## Contributing

Vui lòng đọc `CONTRIBUTING.md` trước khi submit pull request.

## License

MIT License - xem `LICENSE` file chi tiết

## Liên Hệ

Để câu hỏi hoặc đóng góp, vui lòng tạo issue hoặc liên hệ qua email.
