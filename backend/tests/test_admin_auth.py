import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAdminAuth:
    """Test admin authentication endpoints"""
    
    def test_admin_login_with_valid_credentials(self):
        """Test admin login with correct email and password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": "admin@example.com", "password": "test1234"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "token" in data
        assert data["message"] == "Login successful"
    
    def test_admin_login_with_wrong_password(self):
        """Test admin login with wrong password returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": "admin@example.com", "password": "wrongpassword"}
        )
        assert response.status_code == 401
        data = response.json()
        assert "Invalid password" in data["detail"]
    
    def test_admin_login_with_unauthorized_email(self):
        """Test admin login with unauthorized email returns 403"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": "unauthorized@example.com", "password": "test1234"}
        )
        assert response.status_code == 403
        data = response.json()
        assert "not authorized" in data["detail"].lower()
    
    def test_admin_login_with_invalid_email_format(self):
        """Test admin login with invalid email format returns 422"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": "invalid-email", "password": "test1234"}
        )
        assert response.status_code == 422
    
    def test_token_validation_with_valid_token(self):
        """Test token validation with a valid token"""
        # First login to get a token
        login_response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": "admin@example.com", "password": "test1234"}
        )
        assert login_response.status_code == 200
        token = login_response.json()["token"]
        
        # Validate the token
        validate_response = requests.post(
            f"{BASE_URL}/api/admin/validate-token",
            json={"token": token}
        )
        assert validate_response.status_code == 200
        data = validate_response.json()
        assert data["valid"] == True
        assert data["email"] == "admin@example.com"
    
    def test_token_validation_with_invalid_token(self):
        """Test token validation with an invalid token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/validate-token",
            json={"token": "invalid-token-12345"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == False
    
    def test_admin_logout(self):
        """Test admin logout invalidates the token"""
        # First login to get a token
        login_response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": "admin@example.com", "password": "test1234"}
        )
        assert login_response.status_code == 200
        token = login_response.json()["token"]
        
        # Logout
        logout_response = requests.post(
            f"{BASE_URL}/api/admin/logout",
            json={"token": token}
        )
        assert logout_response.status_code == 200
        assert logout_response.json()["success"] == True
        
        # Token should now be invalid
        validate_response = requests.post(
            f"{BASE_URL}/api/admin/validate-token",
            json={"token": token}
        )
        assert validate_response.status_code == 200
        assert validate_response.json()["valid"] == False
