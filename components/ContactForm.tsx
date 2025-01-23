import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NextResponse } from 'next/server';

// Define prop types
interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [notification, setNotification] = useState({
        type: null as 'success' | 'error' | null,
        message: ''
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
          const response = await fetch('/api/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          const result = await response.json();
          if(isSubmitting){

          }

          if (response.ok) {
            setNotification({
              type: 'success',
              message: "Message sent successfully! I'll get back to you soon."
            });
    
            setFormData({
              name: '',
              email: '',
              message: ''
            });
    
            setTimeout(() => {
              setNotification({ type: null, message: '' });
              onClose();
            }, 2000);
          } else {
            throw new Error(result.message);
          }
        } 
        catch (error) {
          setNotification({
            type: 'error',
            message: "Error sending message. Please try again later."
          });
          return NextResponse.json({message:error})
        } 
        finally {
          setIsSubmitting(false);
        }
      };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-black/80 border-white/10 p-8 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/70 hover:text-purple-400"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">
          Contact Me
        </h2>
        
        {notification.type && (
          <div className={`
            mb-4 p-3 rounded-lg text-center
            ${notification.type === 'success' 
              ? 'bg-purple-600/20 text-purple-400' 
              : 'bg-red-600/20 text-red-400'}
          `}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-white/70 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label 
              htmlFor="email" 
              className="block text-white/70 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label 
              htmlFor="message" 
              className="block text-white/70 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your message..."
            ></textarea>
          </div>
          <Button 
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;