import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NextResponse } from 'next/server';
import confetti from 'canvas-confetti';

// Define prop types
interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ type: null as 'success' | 'error' | null, message: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
  
        const result = await response.json();
        if (response.ok) {
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#bd34fe', '#41d1ff', '#ffffff', '#a5f3fc', '#e879f9'],
          });
          setNotification({ type: 'success', message: "Message sent successfully! I'll get back to you soon." });
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => {
            setNotification({ type: null, message: '' });
            onClose();
          }, 3000);
        } else {
          throw new Error(result.message);
        }
      } 
      catch (error) {
        setNotification({ type: 'error', message: "Error sending message. Please try again later." });
        return NextResponse.json({ message: error });
      } 
      finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#1b1b1f]/80 backdrop-blur-md p-4">
      <Card className="w-full max-w-md bg-[#242424] border border-[#3c3f44] shadow-2xl p-8 relative rounded-3xl">
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors"
        >
          ✕
        </button>
        <h2 className="text-2xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#41d1ff]">
          Contact Me
        </h2>
        
        {notification.type && (
          <div className={`mb-4 p-3 rounded-lg text-center font-medium border ${notification.type === 'success' ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-red-900/30 text-red-400 border-red-500/30'}`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-zinc-300 font-bold mb-2 text-sm uppercase tracking-wider">Name</label>
            <input
              type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
              className="w-full bg-[#1b1b1f] border border-[#3c3f44] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bd34fe] focus:ring-1 focus:ring-[#bd34fe] transition-all placeholder:text-zinc-600"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-zinc-300 font-bold mb-2 text-sm uppercase tracking-wider">Email</label>
            <input
              type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full bg-[#1b1b1f] border border-[#3c3f44] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bd34fe] focus:ring-1 focus:ring-[#bd34fe] transition-all placeholder:text-zinc-600"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-zinc-300 font-bold mb-2 text-sm uppercase tracking-wider">Message</label>
            <textarea
              id="message" name="message" value={formData.message} onChange={handleChange} required rows={4}
              className="w-full bg-[#1b1b1f] border border-[#3c3f44] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bd34fe] focus:ring-1 focus:ring-[#bd34fe] transition-all placeholder:text-zinc-600 resize-none"
              placeholder="Your message..."
            ></textarea>
          </div>
          <Button 
            type="submit" disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#bd34fe] to-[#8d28e0] hover:from-[#a62ce6] hover:to-[#7820bf] text-white rounded-full py-6 text-lg font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(189,52,254,0.3)] border-none"
          >
            {isSubmitting ? 'Sending...' : 'Send Message 🚀'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;