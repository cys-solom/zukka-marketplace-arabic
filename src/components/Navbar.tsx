
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-background/95 backdrop-blur-sm shadow-md' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="text-accent">مطبخ</span> زكا
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link to="/" className="nav-link text-foreground font-medium">الرئيسية</Link>
            <Link to="/#products" className="nav-link text-foreground font-medium">المنتجات</Link>
            <Link to="/#contact" className="nav-link text-foreground font-medium">اتصل بنا</Link>
            <Button 
              onClick={() => document.getElementById('whatsapp-order')?.scrollIntoView({behavior: 'smooth'})}
              className="whatsapp-btn"
            >
              <ShoppingCart size={18} />
              اطلب عبر واتساب
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="nav-link text-foreground font-medium py-2" onClick={() => setIsOpen(false)}>الرئيسية</Link>
              <Link to="/#products" className="nav-link text-foreground font-medium py-2" onClick={() => setIsOpen(false)}>المنتجات</Link>
              <Link to="/#contact" className="nav-link text-foreground font-medium py-2" onClick={() => setIsOpen(false)}>اتصل بنا</Link>
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
