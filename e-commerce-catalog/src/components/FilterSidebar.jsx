export default function FilterSidebar({ selectedCategories, handleCategoryChange, maxPrice, setMaxPrice }) {
  const categories = ["Electronics", "Apparel", "Home"];

  return (
    <aside className="w-64 bg-white border-r p-4 hidden md:block">
      <h2 className="font-bold text-lg mb-4 text-gray-800">Filters</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold text-sm text-gray-600 mb-2">Category</h3>
        <div className="space-y-2 text-sm text-gray-700">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="rounded text-blue-600 focus:ring-blue-500"
              /> 
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span className="font-semibold">Max Price</span>
          <span>₹{maxPrice}</span>
        </div>
        <input 
          type="range" 
          min="500" 
          max="10000" 
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full cursor-pointer accent-blue-600" 
        />
      </div>
    </aside>
  );
}