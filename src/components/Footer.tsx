
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <footer id="contact" className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">مطبخ زكا</h3>
            <p className="text-white/80">
              نقدم أفضل اللحوم والبهارات وأدوات المطبخ بجودة عالية وأسعار مناسبة.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/#products" className="text-white/80 hover:text-white transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/#whatsapp-order" className="text-white/80 hover:text-white transition-colors">
                  اطلب عبر واتساب
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-white/80 hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">معلومات التواصل</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={18} className="ml-2" />
                <span className="text-white/80">
                  شارع الملك فهد، حي العليا، الرياض
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2" />
                <span className="text-white/80">
                  +966 500000000
                </span>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="ml-2" />
                <span className="text-white/80">
                  السبت - الخميس: 9:00 ص - 10:00 م
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">تابعنا</h3>
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <WhatsappIcon size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/60">
            © {new Date().getFullYear()} مطبخ زكا. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
