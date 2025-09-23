// src/ShopComponents/FilterSidebar/FilterSidebar.jsx
import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export default function FilterSidebar({
  categories,
  filters,
  setFilters,
  onApply,
}) {
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
  const [selectedCategories, setSelectedCategories] = useState(
    filters.categories || []
  );

  const [openPrice, setOpenPrice] = useState(true);
  const [openCategories, setOpenCategories] = useState(false);

  useEffect(() => {
    setMinPrice(filters.minPrice || "");
    setMaxPrice(filters.maxPrice || "");
    setSelectedCategories(filters.categories || []);
  }, [filters]);

  const toggleCategory = (catName) => {
    setSelectedCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName]
    );
  };

  const handleApply = () => {
    const newFilters = {
      minPrice: minPrice === "" ? "" : Number(minPrice),
      maxPrice: maxPrice === "" ? "" : Number(maxPrice),
      categories: selectedCategories,
    };
    setFilters(newFilters);
    onApply(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Price Dropdown */}
      <div>
        <button
          onClick={() => setOpenPrice((prev) => !prev)}
          className="w-full flex justify-between items-center shadow px-3 py-2 rounded"
        >
          <span className="text-lg font-medium">Price</span>
          <span>{openPrice ? <FaChevronUp /> : <FaChevronDown />}</span>
        </button>

        {openPrice && (
          <div className="mt-3 space-y-3 px-2">
            <div className="grid grid-cols-2 gap-3 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">from</span>
                <span className="text-gray-400">$</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full border px-2 py-1 rounded"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">to</span>
                <span className="text-gray-400">$</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="999"
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Categories Dropdown */}
      <div>
        <button
          onClick={() => setOpenCategories((prev) => !prev)}
          className="w-full flex justify-between items-center shadow px-3 py-2 rounded"
        >
          <span className="text-lg font-medium">Categories</span>
          <span>{openCategories ? <FaChevronUp /> : <FaChevronDown />}</span>
        </button>
        {openCategories && (
          <div className="mt-3 space-y-2 px-2">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <label key={cat.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => toggleCategory(cat.name)}
                  />
                  {cat.name}
                </label>
              ))
            ) : (
              <p className="text-gray-500">No categories found</p>
            )}
          </div>
        )}
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
      >
        Apply Filters
      </button>
    </div>
  );
}
