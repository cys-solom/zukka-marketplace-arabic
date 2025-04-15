
import { useState } from 'react';
import { WhatsappIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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

interface FormData {
  fullName: string;
  phoneNumber: string;
  orderDetails: string;
  notes: string;
}

const WhatsAppOrder = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    orderDetails: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Form validation
    if (!formData.fullName || !formData.phoneNumber || !formData.orderDetails) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Prepare WhatsApp message
    const message = `*طلب جديد من مطبخ زكا*%0A
الاسم: ${formData.fullName}%0A
رقم الجوال: ${formData.phoneNumber}%0A
تفاصيل الطلب: ${formData.orderDetails}%0A
${formData.notes ? `ملاحظات: ${formData.notes}%0A` : ''}`;

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/966500000000?text=${message}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsLoading(false);
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        phoneNumber: '',
        orderDetails: '',
        notes: ''
      });
      
      toast({
        title: "تم إرسال الطلب بنجاح!",
        description: "سيتم التواصل معك قريباً.",
      });
    }, 1000);
  };

  return (
    <section id="whatsapp-order" className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-title">اطلب عبر واتساب</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            يمكنك طلب منتجاتنا بسهولة عبر واتساب. فقط املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن.
          </p>
        </div>
        
        <Card className="max-w-md mx-auto shadow-xl">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
              <WhatsappIcon className="text-white" />
              نموذج الطلب
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="ادخل اسمك الكامل"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">رقم الجوال *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                  className="form-input"
                  required
                  dir="ltr"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="orderDetails">تفاصيل الطلب *</Label>
                <Textarea
                  id="orderDetails"
                  name="orderDetails"
                  value={formData.orderDetails}
                  onChange={handleChange}
                  placeholder="اذكر المنتجات والكميات المطلوبة"
                  className="form-input min-h-[100px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="أي ملاحظات أو تعليمات خاصة"
                  className="form-input"
                />
              </div>
              
              <Button 
                type="submit" 
                className="whatsapp-btn w-full"
                disabled={isLoading}
              >
                <WhatsappIcon />
                {isLoading ? 'جارِ المعالجة...' : 'إرسال الطلب عبر واتساب'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhatsAppOrder;
