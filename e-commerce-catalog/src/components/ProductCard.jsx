export default function ProductCard({ product }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col justify-between">
      <div>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {product.category}
        </span>
        <h3 className="font-medium text-gray-800 mt-2 line-clamp-1">{product.title}</h3>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
        <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
          ★ {product.rating}
        </span>
      </div>
    </div>
  );
}