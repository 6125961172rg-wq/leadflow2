import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactForm = ({ variant = 'default' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/leads/`, formData);
      
      if (response.status === 201) {
        toast.success('Thank you! We will contact you soon.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle specific error messages from backend
      if (error.response?.status === 422) {
        const detail = error.response?.data?.detail;
        if (Array.isArray(detail)) {
          const fieldErrors = detail.map(err => err.msg).join(', ');
          toast.error(`Validation error: ${fieldErrors}`);
        } else {
          toast.error('Please check your input and try again.');
        }
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later or contact us directly.');
      } else {
        toast.error('Failed to submit. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Your Company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project or inquiry..."
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
