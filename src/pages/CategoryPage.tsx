
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import OrderForm from '@/components/OrderForm';
import { productCategories } from '@/data/productData';

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  // Find the current category
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
    
    // Open cart when adding first item
    if (cart.length === 0) {
      setIsCartOpen(true);
    }
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
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const clearCart = () => {
    setCart([]);
    setShowOrderForm(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      {/* Hero Section */}
      <section 
        className="relative py-20 mb-12 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${category.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Link to="/" className="inline-flex items-center text-white mb-6 hover:text-primary transition-colors">
              <ChevronLeft size={20} className="ml-1" />
              <span>العودة للصفحة الرئيسية</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-cairo">{category.name}</h1>
            <p className="text-lg text-white/90 mb-8">{category.description}</p>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Products Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        {product.isNew && (
                          <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-md">
                            جديد
                          </span>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <div className="font-bold text-primary">{product.price} ج.م</div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                      <Button 
                        onClick={() => addToCart(product)} 
                        variant="secondary"
                        className="w-full hover:bg-primary hover:text-white transition-colors"
                      >
                        <Plus size={18} className="ml-1" />
                        إضافة للسلة
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Cart Sidebar */}
          <div className="md:w-96 md:order-last order-first">
            <div className={`md:sticky top-24 transition-all duration-300 ease-in-out ${isCartOpen ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}>
              <Card className="border-none shadow-xl overflow-hidden">
                <div className="bg-primary text-white p-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold">سلة الطلبات</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-primary/50" 
                    onClick={() => setIsCartOpen(!isCartOpen)}
                  >
                    <ShoppingCart />
                    {cart.length > 0 && (
                      <span className="absolute top-0 right-0 bg-accent rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </span>
                    )}
                  </Button>
                </div>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCartOpen ? 'max-h-[40vh] overflow-y-auto' : 'max-h-0'}`}>
                  {cart.length > 0 ? (
                    <div className="divide-y">
                      {cart.map(item => (
                        <div key={item.id} className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 rounded-md object-cover ml-3"
                            />
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-muted-foreground text-sm">{item.price} ج.م</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => addToCart(item)}
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
                </div>
                
                <div className={`border-t ${isCartOpen ? 'block' : 'hidden'}`}>
                  <div className="p-4 bg-secondary/50">
                    <div className="flex justify-between font-bold text-lg mb-4">
                      <span>الإجمالي:</span>
                      <span>{calculateTotal().toFixed(2)} ج.م</span>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={() => setShowOrderForm(true)} 
                        className="w-full"
                        disabled={cart.length === 0}
                      >
                        تأكيد الطلب
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={clearCart}
                        disabled={cart.length === 0}
                      >
                        إفراغ السلة
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm 
          cart={cart} 
          total={calculateTotal()} 
          onCancel={() => setShowOrderForm(false)} 
          onComplete={clearCart}
        />
      )}
    </div>
  );
};

export default CategoryPage;
