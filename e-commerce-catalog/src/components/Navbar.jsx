//used for searchQuery and setSearchQuery
export default function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-wide">FlipKart Lite</h1>
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for products, brands and more..." 
        className="w-1/3 px-4 py-2 rounded text-gray-800 text-sm focus:outline-none bg-white"
      />
    </header>
  );
}