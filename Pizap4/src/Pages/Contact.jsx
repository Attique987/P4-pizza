import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="bg-gray-50 py-20">

      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-14 text-center">

          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-red-600">
            Get In Touch
          </p>

          <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
            We'd Love To Hear From You
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
            Have a question about our menu, delivery, or your order?
            Send us a message and our team will be happy to help.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative overflow-hidden bg-red-600 p-8 text-white md:p-12">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500 opacity-50" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-red-700 opacity-50" />

            <div className="relative z-10">

              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-yellow-300">
                Contact P4 Pizza
              </p>

              <h3 className="text-3xl font-black md:text-4xl">
                Let's Talk About
                <span className="block text-yellow-300">
                  Your Next Meal
                </span>
              </h3>

              <p className="mt-5 max-w-md leading-7 text-red-100">
                Whether you're looking for a delicious pizza, planning a
                family dinner, or need help with your order, we're here for
                you.
              </p>

              {/* CONTACT DETAILS */}
              <div className="mt-10 space-y-6">

                {/* ADDRESS */}
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-red-600">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Our Location
                    </p>

                    <p className="mt-1 text-sm text-red-100">
                      Scheme 3, Rawalpindi
                    </p>
                  </div>

                </div>

                {/* PHONE */}
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-red-600">
                    <Phone size={22} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Call Us
                    </p>

                    <p className="mt-1 text-sm text-red-100">
                      +92 300 1234567
                    </p>
                  </div>

                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-red-600">
                    <Mail size={22} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Email Us
                    </p>

                    <p className="mt-1 text-sm text-red-100">
                      info@p4pizza.com
                    </p>
                  </div>

                </div>

                {/* HOURS */}
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-red-600">
                    <Clock size={22} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Opening Hours
                    </p>

                    <p className="mt-1 text-sm text-red-100">
                      Monday – Sunday
                    </p>

                    <p className="text-sm text-yellow-300">
                      11:00 AM – 12:00 AM
                    </p>
                  </div>

                </div>

              </div>

              {/* QUICK CONTACT */}
              <div className="mt-10 flex items-center gap-3 border-t border-red-500 pt-7">

                <MessageCircle size={20} className="text-yellow-300" />

                <p className="text-sm text-red-100">
                  Fast response • Friendly support • Fresh food
                </p>

              </div>

            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="p-8 md:p-12">

            <div className="mb-8">

              <h3 className="text-2xl font-black text-gray-900">
                Send Us A Message
              </h3>

              <p className="mt-2 text-gray-500">
                Fill out the form below and we'll get back to you.
              </p>

            </div>

            {/* SUCCESS MESSAGE */}
            {submitted && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                ✓ Thank you! Your message has been received.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME + PHONE */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div>

                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                />

              </div>

              {/* MESSAGE */}
              <div>

                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Your Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="6"
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                />

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-bold text-white shadow-lg shadow-red-200 transition duration-300 hover:-translate-y-1 hover:bg-red-700"
              >
                Send Message

                <Send
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

            </form>

          </div>

        </div>

        {/* BOTTOM FEATURES */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Phone size={21} />
            </div>

            <h4 className="font-bold text-gray-900">
              Quick Support
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              We're ready to help with your questions.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Clock size={21} />
            </div>

            <h4 className="font-bold text-gray-900">
              Open Every Day
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Fresh food and great service every day.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <MessageCircle size={21} />
            </div>

            <h4 className="font-bold text-gray-900">
              Customer First
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Your satisfaction is always our priority.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;