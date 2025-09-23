import IntroSection from "../../Components/IntroSection/IntroSection";
import { useEffect, useState } from "react";
import ProductsGrid from "../../ShopComponents/ProductsGrid/ProductsGrid";
import FilterSidebar from "../../ShopComponents/FilterSidebar/FilterSidebar";
import Pagination from "../../ShopComponents/Pagination/Pagination";
import axios from "axios";
import useStore from "../../store/store";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    categories: [],
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    next: null,
    prev: null,
    current: 1,
  });
  const [ready, setReady] = useState(false); // ✅ لتأخير عرض المنتجات لحد ما البيانات توصل

  // 🔹 Store
  const fetchCart = useStore((state) => state.fetchCart);
  const fetchWishlist = useStore((state) => state.fetchWishlist);

  const buildParams = (pageNum = 1, f = {}) => {
    const params = { page: pageNum };
    if (f.minPrice !== "" && f.minPrice != null)
      params.minPrice = Number(f.minPrice);
    if (f.maxPrice !== "" && f.maxPrice != null)
      params.maxPrice = Number(f.maxPrice);
    if (Array.isArray(f.categories) && f.categories.length === 1) {
      params.category = f.categories[0];
    }
    return params;
  };

  const fetchProducts = async (pageNum = 1, appliedFilters = filters) => {
    try {
      let allProducts = [];
      const categoriesToFetch =
        appliedFilters.categories.length > 0 ? appliedFilters.categories : [""];

      for (const cat of categoriesToFetch) {
        const params = buildParams(pageNum, {
          ...appliedFilters,
          categories: [cat],
        });
        const res = await axios.get(
          "https://api.codingarabic.online/api/books",
          { params }
        );
        const data = res.data?.data ?? [];
        allProducts = [...allProducts, ...data];
      }

      const filtered = allProducts.filter((p) => {
        const priceNum = Number(p.price.replace(/\D/g, ""));
        if (appliedFilters.minPrice && priceNum < appliedFilters.minPrice)
          return false;
        if (appliedFilters.maxPrice && priceNum > appliedFilters.maxPrice)
          return false;
        return true;
      });

      setProducts(filtered);

      const params = buildParams(pageNum, {
        ...appliedFilters,
        categories: [categoriesToFetch[0]],
      });
      const res = await axios.get("https://api.codingarabic.online/api/books", {
        params,
      });

      setPagination({
        next: res.data?.links?.next ?? null,
        prev: res.data?.links?.prev ?? null,
        current: res.data?.meta?.current_page ?? pageNum,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
      setPagination({ next: null, prev: null, current: pageNum });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://api.codingarabic.online/api/categories"
      );
      const cats = res.data?.data ?? [];
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchCart(); // ✅ جلب الكارت أولاً
      await fetchWishlist(); // ✅ جلب الويش ليست
      await fetchCategories(); // ✅ جلب الكاتيجوريز
      await fetchProducts(1, filters); // ✅ جلب المنتجات
      setReady(true); // ✅ السماح بعرض المنتجات
    };
    loadData();
  }, []);

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    setPage(1);
    fetchProducts(1, appliedFilters);
  };

  const handlePageChange = (linkUrl) => {
    if (!linkUrl) return;
    try {
      const nextPage = Number(new URL(linkUrl).searchParams.get("page")) || 1;
      setPage(nextPage);
      fetchProducts(nextPage, filters);
    } catch {
      const fallback =
        pagination.current + (linkUrl === pagination.next ? 1 : -1);
      const safe = Math.max(1, fallback);
      setPage(safe);
      fetchProducts(safe, filters);
    }
  };

  if (!ready) {
    return (
      <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-8">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <IntroSection />

      <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-8">
        {/* Filter for mobile */}
        <div className="block lg:hidden mb-6">
          <FilterSidebar
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <FilterSidebar
              categories={categories}
              filters={filters}
              setFilters={setFilters}
              onApply={handleApplyFilters}
            />
          </aside>

          {/* Products */}
          <main className="col-span-1 lg:col-span-9">
            <ProductsGrid products={products} />
            <div className="mt-6">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
