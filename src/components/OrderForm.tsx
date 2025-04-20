
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from "react-hook-form";
import { X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/pages/CategoryPage";

interface OrderFormProps {
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

const OrderForm = ({ cart, total, onCancel, onComplete }: OrderFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  
  const onSubmit = (data: FormValues) => {
    // Validate Egyptian phone number
    if (!validateEgyptianPhoneNumber(data.phone)) {
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يرجى إدخال رقم هاتف مصري صحيح",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create WhatsApp message
    const cartItems = cart.map(item => 
      `* ${item.name} - ${item.quantity} × ${item.price} ج.م = ${(item.quantity * item.price).toFixed(2)} ج.م`
    ).join("%0A");
    
    const message = `📦 *طلب جديد*%0A%0A` +
      `*معلومات العميل:*%0A` +
      `الاسم: ${data.name}%0A` +
      `العنوان: ${data.address}%0A` +
      `رقم الهاتف: ${data.phone}%0A%0A` +
      `*تفاصيل الطلب:*%0A${cartItems}%0A%0A` +
      `*المجموع:* ${total.toFixed(2)} ج.م%0A%0A` +
      `${data.notes ? `*ملاحظات:* ${data.notes}%0A%0A` : ''}`;
    
    // WhatsApp number - replace with your business number
    const whatsappNumber = '201030557250';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Give time for toast to appear before redirecting
    toast({
      title: "تم إعداد طلبك!",
      description: "جاري تحويلك لإرسال الطلب عبر واتساب...",
    });
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card rounded-lg shadow-2xl w-full max-w-md relative"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-2 text-muted-foreground"
            onClick={onCancel}
          >
            <X size={18} />
          </Button>
          
          <div className="pt-6 px-6 pb-4 border-b">
            <h2 className="text-2xl font-bold">إكمال الطلب</h2>
            <p className="text-muted-foreground">أدخل بياناتك لإرسال الطلب عبر واتساب</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم بالكامل</Label>
              <Input 
                id="name" 
                placeholder="أدخل اسمك" 
                {...register("name", { required: "هذا الحقل مطلوب" })}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input 
                id="address" 
                placeholder="أدخل عنوانك بالتفصيل" 
                {...register("address", { required: "هذا الحقل مطلوب" })}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input 
                id="phone" 
                placeholder="مثال: 01xxxxxxxxx" 
                dir="ltr"
                {...register("phone", { 
                  required: "هذا الحقل مطلوب",
                  pattern: {
                    value: /^(01)[0-9]{9}$/,
                    message: "يرجى إدخال رقم هاتف مصري صحيح"
                  }
                })}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات (اختياري)</Label>
              <Textarea 
                id="notes" 
                placeholder="أي ملاحظات إضافية حول طلبك" 
                {...register("notes")}
              />
            </div>
            
            <div className="pt-4">
              <h3 className="font-medium mb-3">ملخص الطلب:</h3>
              <div className="bg-secondary/50 rounded-md p-3 mb-4 max-h-40 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-1 text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} ج.م</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                  <span>الإجمالي:</span>
                  <span>{total.toFixed(2)} ج.م</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700" 
                disabled={isSubmitting}
              >
                <Send className="ml-2" size={18} />
                {isSubmitting ? 'جارِ المعالجة...' : 'إرسال الطلب عبر واتساب'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderForm;
