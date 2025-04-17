
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-background/95 backdrop-blur-lg shadow-lg' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center gap-2 transition-all duration-300"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className={`font-cairo ${isScrolled ? 'text-primary' : 'text-white'}`}>
                <span className={isScrolled ? 'text-accent' : 'text-spice-light'}>مصنين</span>
                <span className="block text-sm mt-1 font-normal opacity-80">وجبتك فريش</span>
              </span>
              <span className="absolute -bottom-1 right-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link 
              to="/" 
              className={`nav-link font-medium transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              الرئيسية
            </Link>
            <a 
              href="#products" 
              className={`nav-link font-medium transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('products')?.scrollIntoView({behavior: 'smooth'});
              }}
            >
              المنتجات
            </a>
            <a 
              href="#whatsapp-order" 
              className={`nav-link font-medium transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('whatsapp-order')?.scrollIntoView({behavior: 'smooth'});
              }}
            >
              اطلب الآن
            </a>
            <div className="flex items-center gap-4">
              <a 
                href="tel:01017812946"
                className={`flex items-center gap-2 font-medium transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}
              >
                <Phone size={18} />
                01017812946
              </a>
              <Button 
                onClick={() => document.getElementById('whatsapp-order')?.scrollIntoView({behavior: 'smooth'})}
                className="whatsapp-btn"
              >
                <ShoppingCart size={18} />
                اطلب عبر واتساب
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden focus:outline-none transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4 bg-background/80 backdrop-blur-md p-4 rounded-lg">
                <Link 
                  to="/" 
                  className="nav-link font-medium py-2 text-foreground" 
                  onClick={() => setIsOpen(false)}
                >
                  الرئيسية
                </Link>
                <a 
                  href="#products" 
                  className="nav-link font-medium py-2 text-foreground" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('products')?.scrollIntoView({behavior: 'smooth'});
                    setIsOpen(false);
                  }}
                >
                  المنتجات
                </a>
                <a 
                  href="#whatsapp-order" 
                  className="nav-link font-medium py-2 text-foreground" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('whatsapp-order')?.scrollIntoView({behavior: 'smooth'});
                    setIsOpen(false);
                  }}
                >
                  اطلب الآن
                </a>
                <a 
                  href="tel:01017812946"
                  className="flex items-center gap-2 font-medium py-2 text-primary"
                >
                  <Phone size={18} />
                  01017812946
                </a>
                <Button 
                  onClick={() => {
                    document.getElementById('whatsapp-order')?.scrollIntoView({behavior: 'smooth'});
                    setIsOpen(false);
                  }}
                  className="whatsapp-btn"
                >
                  <ShoppingCart size={18} />
                  اطلب عبر واتساب
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
