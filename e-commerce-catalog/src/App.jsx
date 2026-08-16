import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import { mockProducts } from './data/mockProducts';
import useDebounce from './hooks/useDebounce';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('featured'); // New sort state

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // 1. Filter and Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    // First, filter products
    const filtered = mockProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Second, sort products based on selected option
    return filtered.sort((a, b) => {
      if (sortBy === 'low-high') return a.price - b.price;
      if (sortBy === 'high-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' or default
    });
  }, [debouncedSearchQuery, selectedCategories, maxPrice, sortBy]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setMaxPrice(10000);
    setSortBy('featured');
  };

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
          {/* Header Controls: Result Count & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
              <span className="text-sm text-gray-500">
                Showing {filteredAndSortedProducts.length} results
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
              <span className="text-sm text-gray-600 font-medium">Sort By:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-medium text-gray-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Conditional Rendering: Product Grid or Empty State */}
          {filteredAndSortedProducts.length > 0 ? (
            <ProductGrid products={filteredAndSortedProducts} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border shadow-sm mt-4">
              <p className="text-lg font-semibold text-gray-700 mb-2">No products found</p>
              <p className="text-sm text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={handleResetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}