from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# 1. API ĐĂNG KÝ (Giữ nguyên như cũ)
@csrf_exempt
def register_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Nhận được data Đăng Ký:", data)
            return JsonResponse({
                "message": "Tạo tài khoản thành công cho " + data.get('fullName', 'User'),
                "status": "success"
            }, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"message": "Chỉ nhận POST"}, status=405)

# 2. API ĐĂNG NHẬP (Mới thêm vào)
@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            
            print(f"Nhận được yêu cầu Đăng Nhập từ email: {email}")
            
            # (Sau này bạn sẽ viết code check Database thật ở đây)
            # Tạm thời trả về một Token giả lập để Angular chạy thông luồng
            if email and password:
                return JsonResponse({
                    "message": "Đăng nhập thành công!",
                    "access_token": "chuoi-token-gia-lap-de-test-angular",
                    "user": {"email": email}
                }, status=200)
            else:
                return JsonResponse({"error": "Thiếu email hoặc mật khẩu"}, status=400)
                
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"message": "Chỉ nhận POST"}, status=405)

# 3. DANH SÁCH ĐƯỜNG DẪN
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register', register_api), 
    path('api/auth/login', login_api), # Đã mở thêm cửa cho Login
]