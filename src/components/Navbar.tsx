import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(true);
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

  const toggleWhatsAppButton = () => {
    setShowWhatsAppButton(!showWhatsAppButton);
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
    <>
      {/* WhatsApp Button Floating at Top */}
      <AnimatePresence>
        {showWhatsAppButton && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-[60]"
          >
            <Button
              onClick={toggleWhatsAppButton}
              className="whatsapp-btn shadow-lg hover:shadow-xl transition-all"
              variant="default"
              size="sm"
            >
              <ShoppingCart size={18} />
              <span className="mr-2">اطلب عبر واتساب</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav 
        ref={navbarRef}
        className={`fixed top-${showWhatsAppButton ? '20' : '0'} left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2 bg-background/95 backdrop-blur-lg shadow-lg border-b border-border/50' : 'py-4 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center gap-1 font-medium transition-colors hover:text-primary ${
                          isScrolled ? 'text-foreground' : 'text-white'
                        }`}
                        aria-expanded={activeDropdown === item.name}
                        aria-haspopup="true"
                      >
                        {item.name}
                        <motion.span
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-2 w-48 bg-background rounded-lg shadow-xl border border-border/50 overflow-hidden z-50"
                          >
                            {item.dropdown.map((subItem) => (
                              <button
                                key={subItem.name}
                                onClick={() => {
                                  subItem.action();
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-right px-4 py-3 hover:bg-accent/50 transition-colors text-foreground"
                              >
                                {subItem.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    item.path ? (
                      <Link
                        to={item.path}
                        className={`font-medium transition-colors hover:text-primary ${
                          isScrolled ? 'text-foreground' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className={`font-medium transition-colors hover:text-primary ${
                          isScrolled ? 'text-foreground' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </button>
                    )
                  )}
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

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden focus:outline-none transition-colors p-2 rounded-full ${
                isScrolled ? 'text-primary hover:bg-accent/20' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={24} className="transform transition-transform duration-300 rotate-180" />
              ) : (
                <Menu size={24} className="transform transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="md:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-background/95 backdrop-blur-lg border-t border-border/50 mt-2 px-4 pt-2 pb-6 rounded-b-lg shadow-xl">
                  <div className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <div key={item.name} className="border-b border-border/20 last:border-0 pb-2 last:pb-0">
                        {item.dropdown ? (
                          <>
                            <button
                              onClick={() => toggleDropdown(item.name)}
                              className="w-full flex justify-between items-center py-3 px-2 font-medium text-foreground"
                              aria-expanded={activeDropdown === item.name}
                            >
                              {item.name}
                              <motion.span
                                animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown size={16} />
                              </motion.span>
                            </button>
                            
                            <AnimatePresence>
                              {activeDropdown === item.name && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="pl-4 overflow-hidden"
                                >
                                  {item.dropdown.map((subItem) => (
                                    <button
                                      key={subItem.name}
                                      onClick={() => {
                                        subItem.action();
                                        setIsOpen(false);
                                      }}
                                      className="w-full text-right py-2 px-3 text-foreground/80 hover:text-primary transition-colors"
                                    >
                                      {subItem.name}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          item.path ? (
                            <Link
                              to={item.path}
                              className="block py-3 px-2 font-medium text-foreground hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                item.action?.();
                                setIsOpen(false);
                              }}
                              className="w-full text-right py-3 px-2 font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {item.name}
                            </button>
                          )
                        )}
                      </div>
                    ))}

                    <div className="pt-2 space-y-3">
                      <a
                        href="tel:01030557250"
                        className="flex items-center justify-center gap-2 font-medium py-2 px-4 bg-accent/10 text-primary rounded-lg"
                      >
                        <Phone size={18} />
                        <span>01030557250</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
