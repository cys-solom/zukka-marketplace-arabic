import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from "react-hook-form";
import { X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CartItem } from "@/pages/CategoryPage";

interface OrderFormModalProps {
  cart: CartItem[];
  total: number;
  onCancel: () => void;
  onComplete: () => void;
}

interface FormValues {
  name: string;
  address: string;
  phone: string;
  notes: string;
}

const validateEgyptianPhoneNumber = (phone: string): boolean => {
  const egyptianPhoneRegex = /^(01)[0-9]{9}$/;
  return egyptianPhoneRegex.test(phone.replace(/\s+/g, ''));
};

const OrderFormModal = ({ cart, total, onCancel, onComplete }: OrderFormModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      notes: ''
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      // Validate Egyptian phone number
      if (!validateEgyptianPhoneNumber(data.phone)) {
        toast({
          title: "خطأ في رقم الهاتف",
          description: "يرجى إدخال رقم هاتف مصري صحيح (يبدأ بـ 01 ويتكون من 11 رقمًا)",
          variant: "destructive"
        });
        return;
      }
      
      // Format cart items for WhatsApp message
      const formattedCartItems = cart.map(item => 
        `• ${item.name} - ${item.quantity} × ${item.price.toFixed(2)} ج.م = ${(item.quantity * item.price).toFixed(2)} ج.م`
      ).join("%0A");
      
      // Create structured WhatsApp message with proper encoding
      const messageParts = [
        "📦 *طلب جديد من زوكا ماركت*",
        "",
        "👤 *معلومات العميل:*",
        `الاسم: ${encodeURIComponent(data.name)}`,
        `العنوان: ${encodeURIComponent(data.address)}`,
        `رقم الهاتف: ${data.phone}`,
        "",
        "🛒 *تفاصيل الطلب:*",
        formattedCartItems,
        "",
        `💰 *المجموع:* ${total.toFixed(2)} ج.م`,
        ...(data.notes ? ["", `ملاحظات: ${encodeURIComponent(data.notes)}`] : [])
      ];
      
      const message = messageParts.join("%0A");
      const whatsappNumber = '201030557250'; // Replace with your WhatsApp business number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      // Show success toast
      toast({
        title: "تم إعداد طلبك بنجاح!",
        description: "جارٍ تحويلك إلى واتساب لإرسال الطلب...",
      });
      
      // Use window.location.href instead of window.open for better reliability
      setTimeout(() => {
        window.location.href = whatsappUrl;
        onComplete();
      }, 1000);
      
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "فشل في إرسال الطلب، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl shadow-2xl w-full max-w-md relative"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-2 text-muted-foreground hover:bg-secondary"
            onClick={onCancel}
            aria-label="إغلاق النموذج"
          >
            <X size={18} />
          </Button>
          
          <div className="pt-6 px-6 pb-4 border-b">
            <h2 className="text-2xl font-bold font-tajawal">إكمال الطلب</h2>
            <p className="text-muted-foreground font-cairo">أدخل بياناتك لإرسال الطلب عبر واتساب</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ 
                  required: "هذا الحقل مطلوب",
                  minLength: {
                    value: 3,
                    message: "يجب أن يكون الاسم مكون من 3 أحرف على الأقل"
                  }
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-cairo">الاسم بالكامل *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="أدخل اسمك بالكامل" 
                        {...field}
                        className="border-2 focus:border-primary transition-colors"
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                rules={{ 
                  required: "هذا الحقل مطلوب",
                  minLength: {
                    value: 10,
                    message: "يجب أن يحتوي العنوان على 10 أحرف على الأقل"
                  }
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-cairo">العنوان التفصيلي *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="الحي، الشارع، رقم المبني، الطابق..." 
                        {...field}
                        className="border-2 focus:border-primary transition-colors"
                        autoComplete="address-line1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                rules={{ 
                  required: "هذا الحقل مطلوب",
                  pattern: {
                    value: /^(01)[0-9]{9}$/,
                    message: "يجب أن يبدأ رقم الهاتف بـ 01 ويتكون من 11 رقمًا"
                  }
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-cairo">رقم الهاتف *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="مثال: 01234567890" 
                        dir="ltr"
                        type="tel"
                        {...field}
                        className="border-2 focus:border-primary transition-colors"
                        autoComplete="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-cairo">ملاحظات إضافية</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أي متطلبات خاصة، تفاصيل توصيل، إلخ..." 
                        {...field}
                        className="resize-none min-h-[100px] border-2 focus:border-primary transition-colors"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <h3 className="font-medium mb-3 font-cairo">ملخص الطلب:</h3>
                <div className="bg-secondary/50 rounded-md p-3 mb-4 max-h-40 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between py-1 text-sm">
                      <span className="font-tajawal">{item.name} × {item.quantity}</span>
                      <span className="font-medium">{(item.price * item.quantity).toFixed(2)} ج.م</span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                    <span>الإجمالي:</span>
                    <span className="text-primary">{total.toFixed(2)} ج.م</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-bold transition-transform hover:scale-[1.01] active:scale-[0.99]" 
                  disabled={isSubmitting}
                  aria-label="إرسال الطلب عبر واتساب"
                >
                  <Send className="ml-2" size={18} />
                  {isSubmitting ? 'جارِ إرسال الطلب...' : 'إرسال الطلب عبر واتساب'}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderFormModal;
