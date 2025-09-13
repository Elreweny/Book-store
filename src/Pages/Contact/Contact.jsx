import IntroSection from "../../Components/IntroSection/IntroSection";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const newMessages = [...existingMessages, values];
    localStorage.setItem("messages", JSON.stringify(newMessages));
    setSuccessMessage(
      "Thanks for contacting us. We'll get back to you as soon as possible."
    );
    resetForm();
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <>
      <IntroSection />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-[40px] min-h-[calc(100vh-40px)] px-4 sm:px-6 lg:px-0">
        {/* Contact Info */}
        <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2 lg:pr-4 ">
          <div className="bg-[#f2f2f2] p-[30px] w-full sm:max-w-[350px] md:max-w-[680px] lg:max-w-[432.5px]  lg:h-[582px] ">
            <h3 className="text-[25px] font-medium leading-[32px] mb-[25px]">
              Contact Us
            </h3>
            <p className="text-[#707070] leading-[20px] text-[14px] font-normal not-italic mb-4">
              Claritas est etiam processus dynamicus, qui sequitur mutationem
              consuetudium lectorum. Mirum est notare quam littera gothica, quam
              nunc putamus parum claram anteposuerit litterarum formas human.
              qui sequitur mutationem consuetudium lectorum. Mirum est notare
              quam
            </p>

            <div className="space-y-6 text-sm">
              <div>
                <div className="flex items-center text-[16px] font-medium leading-[26px] mb-2">
                  <FaMapMarkerAlt className="mr-2" /> Address
                </div>
                <p className="text-[14px] leading-[29px] text-[#666]">
                  123 Main Street, Anytown, CA 12345 – USA
                </p>
              </div>

              <div className="border-t border-[#e0e0e0] pt-4">
                <div className="flex items-center text-[16px] font-medium leading-[26px] mb-2">
                  <FaPhone className="mr-2" /> Phone
                </div>
                <p className="text-[14px] leading-[29px] text-[#666] mb-0.5">
                  Mobile: (08) 123 456 789
                </p>
                <p className="text-[14px] leading-[29px] text-[#666]">
                  Hotline: 1009 678 456
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center text-[16px] font-medium leading-[26px] mb-2">
                  <FaEnvelope className="mr-2" /> Email
                </div>
                <p className="text-[14px] leading-[29px] text-[#666] mb-0.5">
                  yourmail@domain.com
                </p>
                <p className="text-[14px] leading-[29px] text-[#666]">
                  support@hastech.company
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center order-2 lg:order-1  px-4">
          <div className="w-full sm:max-w-[350px] md:max-w-[700px] lg:max-w-[600px]">
            <h2 className="text-[25px] font-medium leading-[32px] mb-[25px]">
              Tell Us Your Message
            </h2>

            {successMessage && (
              <div className="mb-4 p-1 rounded bg-green-100 text-green-700 border border-green-300">
                {successMessage}
              </div>
            )}

            <Formik
              initialValues={{ name: "", email: "", subject: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-5">
                <div>
                  <label className="text-[12px] font-normal leading-[29px] block mb-0 text-[#888]">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="leading-[50px] w-full h-[50px] pl-[20px] border border-[#e0e0e0] outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-normal leading-[29px] block mb-0 text-[#888]">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="leading-[50px] w-full h-[50px] pl-[20px] border border-[#e0e0e0] outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-normal leading-[29px] block mb-0 text-[#888]">
                    Subject
                  </label>
                  <Field
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="leading-[50px] w-full h-[50px] pl-[20px] border border-[#e0e0e0] outline-none"
                  />
                  <ErrorMessage
                    name="subject"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-normal leading-[29px] block mb-0 text-[#888]">
                    Your Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Message"
                    rows="8"
                    className="w-full p-2 border border-[#e0e0e0] outline-none"
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black text-white px-5 py-2.5 hover:bg-[#00bfc5]"
                >
                  SEND MESSAGE
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[1.25rem]">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363159048!3d-37.816279442021624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2d3ec8c3b1d!2s123%20Main%20Street%2C%20Anytown!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
          width="100%"
          className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
