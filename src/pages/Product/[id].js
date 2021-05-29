import { db } from "../../../firebase";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import CategorizedProduct from "../../components/CategorizedProduct";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

function product({ currentProduct, Allproducts }) {
  const dispatch = useDispatch();
  const id = currentProduct.id;
  const title = currentProduct.title;
  const price = currentProduct.price;
  const description = currentProduct.description;
  const category = currentProduct.category;
  const image = currentProduct.image;
  const rating = currentProduct.rating;

  const removeSameProduct = Allproducts.filter((products) => {
    return products.id !== id;
  });

  const categorizedItems = removeSameProduct.filter((products) => {
    return products.category === category;
  });

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
    <div className="bg-[#10acd3] dark:bg-gray-800">
      <Header />
      <ToastContainer />
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dssvrf9oz/image/upload/v1620273120/image-removebg-preview_6_obe3fv.png"
        />
      </Head>

      <div
        data-aos="fade-up"
        className="backdrop-filter backdrop-blur-2xl bg-white bg-opacity-25 dark:text-white dark:bg-opacity-10 shadow-xl dark:shadow-none rounded-xl relative flex flex-col m-5 z-30 p-10 cursor-ponter items-center"
      >
        <p className="dark:text-gray-100 absolute top-2 right-3 text-xs font-semibold italic text-indigo-900 ">
          {category}
        </p>
        <img
          src={image}
          width={300}
          height={300}
          objectfit="contain"
          alt={title}
        />

        <p className="my-3 font-semibold text-indigo-800 dark:text-gray-100">
          {title}
        </p>

        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 text-indigo-600 font-semibold  dark:text-gray-200">
          {description}
        </p>

        <div className="mb-5 dark:text-gray-300">
          <Currency quantity={price} currency="INR" />
        </div>

        <button onClick={addItemToBasket} className="btn">
          Add to Basket
          <ShoppingBagIcon className="h-8 w-8 rounded-full cursor-pointer p-1 ml-2" />
        </button>
      </div>
      <div className="flex items-center justify-center flex-col">
        <h2 className="font-semibold text-indigo-800 dark:text-gray-100">
          Similar Products
        </h2>
        <div className="flex flex-wrap items-center justify-center">
          {categorizedItems.map((item) => (
            <CategorizedProduct
              key={item.id}
              title={item.title}
              id={item.id}
              price={item.price}
              image={item.image}
              category={item.category}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default product;

export async function getServerSideProps(context) {
  const ref = db.collection("products").doc(context.query.id);
  const allproducts = await db.collection("products").get();

  const Allproducts = await Promise.all(
    allproducts.docs.map(async (product) => ({
      id: product.id,
      image: product.data().image,
      category: product.data().category,
      description: product.data().description,
      price: product.data().price,
      title: product.data().title,
      rating: product.data().rating,
    }))
  );

  const productRes = await ref.get();
  const currentProduct = {
    id: productRes.id,
    ...productRes.data(),
  };

  return {
    props: {
      currentProduct,
      Allproducts,
    },
  };
}
