// src/Components/BlogCard.jsx
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition duration-300">
      {/* صورة البوست */}
      <Link to={post.link || "#"} className="block">
        <div className="w-full max-h-[250px] overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* المحتوى */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold leading-tight mb-2">
          <Link to={post.link || "#"} className="block hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="text-sm text-gray-500 mb-3">
          <span>{post.date}</span>
          <span className="mx-2">|</span>
          <span>by {post.author}</span>
        </p>

        <p className="text-gray-700 text-sm mb-4 flex-1">{post.excerpt}</p>

        <div>
          <Link
            to={post.link || "#"}
            className="text-sm text-gray-900 underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
