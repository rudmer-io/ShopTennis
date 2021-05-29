import { MinusSmIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  removeGroupedFromBasket,
} from "../slices/basketSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  quantity,
}) {
  const dispatch = useDispatch();

  const total = price * quantity;

  function addItemToBasket() {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    };

    dispatch(addToBasket(product));
    toast.success("Increased item");
  }

  function removeItemFromBasket() {
    dispatch(removeFromBasket({ id }));

    toast.error("Removed item");
  }

  function removeGroupFromBasket() {
    dispatch(removeGroupedFromBasket({ id }));
    toast.error("Removed item");
  }

  return (
    <div className="block py-4 sm:grid sm:grid-cols-5 sm:my-3">
      <div className="text-center sm:text-left">
        <Image src={image} width={200} height={200} objectfit="contain" />
      </div>

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p className="my-3 text-[#023047] dark:text-gray-200">{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3 text-[#023047] dark:text-gray-200">
          {description}
        </p>
        <div className="flex">
          <p className="text-[#023047] dark:text-gray-200">
            {" "}
            {quantity} × <Currency quantity={price} currency="INR" /> = {"  "}
          </p>
          <span className="font-bold ml-1 text-[#023047] dark:text-gray-200">
            <Currency quantity={total} currency="INR" />
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end mr-2">
        <div className="flex justify-between xs:justify-start">
          <button className="btn sm:p-1" onClick={removeItemFromBasket}>
            <MinusSmIcon className="h-5 text-[#023047] dark:text-gray-200" />
          </button>
          <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap text-[#023047] dark:text-gray-200">
            Quantity:{" "}
            <span className="font-bold text-[#023047] dark:text-gray-200">
              {quantity}
            </span>
          </div>
          <button className="btn sm:p-1" onClick={addItemToBasket}>
            <PlusIcon className="h-5 text-[#023047] dark:text-gray-200" />
          </button>
        </div>
        <button className="btn" onClick={removeGroupFromBasket}>
          Remove all from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
