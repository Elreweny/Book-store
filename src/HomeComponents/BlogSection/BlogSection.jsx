import BlogCard from "../../Components/BlogCard/BlogCard";

const blogPosts = [
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

export default function BlogSection() {
  return (
    <>
      <section className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[1.25rem] mt-4">
        {/* العنوان */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-[20px]">Our Products</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-[14px]">
            Murum est notare quam littera gothica, quam nunc putamus parum
            claram anteposuerit litterarum formas.
          </p>
        </div>

        {/* البوستات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <BlogCard key={idx} post={post} />
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="w-full  py-12 mt-12">
        <div className="max-w-[800px] mx-auto px-4 text-center space-y-6">
          <h3 className="text-[14px] leading-[17px] not-last-of-type: mt-[5px] mb-[20px] font-lato font-normal text-[#707070]">
            Special Offers For Subscribers
          </h3>
          <h2 className="text-[30px] leading-[17px] mb-[20px] font-bold  text-[#292929]">
            Ten Percent Member Discount
          </h2>
          <p className="text-[14px] leading-[17px] not-last-of-type: mt-[5px] mb-2.5 font-lato font-normal text-[#707070]">
            Subscribe to our newsletters now and stay up to date with new
            collections.
          </p>

          {/* Form */}
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full sm:w-[300px] px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-md hover:bg-[#333] transition duration-300"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
