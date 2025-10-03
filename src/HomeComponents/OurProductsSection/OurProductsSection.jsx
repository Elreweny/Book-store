import { useEffect, useState } from "react";
import { booksAPI } from "../../services/apiService";
import ProductCard from "../../ShopComponents/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import useStore from "../../store/store"; //

export default function OurProductsSection() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useStore((state) => state.fetchCart);
  const fetchWishlist = useStore((state) => state.fetchWishlist);
  useEffect(() => {
  fetchCart(); 
  fetchWishlist(); 
  fetchCategories(); 
}, []);


  //  جلب التصنيفات
  const fetchCategories = async () => {
    try {
      const catsRes = await fetch(
        "https://api.codingarabic.online/api/categories"
      );
      const catsData = await catsRes.json();
      const cats = catsData?.data ?? [];
      const limitedCats = cats.slice(0, 4);
      setCategories(limitedCats);
      if (limitedCats.length > 0) setActiveCategory(limitedCats[0].name);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  //  جلب المنتجات حسب التصنيف
  const fetchProducts = async (categoryName) => {
    setLoading(true);
    try {
      const res = await booksAPI.getAll({ category: categoryName });
      const rawData = res.data?.data ?? [];

      const mapped = rawData.slice(0, 8).map((item) => ({
        ...item,
        productId: item.id,
      }));

      setProducts(mapped);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchProducts(activeCategory);
    }
  }, [activeCategory]);

  return (
    <section className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[1.25rem]">
      {/* العنوان */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-[20px]">Our Products</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-[14px]">
          Murum est notare quam littera gothica, quam nunc putamus parum claram
          anteposuerit litterarum formas.
        </p>
      </div>

      {/* التبويبات */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === cat.name
                ? "bg-[#00bfc5] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* المنتجات */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}

      {/* البانرات */}
      <div className="w-full mt-8 mb-5">
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <Link
            to="/shop"
            className="w-[290px] h-[161px] 
              sm:w-[290px] sm:h-[161px] 
              md:w-[330px] md:h-[183px] 
              lg:w-[540px] lg:h-[300px] 
              mx-auto"
          >
            <img
              src="https://susan-demo.myshopify.com/cdn/shop/files/Banner-600x350-Collection-1.png?v=1613600610"
              alt="Banner 1"
              className="w-full h-full object-cover rounded-lg shadow-md hover:scale-[1.02] transition duration-300"
            />
          </Link>

          {/* Banner 2 */}
          <Link
            to="/shop"
            className="w-[290px] h-[161px] 
              sm:w-[290px] sm:h-[161px] 
              md:w-[330px] md:h-[183px] 
              lg:w-[540px] lg:h-[300px] 
              mx-auto"
          >
            <img
              src="https://susan-demo.myshopify.com/cdn/shop/files/Banner-600x350-Collection-2.png?v=1613600610"
              alt="Banner 2"
              className="w-full h-full object-cover rounded-lg shadow-md hover:scale-[1.02] transition duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
