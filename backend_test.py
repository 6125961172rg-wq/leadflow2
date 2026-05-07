import requests
import sys
from datetime import datetime

class LeadGenerationAPITester:
    def __init__(self, base_url="https://audience-grow-10.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.lead_id = None
        self.quote_id = None
        self.test_email = f"test.{datetime.now().strftime('%H%M%S')}@example.com"

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    try:
                        response_data = response.json()
                        print(f"Response Data: {response_data}")
                        return success, response_data
                    except:
                        print(f"Response Text: {response.text}")
                        return success, {}
                return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response Text: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test basic API connectivity"""
        success, response = self.run_test(
            "API Health Check",
            "GET", 
            "api/",
            200
        )
        return success

    def test_create_lead(self):
        """Test lead creation"""
        test_lead = {
            "name": "John Test User",
            "email": f"test.user.{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+1 (555) 123-4567",
            "company": "Test Company",
            "message": "This is a test message for lead generation testing"
        }
        
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "api/leads/",
            201,
            data=test_lead
        )
        
        if success and response.get('id'):
            self.lead_id = response['id']
            print(f"Created lead with ID: {self.lead_id}")
            
            # Validate response structure
            required_fields = ['id', 'name', 'email', 'phone', 'message', 'created_at', 'status']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing required field in response: {field}")
                    return False
            
            print(f"✅ Response contains all required fields")
        return success

    def test_create_lead_validation(self):
        """Test lead creation validation with missing required fields"""
        invalid_lead = {
            "name": "",  # Empty name should fail
            "email": "invalid-email",  # Invalid email format
            "phone": "",  # Empty phone should fail
            "message": ""  # Empty message should fail
        }
        
        success, response = self.run_test(
            "Create Lead - Validation Error",
            "POST",
            "api/leads/",
            422,  # Validation error
            data=invalid_lead
        )
        
        # In this case, we expect failure (422), so success means the validation is working
        return success

    def test_get_leads(self):
        """Test getting all leads"""
        success, response = self.run_test(
            "Get All Leads",
            "GET",
            "api/leads/",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} leads")
            return True
        return success

    def test_get_single_lead(self):
        """Test getting a specific lead by ID"""
        if not self.lead_id:
            print("❌ No lead ID available for testing")
            return False
            
        success, response = self.run_test(
            "Get Single Lead",
            "GET",
            f"api/leads/{self.lead_id}",
            200
        )
        return success

    def test_update_lead_status(self):
        """Test updating lead status"""
        if not self.lead_id:
            print("❌ No lead ID available for testing")
            return False
        
        # The API expects status as query parameter
        url = f"{self.base_url}/api/leads/{self.lead_id}/status?status=contacted"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing Update Lead Status...")
        print(f"URL: {url}")
        
        try:
            response = requests.patch(url, headers=headers, timeout=10)
            
            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == 200
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if response_data.get('status') == 'contacted':
                        print(f"✅ Lead status updated successfully")
                    return True
                except:
                    return True
            else:
                print(f"❌ Failed - Expected 200, got {response.status_code}")
                print(f"Response Text: {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def test_delete_lead(self):
        """Test deleting a lead"""
        if not self.lead_id:
            print("❌ No lead ID available for testing")
            return False
            
        success, response = self.run_test(
            "Delete Lead",
            "DELETE",
            f"api/leads/{self.lead_id}",
            204
        )
        return success

    # ===================
    # NEWSLETTER TESTS
    # ===================
    
    def test_newsletter_subscribe(self):
        """Test newsletter subscription"""
        test_subscription = {
            "email": self.test_email
        }
        
        success, response = self.run_test(
            "Newsletter Subscribe",
            "POST",
            "api/newsletter/subscribe",
            201,
            data=test_subscription
        )
        
        if success:
            # Validate response structure
            required_fields = ['id', 'email', 'created_at', 'status']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing required field in response: {field}")
                    return False
            
            if response.get('status') != 'active':
                print(f"❌ Expected status 'active', got '{response.get('status')}'")
                return False
                
            print(f"✅ Newsletter subscription successful for {response.get('email')}")
        return success

    def test_newsletter_duplicate_subscribe(self):
        """Test duplicate newsletter subscription (should return conflict)"""
        test_subscription = {
            "email": self.test_email
        }
        
        success, response = self.run_test(
            "Newsletter Subscribe - Duplicate",
            "POST",
            "api/newsletter/subscribe",
            409,  # Conflict expected
            data=test_subscription
        )
        return success

    def test_newsletter_invalid_email(self):
        """Test newsletter subscription with invalid email"""
        test_subscription = {
            "email": "invalid-email-format"
        }
        
        success, response = self.run_test(
            "Newsletter Subscribe - Invalid Email",
            "POST",
            "api/newsletter/subscribe",
            422,  # Validation error expected
            data=test_subscription
        )
        return success

    def test_get_newsletter_subscriptions(self):
        """Test getting all newsletter subscriptions"""
        success, response = self.run_test(
            "Get Newsletter Subscriptions",
            "GET",
            "api/newsletter/",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} newsletter subscriptions")
            # Check if our test email is in the list
            emails = [sub.get('email') for sub in response]
            if self.test_email in emails:
                print(f"✅ Test email found in subscriptions list")
            else:
                print(f"⚠️ Test email not found in subscriptions list")
        return success

    def test_newsletter_unsubscribe(self):
        """Test newsletter unsubscription"""
        success, response = self.run_test(
            "Newsletter Unsubscribe",
            "DELETE",
            f"api/newsletter/{self.test_email}/unsubscribe",
            204  # No content expected
        )
        return success

    def test_newsletter_unsubscribe_not_found(self):
        """Test newsletter unsubscription for non-existent email"""
        non_existent_email = f"notfound.{datetime.now().strftime('%H%M%S')}@example.com"
        success, response = self.run_test(
            "Newsletter Unsubscribe - Not Found",
            "DELETE",
            f"api/newsletter/{non_existent_email}/unsubscribe",
            404  # Not found expected
        )
        return success

    # ===================
    # QUOTE TESTS
    # ===================
    
    def test_create_quote_request(self):
        """Test quote request creation"""
        test_quote = {
            "name": "Jane Business Owner",
            "email": f"quote.{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+1 (555) 987-6543",
            "company": "Business Solutions Inc",
            "service_type": "Web Development",
            "budget_range": "$10,000 - $25,000",
            "timeline": "3-6 months",
            "project_description": "Looking for a complete website redesign with modern UI/UX and e-commerce functionality. Need responsive design and SEO optimization.",
            "additional_requirements": "Monthly progress reports and training for content management"
        }
        
        success, response = self.run_test(
            "Create Quote Request",
            "POST",
            "api/quotes/",
            201,
            data=test_quote
        )
        
        if success and response.get('id'):
            self.quote_id = response['id']
            print(f"Created quote request with ID: {self.quote_id}")
            
            # Validate response structure
            required_fields = ['id', 'name', 'email', 'phone', 'service_type', 'project_description', 'created_at', 'status']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing required field in response: {field}")
                    return False
            
            if response.get('status') != 'pending':
                print(f"❌ Expected initial status 'pending', got '{response.get('status')}'")
                return False
                
            print(f"✅ Quote request created successfully")
        return success

    def test_create_quote_request_validation(self):
        """Test quote request creation with invalid data"""
        invalid_quote = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email format
            "phone": "",  # Empty phone
            "service_type": "",  # Empty service type
            "project_description": ""  # Empty description
        }
        
        success, response = self.run_test(
            "Create Quote Request - Validation Error",
            "POST",
            "api/quotes/",
            422,  # Validation error expected
            data=invalid_quote
        )
        return success

    def test_get_quote_requests(self):
        """Test getting all quote requests"""
        success, response = self.run_test(
            "Get All Quote Requests",
            "GET",
            "api/quotes/",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} quote requests")
        return success

    def test_get_single_quote_request(self):
        """Test getting a specific quote request by ID"""
        if not self.quote_id:
            print("❌ No quote ID available for testing")
            return False
            
        success, response = self.run_test(
            "Get Single Quote Request",
            "GET",
            f"api/quotes/{self.quote_id}",
            200
        )
        
        if success and response.get('id') == self.quote_id:
            print(f"✅ Retrieved correct quote request")
        return success

    def test_update_quote_status(self):
        """Test updating quote request status"""
        if not self.quote_id:
            print("❌ No quote ID available for testing")
            return False
        
        # Test each valid status
        valid_statuses = ["reviewed", "quoted", "accepted"]
        for status in valid_statuses:
            url = f"{self.base_url}/api/quotes/{self.quote_id}/status?status={status}"
            headers = {'Content-Type': 'application/json'}
            
            self.tests_run += 1
            print(f"\n🔍 Testing Update Quote Status to '{status}'...")
            print(f"URL: {url}")
            
            try:
                response = requests.patch(url, headers=headers, timeout=10)
                
                print(f"Response Status: {response.status_code}")
                
                success = response.status_code == 200
                if success:
                    self.tests_passed += 1
                    print(f"✅ Passed - Status: {response.status_code}")
                    try:
                        response_data = response.json()
                        if response_data.get('status') == status:
                            print(f"✅ Quote status updated to '{status}' successfully")
                        else:
                            print(f"❌ Status not updated correctly")
                            return False
                    except:
                        print(f"❌ Could not parse response")
                        return False
                else:
                    print(f"❌ Failed - Expected 200, got {response.status_code}")
                    print(f"Response Text: {response.text}")
                    return False
                    
            except Exception as e:
                print(f"❌ Failed - Error: {str(e)}")
                return False
        
        return True

    def test_update_quote_status_invalid(self):
        """Test updating quote request status with invalid status"""
        if not self.quote_id:
            print("❌ No quote ID available for testing")
            return False
            
        url = f"{self.base_url}/api/quotes/{self.quote_id}/status?status=invalid_status"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing Update Quote Status - Invalid Status...")
        print(f"URL: {url}")
        
        try:
            response = requests.patch(url, headers=headers, timeout=10)
            
            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == 400  # Bad request expected
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Validation working correctly")
            else:
                print(f"❌ Failed - Expected 400, got {response.status_code}")
                print(f"Response Text: {response.text}")
                
            return success
                
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def test_get_quote_not_found(self):
        """Test getting non-existent quote request"""
        fake_id = "non-existent-id-12345"
        success, response = self.run_test(
            "Get Quote Request - Not Found",
            "GET",
            f"api/quotes/{fake_id}",
            404  # Not found expected
        )
        return success

    def test_delete_quote_request(self):
        """Test deleting a quote request"""
        if not self.quote_id:
            print("❌ No quote ID available for testing")
            return False
            
        success, response = self.run_test(
            "Delete Quote Request",
            "DELETE",
            f"api/quotes/{self.quote_id}",
            204  # No content expected
        )
        return success

def main():
    print("🚀 Starting Lead Generation API Comprehensive Tests...")
    print(f"Testing against: https://audience-grow-10.preview.emergentagent.com")
    print(f"Testing Newsletter, Quote, and Lead endpoints")
    
    tester = LeadGenerationAPITester()
    
    # Test sequence - organized by feature
    tests = [
        # Basic API Health
        ("API Health Check", tester.test_health_check),
        
        # Newsletter Endpoint Tests
        ("Newsletter Subscribe", tester.test_newsletter_subscribe),
        ("Newsletter Subscribe - Duplicate", tester.test_newsletter_duplicate_subscribe),
        ("Newsletter Subscribe - Invalid Email", tester.test_newsletter_invalid_email),
        ("Get Newsletter Subscriptions", tester.test_get_newsletter_subscriptions),
        ("Newsletter Unsubscribe", tester.test_newsletter_unsubscribe),
        ("Newsletter Unsubscribe - Not Found", tester.test_newsletter_unsubscribe_not_found),
        
        # Quote Request Endpoint Tests
        ("Create Quote Request", tester.test_create_quote_request),
        ("Create Quote Request - Validation", tester.test_create_quote_request_validation),
        ("Get All Quote Requests", tester.test_get_quote_requests),
        ("Get Single Quote Request", tester.test_get_single_quote_request),
        ("Update Quote Status", tester.test_update_quote_status),
        ("Update Quote Status - Invalid", tester.test_update_quote_status_invalid),
        ("Get Quote Request - Not Found", tester.test_get_quote_not_found),
        ("Delete Quote Request", tester.test_delete_quote_request),
        
        # Lead Endpoint Tests (existing functionality)
        ("Create Lead", tester.test_create_lead),
        ("Create Lead - Validation", tester.test_create_lead_validation),
        ("Get All Leads", tester.test_get_leads),
        ("Get Single Lead", tester.test_get_single_lead),
        ("Update Lead Status", tester.test_update_lead_status),
        ("Delete Lead", tester.test_delete_lead),
    ]
    
    for test_name, test_func in tests:
        print(f"\n{'='*50}")
        print(f"Running: {test_name}")
        print(f"{'='*50}")
        
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test {test_name} failed with error: {str(e)}")
    
    # Print summary
    print(f"\n{'='*50}")
    print(f"📊 TEST SUMMARY")
    print(f"{'='*50}")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "No tests run")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"❌ {tester.tests_run - tester.tests_passed} test(s) failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())