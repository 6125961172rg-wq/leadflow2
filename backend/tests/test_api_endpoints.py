import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestLeadsAPI:
    """Test leads API endpoints"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Store created lead IDs for cleanup"""
        self.created_lead_ids = []
        yield
        # Cleanup: Delete created leads
        for lead_id in self.created_lead_ids:
            try:
                requests.delete(f"{BASE_URL}/api/leads/{lead_id}")
            except:
                pass
    
    def test_create_lead_valid(self):
        """Test creating a lead with valid data"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        lead_data = {
            "name": "TEST_Lead User",
            "email": unique_email,
            "phone": "+1234567890",
            "company": "Test Company",
            "message": "This is a test lead message"
        }
        response = requests.post(f"{BASE_URL}/api/leads/", json=lead_data)
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == lead_data["name"]
        assert data["email"] == lead_data["email"]
        assert data["status"] == "new"
        assert "id" in data
        self.created_lead_ids.append(data["id"])
        
        # Verify lead was actually created by fetching it
        get_response = requests.get(f"{BASE_URL}/api/leads/{data['id']}")
        assert get_response.status_code == 200
        fetched_lead = get_response.json()
        assert fetched_lead["email"] == unique_email
    
    def test_create_lead_invalid_email(self):
        """Test creating a lead with invalid email returns 422"""
        lead_data = {
            "name": "Test User",
            "email": "invalid-email",
            "phone": "+1234567890",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/api/leads/", json=lead_data)
        assert response.status_code == 422
    
    def test_get_all_leads(self):
        """Test getting all leads"""
        response = requests.get(f"{BASE_URL}/api/leads/")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_delete_lead(self):
        """Test deleting a lead"""
        # First create a lead
        unique_email = f"test_delete_{uuid.uuid4().hex[:8]}@example.com"
        lead_data = {
            "name": "TEST_Delete Lead",
            "email": unique_email,
            "phone": "+1234567890",
            "message": "To be deleted"
        }
        create_response = requests.post(f"{BASE_URL}/api/leads/", json=lead_data)
        assert create_response.status_code == 201
        lead_id = create_response.json()["id"]
        
        # Delete the lead
        delete_response = requests.delete(f"{BASE_URL}/api/leads/{lead_id}")
        assert delete_response.status_code == 204
        
        # Verify lead is deleted
        get_response = requests.get(f"{BASE_URL}/api/leads/{lead_id}")
        assert get_response.status_code == 404


class TestQuotesAPI:
    """Test quotes API endpoints"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Store created quote IDs for cleanup"""
        self.created_quote_ids = []
        yield
        # Cleanup
        for quote_id in self.created_quote_ids:
            try:
                requests.delete(f"{BASE_URL}/api/quotes/{quote_id}")
            except:
                pass
    
    def test_create_quote_valid(self):
        """Test creating a quote request with valid data"""
        unique_email = f"test_quote_{uuid.uuid4().hex[:8]}@example.com"
        quote_data = {
            "name": "TEST_Quote User",
            "email": unique_email,
            "phone": "+1234567890",
            "company": "Test Company",
            "service_type": "Web Development",
            "project_description": "Test project description",
            "budget_range": "$5000-$10000",
            "timeline": "1-2 months"
        }
        response = requests.post(f"{BASE_URL}/api/quotes/", json=quote_data)
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == quote_data["name"]
        assert data["service_type"] == "Web Development"
        assert data["status"] == "pending"
        assert "id" in data
        self.created_quote_ids.append(data["id"])
        
        # Verify quote was created
        get_response = requests.get(f"{BASE_URL}/api/quotes/{data['id']}")
        assert get_response.status_code == 200
    
    def test_get_all_quotes(self):
        """Test getting all quotes"""
        response = requests.get(f"{BASE_URL}/api/quotes/")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestNewsletterAPI:
    """Test newsletter API endpoints"""
    
    def test_subscribe_newsletter_valid(self):
        """Test subscribing to newsletter with valid email"""
        unique_email = f"test_news_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": unique_email}
        )
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == unique_email
        assert data["status"] == "active"
    
    def test_subscribe_newsletter_duplicate(self):
        """Test subscribing with duplicate email returns 409"""
        unique_email = f"test_dup_{uuid.uuid4().hex[:8]}@example.com"
        # First subscription
        first_response = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": unique_email}
        )
        assert first_response.status_code == 201
        
        # Second subscription should conflict
        second_response = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": unique_email}
        )
        assert second_response.status_code == 409
    
    def test_get_all_subscriptions(self):
        """Test getting all newsletter subscriptions"""
        response = requests.get(f"{BASE_URL}/api/newsletter/")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestHealthCheck:
    """Test basic API health"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        assert response.json()["message"] == "Hello World"
