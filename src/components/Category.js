import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

const Category = ({ name, image }) => {
  const router = useRouter();

  return (
    <div
      data-aos="fade-up"
      className="backdrop-filter backdrop-blur-2xl bg-white bg-opacity-25 dark:text-white dark:bg-opacity-10 shadow-xl dark:shadow-none rounded-xl relative flex flex-col m-5 z-30 p-10 cursor-ponter items-center justify-center cursor-pointer w-[300px]"
    >
      <Image
        onClick={() => router.push(`/category/${name}`)}
        src={image}
        width={300}
        height={300}
        objectfit="contain"
        alt={name}
      />

      <p className="my-3 font-semibold text-indigo-800 dark:text-gray-100">
        {name}
      </p>
    </div>
  );
};

export default Category;
