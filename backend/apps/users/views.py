from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer, CustomUserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Tạo token tự động khi đăng ký
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "message": "Tạo tài khoản thành công!",
            "user": CustomUserSerializer(user).data,
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh)
        }, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        # Custom_User sử dụng email làm định danh đăng nhập nên cần query username
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user_obj = User.objects.filter(email=email).first()
        
        if user_obj:
            user = authenticate(username=user_obj.username, password=password)
        else:
            user = None

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Đăng nhập thành công!",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "user": CustomUserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Email hoặc mật khẩu không chính xác."}, status=status.HTTP_401_UNAUTHORIZED)

class UserRoleView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
    
    def get_object(self):
        return self.request.user
