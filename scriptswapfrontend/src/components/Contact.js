import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_f5b8da5",
        "template_8jpb5hd",
        {
          from_name: form.name,
          to_name: "Ganesh Bhabad",
          from_email: form.email,
          to_email: "webdevelopmentapi2022@gmail.com",
          message: form.message,
        },
        "30ZReYN4kBs73ou3E"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="flex flex-col items-center gap-5 px-4 md:px-0 mt-12 w-full">
  <div className="text-center">
    <h3 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
      Contact
    </h3>
  </div>

  <p className="text-lg text-center text-black mb-4 mx-8 p-6 rounded-lg bg-white w-full max-w-3xl">
    Have any questions or feedback? We’d love to hear from you! Reach out
    through the contact form, and we’ll get back to you as soon as
    possible. Your input helps us improve and serve you better.
  </p>

  <form
    ref={formRef}
    onSubmit={handleSubmit}
    className="mt-8 w-full max-w-3xl flex flex-col gap-6 bg-white p-6 rounded-lg shadow-lg"
  >
    <label className="flex flex-col">
      <span className="text-black font-medium mb-2">Your Name</span>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="What's your good name?"
        className="bg-white py-3 px-4 placeholder:text-secondary text-black rounded-lg outline-none border border-gray-600 focus:border-blue-500"
      />
    </label>
    <label className="flex flex-col">
      <span className="text-black font-medium mb-2">Your Email</span>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="What's your email address?"
        className="bg-white py-3 px-4 placeholder:text-secondary text-black rounded-lg outline-none border border-gray-600 focus:border-blue-500"
      />
    </label>
    <label className="flex flex-col">
      <span className="text-black font-medium mb-2">Your Message</span>
      <textarea
        rows={7}
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="What you want to say?"
        className="bg-white py-3 px-4 placeholder:text-secondary text-black rounded-lg outline-none border border-gray-600 focus:border-blue-500"
      />
    </label>
    <div className="flex justify-center items-center">
    <button
      type="submit"
      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transform hover:scale-105 transition-transform duration-300"
      style={{maxWidth:'14rem'}}
    >
      {loading ? "Sending..." : "Send"}
    </button>
    </div>
  </form>
</div>

);
 
};

export default Contact;
