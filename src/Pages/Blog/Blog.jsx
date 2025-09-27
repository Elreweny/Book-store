import IntroSection from "../../Components/IntroSection/IntroSection";

const blogPosts = [
  {
    title: "Testing has a significant info number of benefits",
    date: "Jan 25, 2022",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/reading-books-might-help-you-live-longer-according-to-new-research-1_740x470_crop_center.jpg?v=1567855567",
    
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
  },
  {
    title: "International activities of the Frankfurt Book",
    date: "Jan 25, 2022",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/lit_fest_odesa_740x470_crop_center.jpg?v=1567855487",
    
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
  },
  {
    title: "Reading has a significant info number of benefits",
    date: "Jan 25, 2022",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/95da18b638ee746cdfb59dd5df1ffa7a_dba4f341-b61e-4b02-b4b1-810920f64def_740x470_crop_center.jpg?v=1567855434",
    link: "/blogs/news/reading-has-a-signficant-info-number-of-benefits-1",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
  },
  {
    title: "The London Book Fair is to be packed with exciting",
    date: "Jan 25, 2022",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/9_740x470_crop_center.jpg?v=1567855381",
    link: "/blogs/news/the-london-book-fair-is-to-be-packed-with-exciting",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
  },
  {
    title: "Activities of the Frankfurt Book International",
    date: "Jan 25, 2022",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/5b3ef069baa08a98b301e5ae9c9943b2_740x470_crop_center.jpg?v=1567855280",
    link: "/blogs/news/activities-of-the-frankfurt-book-international",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
  },
  {
    title: "Significant reading has a more info number",
    date: "Jan 25, 2022",
    author: "Susan Demo Admin",
    image:
      "https://susan-demo.myshopify.com/cdn/shop/articles/0d6f4828835899.55d4a5402cb87_740x470_crop_center.jpg?v=1567855155",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsum deleniti repellendus nam deserunt vitae...",
  },
];

export default function BlogPage() {
  return (
    <>
      <IntroSection />

      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[1.25rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <a href={post.link} className="block">
                <div className="w-full max-h-[250px] overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold leading-tight mb-2">
                  <a href="#" className="block hover:underline">
                    {post.title}
                  </a>
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">|</span>
                  <span>by {post.author}</span>
                </p>

                <p className="text-gray-700 text-sm mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div>
                  <a
                    href="#"
                    className="text-sm text-gray-900 underline"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
