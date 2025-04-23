import { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";

// 1. تعريف واجهات البيانات
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// 2. إنشاء سياق السلة
const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === id 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// 3. مكون السلة العائمة
const FloatingCart = ({ onClick }: { onClick: () => void }) => {
  const { totalItems } = useCart();

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className={`relative h-12 w-12 rounded-full shadow-lg bg-background/90 backdrop-blur-sm transition-all ${
          totalItems > 0 ? 'animate-bounce' : ''
        }`}
        onClick={onClick}
        aria-label="عرض سلة التسوق"
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {totalItems}
          </span>
        )}
      </Button>
    </div>
  );
};

// 4. مكون السلة الجانبية
const CartSidebar = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleAddItem = (item: CartItem) => {
    addToCart(item);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <>
      {/* طبقة التعتيم الخلفية */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* السلة الجانبية */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween' }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md"
      >
        <div className="h-full bg-white shadow-xl flex flex-col">
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-xl font-bold">سلة التسوق ({totalItems})</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-primary/50" 
              onClick={onClose}
              aria-label="إغلاق السلة"
            >
              <X size={20} />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={`${item.id}-${item.quantity}`} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image || '/placeholder-product.jpg'} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium line-clamp-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.price.toFixed(2)} ج.م
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
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                السلة فارغة. قم بإضافة منتجات من القائمة.
              </div>
            )}
          </div>
          
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>المجموع:</span>
              <span className="text-primary">{totalPrice.toFixed(2)} ج.م</span>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2"
                disabled={cart.length === 0}
                aria-label="الانتقال إلى الدفع"
              >
                إتمام الشراء
              </Button>
              <Button 
                variant="outline" 
                className="w-full hover:bg-red-50 hover:text-red-500"
                onClick={handleClearCart}
                disabled={cart.length === 0}
                aria-label="إفراغ السلة بالكامل"
              >
                إفراغ السلة
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// 5. مكون الصفحة الرئيسية
const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="relative min-h-screen">
        <FloatingCart onClick={() => setIsCartOpen(true)} />
        
        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">متجرنا الإلكتروني</h1>
          
          {/* محتوى الصفحة */}
          <div className="text-center py-10">
            <p>هنا يمكنك عرض المنتجات الخاصة بك</p>
            <Button 
              className="mt-4"
              onClick={() => {
                // مثال لإضافة منتج للسلة
                const { addToCart } = useCart();
                addToCart({
                  id: '1',
                  name: 'منتج تجريبي',
                  price: 100,
                  quantity: 1
                });
              }}
            >
              إضافة منتج للسلة (تجربة)
            </Button>
          </div>
        </main>
      </div>
    </CartProvider>
  );
};

export default App;
