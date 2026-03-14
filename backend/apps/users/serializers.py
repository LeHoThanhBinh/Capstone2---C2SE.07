from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.validators import UniqueValidator

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name')

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Email đã tồn tại.")]
    )
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    fullName = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'fullName', 'first_name', 'last_name', 'role')
        extra_kwargs = {
            'username': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False}
        }

    def create(self, validated_data):
        email = validated_data['email']
        username = validated_data.get('username')
        full_name = validated_data.get('fullName', '')
        
        first_name = validated_data.get('first_name', '')
        last_name = validated_data.get('last_name', '')

        # Tách chuỗi fullName thành first_name và last_name nếu có
        if full_name and not (first_name or last_name):
            parts = full_name.strip().split(' ', 1)
            last_name = parts[0]
            if len(parts) > 1:
                first_name = parts[1]
        
        # Nếu không có username, tự động lấy phần trước @ của email
        if not username:
            username = email.split('@')[0]
            
        # Kiểm tra nếu tên đăng nhập đã tồn tại
        from rest_framework.exceptions import ValidationError
        if User.objects.filter(username=username).exists():
            raise ValidationError({"username": ["Tên đăng nhập này đã tồn tại, vui lòng chọn tên khác."]})
                
        user = User.objects.create_user(
            username=username,
            email=email,
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
            role=validated_data.get('role', 'USER')
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
