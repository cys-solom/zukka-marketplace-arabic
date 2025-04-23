import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showWhatsApp, setShowWhatsApp] = useState(true); // حالة التحكم في عرض زر الواتساب
  const navbarRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 20;
      setIsScrolled(window.scrollY > threshold);
      
      if (isOpen && window.scrollY > 10) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleWhatsApp = () => {
    setShowWhatsApp(!showWhatsApp); // تبديل حالة عرض زر الواتساب
  };

  const navItems = [
    { name: 'الرئيسية', path: '/' },
    { 
      name: 'المنتجات', 
      action: () => scrollToSection('products'),
      dropdown: [
        { name: 'الوجبات السريعة', action: () => scrollToSection('fast-food') },
        { name: 'المشروبات', action: () => scrollToSection('drinks') },
      ]
    },
    { name: 'اطلب الآن', action: () => scrollToSection('whatsapp-order') },
  ];

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-background/95 backdrop-blur-lg shadow-lg border-b border-border/50' : 'py-4 bg-transparent'
      }`}
    >
      {/* زر الواتساب في أعلى النافبار */}
      {showWhatsApp && (
        <div className="bg-green-600 text-white w-full py-2 px-4 flex justify-center items-center">
          <Button 
            onClick={toggleWhatsApp}
            className="bg-transparent hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full border border-white flex items-center gap-2"
            variant="ghost"
          >
            <ShoppingCart size={18} />
            <span>اطلب عبر واتساب</span>
            <X size={16} className="mr-1" />
          </Button>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* باقي كود النافبار كما هو */}
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center gap-2 group transition-all duration-300"
            aria-label="الصفحة الرئيسية"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5 }} 
              className="relative"
            >
              <span className={`font-cairo ${isScrolled ? 'text-primary' : 'text-white'}`}>
                <span className="text-3xl">صحتين</span>
                <span className={`block text-sm mt-1 font-bold tracking-wide ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                  Fast Food
                </span>
              </span>
              <span className="absolute -bottom-1 right-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"></span>
            </motion.div>
          </Link>

          {/* باقي كود النافبار */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {/* ... */}
              </div>
            ))}

            <div className="flex items-center gap-4">
              <a
                href="tel:01030557250"
                className={`flex items-center gap-2 font-medium transition-colors hover:text-primary ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}
                aria-label="اتصل بنا"
              >
                <Phone size={18} />
                <span className="hidden lg:inline">01030557250</span>
              </a>
            </div>
          </div>

          {/* باقي كود النافبار */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
