
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Phone } from 'lucide-react';

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

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  orderDetails: string;
}

const validateEgyptianPhoneNumber = (phone: string): boolean => {
  // Egyptian phone number format validation
  // Accepts: 01xxxxxxxxx (11 digits starting with 01)
  // Or international format: +201xxxxxxxxx
  const egyptianPhoneRegex = /^(\+?20)?(01)[0-2,5]{1}[0-9]{8}$/;
  return egyptianPhoneRegex.test(phone.replace(/\s+/g, ''));
};

const formatPhoneNumberForWhatsapp = (phone: string): string => {
  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // If starts with 0, replace with Egypt country code
  if (cleaned.startsWith('01')) {
    return '20' + cleaned.substring(1);
  }
  
  // If already has country code, ensure it's in the right format
  if (cleaned.startsWith('+20')) {
    return cleaned.substring(1); // Remove the + sign
  }
  
  if (cleaned.startsWith('20')) {
    return cleaned;
  }
  
  // Default case - should not happen with validation
  return cleaned;
};

const WhatsAppOrder = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    orderDetails: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'phone'>('whatsapp');
  const { toast } = useToast();

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

  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear errors when user types
    if (name === 'phoneNumber') {
      setPhoneError(null);
    } else if (name === 'email') {
      setEmailError(null);
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all required fields
    if (!formData.fullName || !formData.orderDetails) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate Egyptian phone number
    if (!validateEgyptianPhoneNumber(formData.phoneNumber)) {
      setPhoneError("يرجى إدخال رقم هاتف مصري صحيح (مثال: 01xxxxxxxxx)");
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يرجى إدخال رقم هاتف مصري صحيح",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate email if provided
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError("يرجى إدخال بريد إلكتروني صحيح");
      toast({
        title: "خطأ في البريد الإلكتروني",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Handle different actions based on selected tab
    if (activeTab === 'whatsapp') {
      // Format WhatsApp message with emoji and improved formatting
      const message = `📦 طلب جديد:%0A
- الاسم: ${formData.fullName}%0A
- رقم الجوال: ${formData.phoneNumber}%0A
${formData.email ? `- البريد الإلكتروني: ${formData.email}%0A` : ''}
- تفاصيل الطلب: ${formData.orderDetails}%0A`;

      // Use the specified Egyptian number
      const whatsappNumber = '201017812946'; // The phone number specified in requirements
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsLoading(false);
        
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          orderDetails: ''
        });
        
        toast({
          title: "تم إرسال الطلب بنجاح!",
          description: "سيتم التواصل معك قريباً.",
        });
      }, 800);
    } else {
      // Phone call option
      const phoneNumber = '01017812946';
      window.location.href = `tel:${phoneNumber}`;
      setIsLoading(false);
      
      toast({
        title: "جار الاتصال...",
        description: "يتم توجيهك للاتصال بنا مباشرة.",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // FloatingLabel component with proper type definition
  interface FloatingLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
  }

  const FloatingLabel = ({ children, id, ...props }: FloatingLabelProps) => (
    <div className="relative">
      {children}
      <Label 
        htmlFor={id} 
        className={`absolute transition-all duration-200 ${
          formData[id as keyof FormData] ? 
          'text-xs -top-2.5 right-3 px-1 bg-white text-primary' : 
          'text-muted-foreground top-3 right-3'
        }`}
      >
        {typeof props["aria-label"] === "string" ? props["aria-label"] : ""}
      </Label>
    </div>
  );

  return (
    <section 
      id="whatsapp-order" 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f8f8f8 0%, #e8f4ea 100%)"
      }}
    >
      {/* Modern background elements */}
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
            يمكنك طلب منتجاتنا بسهولة عبر واتساب أو الاتصال المباشر. فقط املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isSectionVisible ? "visible" : "hidden"}
          className="flex justify-center"
        >
          <Card className="max-w-xl w-full shadow-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-none">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2"
            ></div>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 flex flex-row gap-2 pb-6">
              <div className="flex w-full rounded-lg overflow-hidden">
                <button 
                  className={`w-1/2 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-300 ${activeTab === 'whatsapp' ? 'bg-green-600 text-white' : 'bg-white/50 text-foreground hover:bg-white/80'}`}
                  onClick={() => setActiveTab('whatsapp')}
                >
                  <WhatsappIcon className={activeTab === 'whatsapp' ? 'text-white' : 'text-green-600'} />
                  طلب عبر واتساب
                </button>
                <button 
                  className={`w-1/2 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-300 ${activeTab === 'phone' ? 'bg-primary text-white' : 'bg-white/50 text-foreground hover:bg-white/80'}`}
                  onClick={() => setActiveTab('phone')}
                >
                  <Phone className={activeTab === 'phone' ? 'text-white' : 'text-primary'} size={20} />
                  اتصل بنا
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-1">
                  <FloatingLabel id="fullName" aria-label="الاسم الكامل *">
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-input border-2 focus:border-primary rounded-md shadow-sm pt-4 bg-transparent"
                      required
                    />
                  </FloatingLabel>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-1">
                  <FloatingLabel id="phoneNumber" aria-label="رقم الجوال المصري *">
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`form-input border-2 focus:border-primary rounded-md shadow-sm pt-4 bg-transparent ${phoneError ? 'border-red-400' : ''}`}
                      placeholder="01xxxxxxxxx"
                      required
                      dir="ltr"
                    />
                  </FloatingLabel>
                  {phoneError && (
                    <p className="text-sm text-red-500 mt-1">{phoneError}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    أدخل رقم مصري صحيح (فودافون، أورانج، اتصالات، وي)
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-1">
                  <FloatingLabel id="email" aria-label="البريد الإلكتروني (اختياري)">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input border-2 focus:border-primary rounded-md shadow-sm pt-4 bg-transparent ${emailError ? 'border-red-400' : ''}`}
                      dir="ltr"
                    />
                  </FloatingLabel>
                  {emailError && (
                    <p className="text-sm text-red-500 mt-1">{emailError}</p>
                  )}
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-1">
                  <FloatingLabel id="orderDetails" aria-label="تفاصيل الطلب *">
                    <Textarea
                      id="orderDetails"
                      name="orderDetails"
                      value={formData.orderDetails}
                      onChange={handleChange}
                      className="form-input min-h-[120px] border-2 focus:border-primary rounded-md shadow-sm pt-6 bg-transparent"
                      required
                    />
                  </FloatingLabel>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className={`w-full py-6 text-white font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      activeTab === 'whatsapp' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                    disabled={isLoading}
                  >
                    {activeTab === 'whatsapp' ? (
                      <>
                        <WhatsappIcon />
                        {isLoading ? 'جارِ المعالجة...' : 'إرسال الطلب عبر واتساب'}
                      </>
                    ) : (
                      <>
                        <Phone size={20} />
                        {isLoading ? 'جارِ المعالجة...' : 'اتصل بنا مباشرة'}
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center text-sm text-muted-foreground pt-2">
                  {activeTab === 'whatsapp' ? (
                    <>سيتم تحويلك إلى تطبيق واتساب لإكمال طلبك</>
                  ) : (
                    <>سيتم الاتصال بالرقم: 01017812946</>
                  )}
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppOrder;
