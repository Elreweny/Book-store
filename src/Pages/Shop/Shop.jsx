// src/Pages/Shop/Shop.jsx
import IntroSection from "../../Components/IntroSection/IntroSection";
import { useEffect, useState } from "react";
import ProductsGrid from "../../ShopComponents/ProductsGrid/ProductsGrid";
import FilterSidebar from "../../ShopComponents/FilterSidebar/FilterSidebar";
import Pagination from "../../ShopComponents/Pagination/Pagination";
import axios from "axios";

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

  // توليد params للـ API
  const buildParams = (pageNum = 1, f = {}) => {
    const params = { page: pageNum };
    if (f.minPrice !== "" && f.minPrice != null) params.minPrice = Number(f.minPrice);
    if (f.maxPrice !== "" && f.maxPrice != null) params.maxPrice = Number(f.maxPrice);
    if (Array.isArray(f.categories) && f.categories.length === 1) {
      // API بيقبل category واحدة بس
      params.category = f.categories[0];
    }
    return params;
  };

  // جلب الكتب حسب الفلاتر
  const fetchProducts = async (pageNum = 1, appliedFilters = filters) => {
    try {
      let allProducts = [];

      const categoriesToFetch =
        appliedFilters.categories.length > 0 ? appliedFilters.categories : [""];

      for (const cat of categoriesToFetch) {
        const params = buildParams(pageNum, { ...appliedFilters, categories: [cat] });
        const res = await axios.get("https://api.codingarabic.online/api/books", { params });
        const data = res.data?.data ?? [];
        allProducts = [...allProducts, ...data];
      }

      // تصفية حسب السعر بعد دمج جميع الـ categories
      const filtered = allProducts.filter((p) => {
        const priceNum = Number(p.price.replace(/\D/g, ""));
        if (appliedFilters.minPrice && priceNum < appliedFilters.minPrice) return false;
        if (appliedFilters.maxPrice && priceNum > appliedFilters.maxPrice) return false;
        return true;
      });

      setProducts(filtered);

      // الباجينيشن: نستخدم بيانات أول category (أو الرابط الأول)
      const params = buildParams(pageNum, { ...appliedFilters, categories: [categoriesToFetch[0]] });
      const res = await axios.get("https://api.codingarabic.online/api/books", { params });

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

  // جلب الكاتيجورى
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://api.codingarabic.online/api/categories");
      const cats = res.data?.data ?? [];
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(1, filters);
  }, []);

  // عند تطبيق الفلاتر من Sidebar
  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    setPage(1);
    fetchProducts(1, appliedFilters);
  };

  // عند تغيير الصفحة من Pagination
  const handlePageChange = (linkUrl) => {
    if (!linkUrl) return;
    try {
      const nextPage = Number(new URL(linkUrl).searchParams.get("page")) || 1;
      setPage(nextPage);
      fetchProducts(nextPage, filters);
    } catch {
      const fallback = pagination.current + (linkUrl === pagination.next ? 1 : -1);
      const safe = Math.max(1, fallback);
      setPage(safe);
      fetchProducts(safe, filters);
    }
  };

  return (
    <>
      <IntroSection />
      <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <FilterSidebar
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
          />
        </aside>

        <main className="md:col-span-3">
          <ProductsGrid products={products} />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </main>
      </div>
    </>
  );
}
