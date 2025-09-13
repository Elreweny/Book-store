import ProductCard from "../ProductCard/ProductCard";

export default function ProductsGrid({ products }) {
  if (!products.length) {
    return (
      <p className="col-span-full text-center text-gray-500">
        No products found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
