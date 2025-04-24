
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { productCategories } from '@/data/productData';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  categoryId: string;
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const category = productCategories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">فئة غير موجودة</h1>
        <Link to="/" className="text-primary hover:underline">العودة للصفحة الرئيسية</Link>
      </div>
    );
  }

  const addToCart = (product: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        toast({
          title: "تمت الإضافة للسلة",
          description: `تمت إضافة ${product.name} إلى سلة المشتريات`,
        });
        return [...prevCart, { ...product, quantity: 1, categoryId }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };
  
  const handleDirectOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "السلة فارغة",
        description: "الرجاء إضافة منتجات للسلة أولاً",
        variant: "destructive"
      });
      return;
    }

    const formattedCartItems = cart.map(item => 
      `▸ ${item.name}%0A   الكمية: ${item.quantity} | السعر: ${item.price.toFixed(2)} ج.م | الإجمالي: ${(item.quantity * item.price).toFixed(2)} ج.م`
    ).join("%0A%0A");
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = [
      "✨ *طلب جديد* ✨",
      "",
      "🛒 *تفاصيل الطلب:*",
      formattedCartItems,
      "",
      `💰 *المجموع النهائي: ${total.toFixed(2)} ج.م*`,
    ].join("%0A");
    
    const whatsappNumber = '201030557250';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.location.href = whatsappUrl;
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-[40vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${category.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-primary transition-colors bg-black/20 px-4 py-2 rounded-lg mb-6"
          >
            <ChevronLeft size={20} className="ml-1" />
            <span>العودة للصفحة الرئيسية</span>
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-right max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-tajawal">{category.name}</h1>
            <p className="text-lg text-white/90 font-cairo">{category.description}</p>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Products Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  categoryId={categoryId || ''}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Cart Sidebar */}
          <div className="md:w-96">
            <CartSidebar 
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={() => setCart([])}
              onCheckout={handleDirectOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
