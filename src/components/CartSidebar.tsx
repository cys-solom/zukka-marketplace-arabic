import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from '@/pages/CategoryPage';
import { useToast } from "@/hooks/use-toast";

interface CartSidebarProps {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  onCheckout: () => void;
}

// دالة مساعدة لحفظ السلة في localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const CartSidebar = ({ 
  cart, 
  addToCart, 
  removeFromCart, 
  clearCart, 
  onCheckout 
}: CartSidebarProps) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const { toast } = useToast();
  
  // حفظ السلة تلقائياً عند أي تغيير
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "تم الإزالة من السلة",
      variant: "default",
    });
  };

  const handleAddItem = (item: CartItem) => {
    addToCart(item);
    toast({
      title: "تم تحديث الكمية",
      description: `تم تحديث كمية ${item.name} في السلة`,
      variant: "default",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "تم إفراغ السلة",
      variant: "destructive",
    });
  };

  return (
    <div className="md:sticky top-24 transition-all duration-300 ease-in-out">
      <Card className="border-none shadow-xl overflow-hidden">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold font-tajawal">سلة الطلبات</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-primary/50 relative" 
            onClick={() => setIsCartOpen(!isCartOpen)}
            aria-label="عرض/إخفاء السلة"
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
        
        <motion.div 
          animate={{ 
            height: isCartOpen ? 'auto' : 0,
            opacity: isCartOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {cart.length > 0 ? (
            <div className="max-h-[40vh] overflow-y-auto divide-y">
              {cart.map(item => (
                <div key={`${item.id}-${item.quantity}`} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-md object-cover ml-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                      }}
                    />
                    <div>
                      <h3 className="font-medium font-tajawal line-clamp-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {(item.price * item.quantity).toFixed(2)} ج.م
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="تقليل الكمية"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none"
                      onClick={() => handleAddItem(item)}
                      aria-label="زيادة الكمية"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              السلة فارغة. قم بإضافة منتجات من القائمة.
            </div>
          )}
        </motion.div>
        
        <motion.div 
          animate={{ 
            height: isCartOpen ? 'auto' : 0,
            opacity: isCartOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="border-t overflow-hidden"
        >
          <div className="p-4 bg-secondary/50">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>الإجمالي:</span>
              <span className="text-primary">{calculateTotal().toFixed(2)} ج.م</span>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={onCheckout} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 transition-transform hover:scale-[1.01]"
                disabled={cart.length === 0}
                aria-label="الانتقال إلى تأكيد الطلب"
              >
                تأكيد الطلب
              </Button>
              <Button 
                variant="outline" 
                className="w-full hover:bg-destructive/10 hover:text-destructive"
                onClick={handleClearCart}
                disabled={cart.length === 0}
                aria-label="إفراغ السلة بالكامل"
              >
                إفراغ السلة
              </Button>
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default CartSidebar;
