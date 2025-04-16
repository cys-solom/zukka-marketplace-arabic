
import { Phone, MapPin, Clock, Instagram, Facebook, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Creating a custom WhatsApp icon since there's no built-in one in lucide-react
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
      d="M17.6 6.32C16.4 5.12 14.8 4.4 13.2 4.4C9.8 4.4 7.1 7.1 7.1 10.5C7.1 11.8 7.5 13.1 8.2 14.1L7 17.9L10.9 16.7C11.9 17.3 12.9 17.6 14 17.6C17.4 17.6 20.1 14.9 20.1 11.5C20 9.8 19.2 7.8 17.6 6.32ZM13.2 16.4C12.1 16.4 11.1 16.1 10.2 15.6L9.9 15.4L7.7 16.1L8.4 14L8.2 13.7C7.6 12.8 7.3 11.7 7.3 10.6C7.3 7.9 9.5 5.7 13.3 5.7C14.6 5.7 15.8 6.2 16.8 7.2C17.8 8.2 18.3 9.5 18.3 10.8C18.2 13.5 16 16.4 13.2 16.4ZM16 12.2C15.8 12.1 14.9 11.7 14.7 11.6C14.5 11.5 14.4 11.5 14.3 11.7C14.2 11.9 13.9 12.3 13.8 12.4C13.7 12.5 13.6 12.5 13.4 12.4C12.5 12 11.9 11.6 11.2 10.8C11 10.6 11.3 10.6 11.6 10C11.7 9.9 11.6 9.8 11.6 9.7C11.6 9.6 11.3 8.7 11.2 8.3C11.1 7.9 10.9 8 10.8 8C10.7 8 10.6 8 10.5 8C10.4 8 10.2 8 10 8.2C9.8 8.4 9.4 8.8 9.4 9.7C9.4 10.6 10 11.5 10.1 11.6C10.2 11.7 11.2 13.2 12.7 13.9C13.9 14.5 14.3 14.5 14.8 14.4C15.1 14.4 15.8 14 16 13.6C16.2 13.2 16.2 12.8 16.1 12.7C16.1 12.5 16.1 12.3 16 12.2Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-primary to-primary-dark/90 text-white overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          backgroundRepeat: "repeat"
        }}
      ></div>

      {/* Scroll to top button */}
      <div className="container mx-auto px-4 relative">
        <button 
          onClick={scrollToTop}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:bg-accent hover:text-white transition-all duration-300"
          aria-label="العودة للأعلى"
        >
          <ArrowUp size={20} />
        </button>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Two column layout that becomes one column on mobile */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Column 1: About & Social */}
          <div>
            <h3 className="text-3xl font-bold mb-6 font-cairo">
              <span className="text-spice-light">مطبخ</span> زكا
            </h3>
            <p className="text-white/80 leading-relaxed mb-6">
              نقدم أفضل اللحوم والبهارات وأدوات المطبخ بجودة عالية وأسعار مناسبة. جميع منتجاتنا طازجة ومختارة بعناية.
            </p>
            <h4 className="text-xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-accent after:right-0 after:bottom-0 pb-2">تابعنا</h4>
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://wa.me/201017812946" 
                className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsappIcon size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-accent after:right-0 after:bottom-0 pb-2">
              يسعدنا استقبال اتصالاتكم وطلباتكم
            </h3>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shrink-0">
                  <MapPin size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">العنوان</h4>
                  <p className="text-white/80">
                    شارع الملك فهد، حي العليا، الرياض
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shrink-0">
                  <Phone size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">اتصل بنا</h4>
                  <a 
                    href="tel:01017812946" 
                    className="text-white text-xl hover:text-accent transition-colors inline-block"
                  >
                    01017812946
                  </a>
                  <p className="text-white/60 text-sm">متاح على مدار اليوم</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center group-hover:bg-green-700 transition-all duration-300 shrink-0">
                  <WhatsappIcon size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">واتساب</h4>
                  <a 
                    href="https://wa.me/201017812946" 
                    className="text-white text-xl hover:text-accent transition-colors inline-block"
                  >
                    01017812946
                  </a>
                  <p className="text-white/60 text-sm">للطلبات والاستفسارات</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shrink-0">
                  <Mail size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">البريد الإلكتروني</h4>
                  <a 
                    href="mailto:info@example.com" 
                    className="text-white hover:text-accent transition-colors"
                  >
                    info@example.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Opening Hours - Single Column */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-accent after:right-0 after:bottom-0 pb-2">
            ساعات العمل
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/15 transition-all duration-300">
              <p className="font-bold mb-2">السبت - الأربعاء</p>
              <p className="text-white/80">9:00 ص - 10:00 م</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/15 transition-all duration-300">
              <p className="font-bold mb-2">الخميس</p>
              <p className="text-white/80">9:00 ص - 11:00 م</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/15 transition-all duration-300">
              <p className="font-bold mb-2">الجمعة</p>
              <p className="text-white/80">2:00 م - 10:00 م</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <span className="py-2 px-6 bg-accent/20 rounded-full text-center inline-block">
              <span className="text-white font-bold">مفتوح الآن</span>
            </span>
          </div>
        </div>
        
        {/* Quick Links - Mobile Friendly */}
        <div className="border-t border-white/10 pt-8 pb-4">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              الرئيسية
            </Link>
            <Link to="/#products" className="text-white/80 hover:text-white transition-colors">
              المنتجات
            </Link>
            <Link to="/#whatsapp-order" className="text-white/80 hover:text-white transition-colors">
              اطلب عبر واتساب
            </Link>
            <Link to="/#contact" className="text-white/80 hover:text-white transition-colors">
              اتصل بنا
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-white/60">
              © {currentYear} مطبخ زكا. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
