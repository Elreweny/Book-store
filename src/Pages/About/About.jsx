
import IntroSection from "../../Components/IntroSection/IntroSection";

export default function About() {
  return (
    <>
      
      <IntroSection />

      
      <section
        className="max-w-screen-xl mx-auto 
        px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-16 
        grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        {/* الصورة */}
        <div className="w-full aspect-[4/3] lg:max-w-[540px]">
          <img
            src="/imgs/about.jpg"
            alt="About"
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>

        {/* النص */}
        <div className="mt-8 lg:mt-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            WELCOME TO <span className="text-[#00bfc5]">SUSAN.</span>
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Eposi provide how all this mistaken idea of denouncing pleasure and
            sing pain was born an will give you a complete account of the
            system, and expound the actual teachings of the eat explorer of the
            truth, the mer of human.
          </p>
          <h3 className="text-xl font-bold mb-4">
            WIN BEST ONLINE SHOP AT 2019
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Eposi provide how all this mistaken idea of denouncing pleasure and
            sing pain was born an will give you a complete account of the
            system, and expound the actual teachings of the eat explorer of the
            truth, the mer of human.
          </p>
        </div>
      </section>

      {/* سيكشن الأعمدة */}
      <section
        className="max-w-screen-xl mx-auto 
        px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-16 
        grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        <div>
          <h4 className="font-bold mb-2">OUR MESSAGE</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Mirum est notare quam littera gothica, quam nunc putamus parum
            claram, anteposuerit litterarum formas humanitatis per seacula
            quarta decima et quinta decima.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-2">OUR GOAL</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Mirum est notare quam littera gothica, quam nunc putamus parum
            claram, anteposuerit litterarum formas humanitatis per seacula
            quarta decima et quinta decima.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-2">OUR VISION</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Mirum est notare quam littera gothica, quam nunc putamus parum
            claram, anteposuerit litterarum formas humanitatis per seacula
            quarta decima et quinta decima.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-2">OUR VALUES</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Mirum est notare quam littera gothica, quam nunc putamus parum
            claram, anteposuerit litterarum formas humanitatis per seacula
            quarta decima et quinta decima.
          </p>
        </div>
      </section>
    </>
  );
}
