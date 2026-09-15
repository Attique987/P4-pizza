import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Items = () => {
  return (
    <section className="min-h-[500px] bg-red-600 text-white">
      <div className="mx-auto flex min-h-[500px] w-full max-w-7xl items-center px-5">

        <div className="grid w-full items-center gap-10 md:grid-cols-2">

          {/* LEFT CONTENT */}
          <div>

            <p className="mb-3 text-lg font-bold tracking-wide text-yellow-300">
              FRESH • HOT • DELICIOUS
            </p>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Your Favorite
              <br />

              <span className="text-yellow-300">
                P4 Pizza
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed">
              Delicious pizza, burgers, fried chicken and amazing deals
              delivered straight to your door.
            </p>

            {/* BUTTONS */}
            <div className="mt-7 flex flex-wrap gap-4">

              <Link
                to="/menu"
                className="rounded-full bg-white px-7 py-3 font-bold text-red-600 transition duration-300 hover:scale-105 hover:bg-yellow-300"
              >
                Explore Menu
              </Link>

              <Link
                to="/cart"
                className="rounded-full border-2 border-white px-7 py-3 font-bold text-white transition duration-300 hover:bg-white hover:text-red-600"
              >
                View Cart
              </Link>

            </div>

          </div>

          {/* LOGO */}
          <div className="flex justify-center">

            <img
              src={logo}
              alt="P4 Pizza"
              className="w-72 object-contain md:w-96"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Items;
