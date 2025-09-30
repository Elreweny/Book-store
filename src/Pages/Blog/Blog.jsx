import BlogCard from "../../Components/BlogCard/BlogCard";

const blogPosts = [
  {
    title: "The London Book Fair is to be packed with exciting",
    date: "Jan 25",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/9_740x470_crop_center.jpg?v=1567855381",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
    link: "#",
  },
  {
    title: "Activities of the Frankfurt Book International",
    date: "Jan 25",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/5b3ef069baa08a98b301e5ae9c9943b2_740x470_crop_center.jpg?v=1567855280",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
    link: "#",
  },
  {
    title: "Significant reading has a more info number",
    date: "Jan 25",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/0d6f4828835899.55d4a5402cb87_740x470_crop_center.jpg?v=1567855155",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
    link: "#",
  },
  {
    title: "Testing has a significant info number of benefits",
    date: "Jan 25",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/reading-books-might-help-you-live-longer-according-to-new-research-1_740x470_crop_center.jpg?v=1567855567",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
    link: "#",
  },
  {
    title: "International activities of the Frankfurt Book",
    date: "Jan 25",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/lit_fest_odesa_740x470_crop_center.jpg?v=1567855487",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
    link: "#",
  },
  {
    title: "Reading has a significant info number of benefits",
    date: "Jan 25",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/95da18b638ee746cdfb59dd5df1ffa7a_dba4f341-b61e-4b02-b4b1-810920f64def_740x470_crop_center.jpg?v=1567855434",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
    link: "#",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[1.25rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, idx) => (
          <BlogCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
}
