import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addToBasket } from "../slices/basketSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";


const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
    };

    dispatch(addToBasket(product));
    toast.success("Added item to cart");
  };

  return (
    <div
      data-aos="fade-up"
      className="cursoe-pointer backdrop-filter backdrop-blur-2xl bg-white bg-opacity-25 dark:text-white dark:bg-opacity-10 shadow-xl dark:shadow-none rounded-xl relative flex flex-col m-5 z-30 p-10 cursor-ponter items-center"
    >
      <p className="dark:text-gray-100 absolute top-2 right-3 text-xs font-semibold italic text-indigo-900 ">
        {category}
      </p>
      <Image
        onClick={() => router.push(`/Product/${id}`)}
        src={image}
        width={300}
        height={300}
        objectfit="contain"
        alt={title}
      />

      <p className="my-3 font-semibold text-indigo-800 dark:text-gray-100">
        {title}
      </p>

      <div onClick={() => router.push(`/Product/${id}`)} className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p
        onClick={() => router.push(`/Product/${id}`)}
        className="text-xs my-2 text-indigo-600 font-semibold line-clamp-2 dark:text-gray-200"
      >
        {description}
      </p>

      <div
        onClick={() => router.push(`/Product/${id}`)}
        className="mb-5 dark:text-gray-300"
      >
        <Currency quantity={price} currency="INR" />
      </div>

      <button onClick={addItemToBasket} className="btn">
        Add to Basket
        <ShoppingBagIcon className="h-8 w-8 rounded-full cursor-pointer p-1 ml-2" />
      </button>
    </div>
  );
};

export default Product;
