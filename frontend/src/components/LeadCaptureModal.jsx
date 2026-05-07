import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LeadCaptureModal = ({ isOpen, onClose }) => {
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
        
        onClose();
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Get Started Today</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="modal-name">Full Name *</Label>
            <Input
              id="modal-name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-email">Email Address *</Label>
            <Input
              id="modal-email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-phone">Phone Number *</Label>
            <Input
              id="modal-phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-company">Company Name</Label>
            <Input
              id="modal-company"
              name="company"
              type="text"
              placeholder="Your Company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-message">How can we help? *</Label>
            <Textarea
              id="modal-message"
              name="message"
              placeholder="Tell us about your needs..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
