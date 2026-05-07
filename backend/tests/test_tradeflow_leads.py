"""
TradeFlow Marketing - Lead API Tests
Tests for territory claim form submission and lead management
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestLeadsAPI:
    """Tests for /api/leads endpoints - Territory claim form submissions"""
    
    def test_create_lead_success(self):
        """Test creating a new territory claim lead"""
        unique_id = str(uuid.uuid4())[:8]
        lead_data = {
            "name": f"TEST_John Smith {unique_id}",
            "email": f"test_{unique_id}@example.com",
            "phone": "555-123-4567",
            "company": "Smith Roofing LLC",
            "message": "Territory Claim Request\n\nTrade: Roofing\nCity: Austin, TX\nTeam Size: small\nSelected Plan: growth"
        }
        
        response = requests.post(f"{BASE_URL}/api/leads/", json=lead_data)
        
        assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Response should contain lead id"
        assert data["name"] == lead_data["name"], "Name should match"
        assert data["email"] == lead_data["email"], "Email should match"
        assert data["phone"] == lead_data["phone"], "Phone should match"
        assert data["company"] == lead_data["company"], "Company should match"
        assert "message" in data, "Response should contain message"
        assert "created_at" in data, "Response should contain created_at timestamp"
        
        # Store lead_id for cleanup
        self.__class__.created_lead_id = data["id"]
        print(f"Created lead with ID: {data['id']}")
    
    def test_create_lead_minimal_fields(self):
        """Test creating lead with minimal required fields (simulating form with only required fields)"""
        unique_id = str(uuid.uuid4())[:8]
        lead_data = {
            "name": f"TEST_Jane Doe {unique_id}",
            "email": f"test_minimal_{unique_id}@placeholder.com",
            "phone": "Not provided",
            "company": "",
            "message": "Territory Claim Request\n\nTrade: Plumbing\nCity: Denver, CO\nTeam Size: \nSelected Plan: starter"
        }
        
        response = requests.post(f"{BASE_URL}/api/leads/", json=lead_data)
        
        assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["name"] == lead_data["name"]
        assert data["email"] == lead_data["email"]
        print(f"Created minimal lead with ID: {data['id']}")
    
    def test_create_lead_missing_required_fields(self):
        """Test that creating lead without required fields fails"""
        # Missing name and email
        lead_data = {
            "phone": "555-000-0000"
        }
        
        response = requests.post(f"{BASE_URL}/api/leads/", json=lead_data)
        
        # Should fail validation
        assert response.status_code == 422, f"Expected 422 validation error, got {response.status_code}"
        print("Correctly rejected lead with missing required fields")
    
    def test_create_lead_invalid_email(self):
        """Test that invalid email format is rejected"""
        lead_data = {
            "name": "TEST_Invalid Email",
            "email": "not-an-email",
            "phone": "555-000-0000"
        }
        
        response = requests.post(f"{BASE_URL}/api/leads/", json=lead_data)
        
        # Should fail email validation
        assert response.status_code == 422, f"Expected 422 for invalid email, got {response.status_code}"
        print("Correctly rejected lead with invalid email format")


class TestHealthEndpoints:
    """Tests for basic API health and status endpoints"""
    
    def test_api_root(self):
        """Test API root endpoint returns expected response"""
        response = requests.get(f"{BASE_URL}/api/")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "message" in data, "Response should contain message"
        assert data["message"] == "Hello World", "Message should be 'Hello World'"
        print("API root endpoint working correctly")
    
    def test_status_endpoint_post(self):
        """Test status check creation"""
        status_data = {
            "client_name": "TEST_TradeFlow_Client"
        }
        
        response = requests.post(f"{BASE_URL}/api/status", json=status_data)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Response should contain id"
        assert data["client_name"] == status_data["client_name"], "Client name should match"
        assert "timestamp" in data, "Response should contain timestamp"
        print(f"Status check created with ID: {data['id']}")
    
    def test_status_endpoint_get(self):
        """Test retrieving status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"Retrieved {len(data)} status checks")


class TestNewsletterAPI:
    """Tests for newsletter subscription endpoint"""
    
    def test_newsletter_subscribe(self):
        """Test newsletter subscription"""
        unique_id = str(uuid.uuid4())[:8]
        subscribe_data = {
            "email": f"test_newsletter_{unique_id}@example.com"
        }
        
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json=subscribe_data)
        
        # Should succeed
        assert response.status_code in [200, 201], f"Expected 200/201, got {response.status_code}: {response.text}"
        print(f"Newsletter subscription successful for {subscribe_data['email']}")


class TestQuotesAPI:
    """Tests for quote request endpoint"""
    
    def test_create_quote_request(self):
        """Test creating a quote request"""
        unique_id = str(uuid.uuid4())[:8]
        quote_data = {
            "name": f"TEST_Quote User {unique_id}",
            "email": f"test_quote_{unique_id}@example.com",
            "phone": "555-999-8888",
            "company": "Test Company",
            "service_type": "Google Ads Management",
            "budget_range": "$1,000-$2,000",
            "timeline": "1-2 months",
            "project_description": "Looking for help with Google Ads for my roofing business"
        }
        
        response = requests.post(f"{BASE_URL}/api/quotes/", json=quote_data)
        
        assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Response should contain quote id"
        assert data["name"] == quote_data["name"], "Name should match"
        assert data["email"] == quote_data["email"], "Email should match"
        print(f"Quote request created with ID: {data['id']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
