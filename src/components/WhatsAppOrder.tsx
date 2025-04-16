
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import WhatsAppOrderForm from './WhatsAppOrderForm';

// WhatsApp icon component for the sticky button
const WhatsappIcon = (props: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.6 6.32C16.4 5.12 14.8 4.4 13.2 4.4C9.8 4.4 7.1 7.1 7.1 10.5C7.1 11.8 7.5 13.1 8.2 14.1L7 17.9L10.9 16.7C11.9 17.3 12.9 17.6 14 17.6C17.4 17.6 20.1 14.9 20.1 11.5C20 9.8 19.2 7.8 17.6 6.32ZM13.2 16.4C12.1 16.4 11.1 16.1 10.2 15.6L9.9 15.4L7.7 16.1L8.4 14L8.2 13.7C7.6 12.8 7.3 11.7 7.3 10.6C7.3 7.9 9.5 5.7 13.3 5.7C14.6 5.7 15.8 6.2 16.8 7.2C17.8 8.2 18.3 9.5 18.3 10.8C18.2 13.5 16 16.4 13.2 16.4ZM16 12.2C15.8 12.1 14.9 11.7 14.7 11.6C14.5 11.5 14.4 11.5 14.3 11.7C14.2 11.9 13.9 12.3 13.8 12.4C13.7 12.5 13.6 12.5 13.4 12.4C12.5 12 11.9 11.6 11.2 10.8C11 10.6 11.3 10.6 11.6 10C11.7 9.9 11.6 9.8 11.6 9.7C11.6 9.6 11.3 8.7 11.2 8.3C11.1 7.9 10.9 8 10.8 8C10.7 8 10.6 8 10.5 8.2C10.3 8.4 10 8.8 10 9.7C10 10.6 10.6 11.5 10.7 11.6C10.8 11.7 11.8 13.2 13.3 13.9C14.5 14.5 14.9 14.5 15.4 14.4C15.7 14.4 16.4 14 16.6 13.6C16.8 13.2 16.8 12.8 16.7 12.7C16.6 12.5 16.4 12.3 16 12.2Z"
      fill="currentColor"
    />
  </svg>
);

const WhatsAppOrder = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Animation on scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const section = document.getElementById('whatsapp-order-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      id="whatsapp-order" 
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f8f8f8 0%, #e8f4ea 100%)"
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div id="whatsapp-order-section" className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">اطلب الآن</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            يمكنك طلب منتجاتنا بسهولة عبر واتساب. فقط أدخل رقم هاتفك وسنتواصل معك في أقرب وقت ممكن.
          </p>
        </motion.div>
        
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <WhatsAppOrderForm />
          </div>
        </div>
      </div>
      
      {/* Sticky floating WhatsApp button (visible only on mobile) */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 md:hidden animate-float">
        <a 
          href="https://wa.me/201017812946" 
          className="whatsapp-btn rounded-full px-6 py-3 shadow-lg"
        >
          <WhatsappIcon className="ml-2" />
          اطلب الآن
        </a>
      </div>
    </section>
  );
};

export default WhatsAppOrder;
