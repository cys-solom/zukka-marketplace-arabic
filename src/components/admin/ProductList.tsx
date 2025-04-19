
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Copy, Eye, EyeOff, Search } from "lucide-react";
import { WhatsappIcon } from "@/components/admin/AdminIcons";
import { useToast } from "@/hooks/use-toast";

// Mock product data for the demo
const mockProducts = [
  { 
    id: "1", 
    name: "لحم بقري طازج", 
    category: "اللحوم الطازجة", 
    price: 120, 
    active: true,
    mainImage: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop&w=100"
  },
  { 
    id: "2", 
    name: "كباب مشكل", 
    category: "الوجبات الجاهزة", 
    price: 85, 
    active: true,
    mainImage: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?q=80&w=2070&auto=format&fit=crop&w=100"
  },
  { 
    id: "3", 
    name: "شواية متنقلة", 
    category: "أدوات المطبخ", 
    price: 299, 
    active: false,
    mainImage: "https://images.unsplash.com/photo-1545015451-f05567aa6bcc?q=80&w=2069&auto=format&fit=crop&w=100"
  },
  { 
    id: "4", 
    name: "لحم غنم طازج", 
    category: "اللحوم الطازجة", 
    price: 150, 
    active: true,
    mainImage: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop&w=100"
  },
  { 
    id: "5", 
    name: "سكاكين شيف", 
    category: "أدوات المطبخ", 
    price: 120, 
    active: true,
    mainImage: "https://images.unsplash.com/photo-1545015451-f05567aa6bcc?q=80&w=2069&auto=format&fit=crop&w=100"
  },
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(mockProducts);
  const { toast } = useToast();

  const filteredProducts = products.filter(product =>
    product.name.includes(searchTerm) ||
    product.category.includes(searchTerm)
  );

  const handleToggleProductVisibility = (id: string) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id 
          ? { ...product, active: !product.active } 
          : product
      )
    );

    const product = products.find(p => p.id === id);
    toast({
      title: product?.active ? "تم إخفاء المنتج" : "تم إظهار المنتج",
      description: `تم ${product?.active ? 'إخفاء' : 'إظهار'} "${product?.name}" بنجاح`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    
    if (confirm(`هل أنت متأكد من حذف المنتج "${product?.name}"؟`)) {
      setProducts(prev => prev.filter(product => product.id !== id));
      
      toast({
        title: "تم حذف المنتج",
        description: `تم حذف "${product?.name}" بنجاح`,
      });
    }
  };

  const handleCopyWhatsAppLink = (product: typeof mockProducts[0]) => {
    const message = `أرغب في شراء: ${product.name} - السعر: ${product.price} ريال`;
    const whatsappLink = `https://wa.me/201030557250?text=${encodeURIComponent(message)}`;
    
    navigator.clipboard.writeText(whatsappLink);
    
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط واتساب للمنتج بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>المنتجات</CardTitle>
        <div className="relative w-full max-w-xs">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pr-8 text-right"
            placeholder="البحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">الصورة</TableHead>
                <TableHead>اسم المنتج</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    لا توجد منتجات مطابقة للبحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price} ريال</TableCell>
                    <TableCell>
                      <Badge variant={product.active ? "default" : "outline"}>
                        {product.active ? "نشط" : "مخفي"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleProductVisibility(product.id)}
                          title={product.active ? "إخفاء المنتج" : "إظهار المنتج"}
                        >
                          {product.active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyWhatsAppLink(product)}
                          title="نسخ رابط الواتساب"
                        >
                          <WhatsappIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => alert(`تعديل المنتج: ${product.name}`)}
                          title="تعديل المنتج"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="حذف المنتج"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
