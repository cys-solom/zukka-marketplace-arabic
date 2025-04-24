
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

const ProductSearch = ({ onSearch }: ProductSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
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
      {searchValue && (
        <div className="mt-2 text-sm text-muted-foreground text-right">
          نتائج البحث عن: <span className="font-medium text-primary">{searchValue}</span>
        </div>
      )}
    </motion.div>
  );
};

export default ProductSearch;
