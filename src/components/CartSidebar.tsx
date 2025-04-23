import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const ShoppingCartSystem = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // تحميل السلة من localStorage عند التحميل الأولي
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // حفظ السلة في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "تم إفراغ السلة",
      variant: "destructive",
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      {/* السلة العائمة */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="outline"
          size="icon"
          className={`relative h-14 w-14 rounded-full shadow-lg bg-background/90 backdrop-blur-sm transition-all ${
            totalItems > 0 ? 'animate-bounce' : ''
          }`}
          onClick={() => setIsCartOpen(true)}
          aria-label="عرض سلة التسوق"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      {/* السلة الجانبية */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="h-full w-full max-w-md bg-background shadow-xl"
          >
            <Card className="h-full flex flex-col border-none">
              {/* Header */}
              <div className="bg-primary text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <h2 className="text-xl font-bold">سلة الطلبات</h2>
                  {totalItems > 0 && (
                    <span className="bg-accent rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-primary/50" 
                  onClick={() => setIsCartOpen(false)}
                  aria-label="إغلاق السلة"
                >
                  <X size={20} />
                </Button>
              </div>
              
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {cart.length > 0 ? (
                  <div className="divide-y">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.quantity}`} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image || '/placeholder-product.jpg'} 
                            alt={item.name} 
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <div>
                            <h3 className="font-medium line-clamp-1">{item.name}</h3>
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
                            onClick={() => removeFromCart(item.id)}
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
                            onClick={() => addToCart(item)}
                            aria-label="زيادة الكمية"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center p-8 text-center text-muted-foreground">
                    السلة فارغة. قم بإضافة منتجات من القائمة.
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="border-t p-4 bg-secondary/50">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>الإجمالي:</span>
                  <span className="text-primary">{calculateTotal().toFixed(2)} ج.م</span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2"
                    disabled={cart.length === 0}
                  >
                    تأكيد الطلب
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-destructive/10 hover:text-destructive"
                    onClick={clearCart}
                    disabled={cart.length === 0}
                  >
                    إفراغ السلة
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* مثال على زر إضافة منتج (للتجربة) */}
      <div className="container mx-auto p-4">
        <Button 
          onClick={() => addToCart({
            id: '1',
            name: 'منتج تجريبي',
            price: 100,
            quantity: 1,
            image: '/product.jpg'
          })}
          className="mt-4"
        >
          إضافة منتج للسلة (تجربة)
        </Button>
      </div>
    </div>
  );
};
