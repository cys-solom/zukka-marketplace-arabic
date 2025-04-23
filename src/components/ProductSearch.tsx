import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  products: Array<{ name: string; description: string; id: string }>;
}

const ProductSearch = ({ onSearch, products }: ProductSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  
  // تصفية الاقتراحات بناءً على النص المدخل
  useEffect(() => {
    if (searchValue) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchValue, products]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <motion.div 
      className="relative w-full max-w-xl mx-auto mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative rounded-lg transition-all duration-300 ${isFocused ? 'shadow-md ring-1 ring-primary/30' : ''}`}>
        <Input
          type="search"
          placeholder="ابحث عن المنتجات حسب الاسم أو الوصف..."
          className="w-full pr-12 pl-10 py-6 text-base focus:ring-2"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Search 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          size={18} 
        />
        {searchValue && (
          <button 
            onClick={clearSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="مسح البحث"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* عرض الاقتراحات */}
      {filteredSuggestions.length > 0 && searchValue && (
        <div className="mt-2 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
          {filteredSuggestions.map((product) => (
            <div key={product.id} className="p-3 border-b hover:bg-primary/10 cursor-pointer">
              <div className="text-sm font-medium">{product.name}</div>
              <div className="text-xs text-muted-foreground">{product.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* النص الذي يعرض عند وجود قيمة في شريط البحث */}
      {searchValue && (
        <div className="mt-2 text-sm text-muted-foreground text-right">
          نتائج البحث عن: <span className="font-medium text-primary">{searchValue}</span>
        </div>
      )}
    </motion.div>
  );
};

export default ProductSearch;
