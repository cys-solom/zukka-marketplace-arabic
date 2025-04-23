
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from '@/pages/CategoryPage';
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    isNew?: boolean;
  };
  categoryId: string;
  onAddToCart: (product: any) => void;
}

const ProductCard = ({ product, categoryId, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تم إضافة ${product.name} إلى سلة التسوق`,
      duration: 2000,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      className="h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-border/30 rounded-xl h-full flex flex-col">
        <div className="relative h-56 overflow-hidden bg-muted/30">
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            animate={{ scale: isHovering ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-3 right-3 space-x-2 z-10">
            {product.isNew && (
              <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                جديد
              </span>
            )}
          </div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={handleAddToCart} 
              variant="default"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              <ShoppingCart size={18} className="ml-2" />
              إضافة للسلة
            </Button>
          </motion.div>
        </div>
        <CardContent className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg font-tajawal line-clamp-2">{product.name}</h3>
            <div className="font-bold text-primary text-lg whitespace-nowrap mr-2">{product.price} ج.م</div>
          </div>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="mt-auto">
            <Button 
              onClick={handleAddToCart} 
              variant="secondary"
              className="w-full hover:bg-primary hover:text-white transition-colors"
            >
              <Plus size={18} className="ml-2" />
              إضافة للسلة
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
