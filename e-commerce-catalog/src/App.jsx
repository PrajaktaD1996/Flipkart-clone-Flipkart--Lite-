import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import { mockProducts } from './data/mockProducts';
import useDebounce from './hooks/useDebounce'; // Import custom hook

export default function App() {
  //define filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);

const debouneSearchQuery = useDebounce(searchQuery,300);

//define category check box toggle 
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  //core filtering logic using memo 
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      //search (match -check title)
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      //category match if none selected   
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

       //price match  
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategories, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex flex-1">
        <FilterSidebar 
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
            <span className="text-sm text-gray-500">
              Showing {filteredProducts.length} results
            </span>
          </div>

          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
}