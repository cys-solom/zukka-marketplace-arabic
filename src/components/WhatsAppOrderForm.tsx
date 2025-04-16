
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Send, Phone } from 'lucide-react';

// WhatsApp icon component
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
  phoneNumber: string;
}

const validateEgyptianPhoneNumber = (phone: string): boolean => {
  // Egyptian phone number validation: starts with 01, followed by 9 digits
  const egyptianPhoneRegex = /^(01)[0-9]{9}$/;
  return egyptianPhoneRegex.test(phone.replace(/\s+/g, ''));
};

const WhatsAppOrderForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
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

    const section = document.getElementById('whatsapp-order-form');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Try to get stored phone number from localStorage
  useEffect(() => {
    const storedPhone = localStorage.getItem('lastPhoneNumber');
    if (storedPhone) {
      setPhoneNumber(storedPhone);
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    
    setPhoneNumber(value);
    setPhoneError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required field
    if (!phoneNumber) {
      setPhoneError("يرجى إدخال رقم الهاتف");
      toast({
        title: "خطأ في النموذج",
        description: "يرجى إدخال رقم الهاتف",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate phone number format
    if (!validateEgyptianPhoneNumber(phoneNumber)) {
      setPhoneError("يجب أن يبدأ الرقم بـ 01 ويتكون من 11 رقم");
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يجب أن يبدأ الرقم بـ 01 ويتكون من 11 رقم",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Store phone number in localStorage
    localStorage.setItem('lastPhoneNumber', phoneNumber);

    // Format WhatsApp message
    const message = `📦 طلب جديد:%0A
- رقم الجوال: ${phoneNumber}%0A
- تفاصيل الطلب: أريد الاستفسار عن المنتجات المتوفرة%0A`;

    const whatsappNumber = '201017812946'; // The phone number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsLoading(false);
      
      toast({
        title: "تم فتح واتساب!",
        description: "يمكنك الآن إتمام طلبك عبر واتساب.",
      });
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div id="whatsapp-order-form" className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isSectionVisible ? "visible" : "hidden"}
        className="w-full"
      >
        <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-none">
          <div className="bg-gradient-to-r from-primary to-accent h-2"></div>
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-6">
            <h3 className="text-xl font-bold text-center">اطلب الآن عبر واتساب</h3>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="block text-foreground font-medium">
                  ادخل رقم الجوال
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`w-full border-2 focus:border-primary p-3 rounded-lg text-lg ${phoneError ? 'border-red-500' : ''}`}
                  placeholder="01xxxxxxxxx"
                  dir="ltr"
                />
                {phoneError && (
                  <p className="text-sm font-medium text-red-500 mt-1">{phoneError}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 text-white font-bold bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] rounded-lg"
                disabled={isLoading}
              >
                <WhatsappIcon className="ml-2" />
                {isLoading ? 'جارِ المعالجة...' : 'أرسل الطلب عبر واتساب'}
              </Button>

              <p className="text-center text-sm text-muted-foreground pt-2">
                سيتم تحويلك إلى تطبيق واتساب لإكمال طلبك
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WhatsAppOrderForm;
