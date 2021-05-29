import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import useDarkMode from "../hooks/useDarkMode";
import { LightBulbIcon, MoonIcon } from "@heroicons/react/solid";

function Header() {
  const router = useRouter();
  const items = useSelector(selectItems);
  const [colorTheme, setTheme] = useDarkMode();
  const [session] = useSession();

  return (
    <header className="flex  justify-between p-4 items-center bg-[#10acd3] dark:bg-gray-800">
      <Image
        onClick={() => router.push("/")}
        objectfit="contain"
        width={270}
        height={75}
        src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1622298755/image-removebg-preview_19_lvtnz9.png"
        alt="logo"
        className="cursor-pointer"
      />

      <div className="flex">
        <h3 className="link" onClick={() => router.push("/contact")}>
          Contact
        </h3>
        <h3 className="link" onClick={() => router.push("/orders")}>
          Orders
        </h3>
        <h3 className="link" onClick={() => router.push("/category")}>
          Shop by category
        </h3>
      </div>
      <div className="flex">
        <h3 onClick={!session ? signIn : signOut} className="link">
          {!session ? <p>Sign in</p> : <p>Hi, {session.user.name}</p>}
        </h3>
        <h2
          onClick={() => router.push("/checkout")}
          className="mr-2 text-lg font-semibold cursor-pointer dark:text-gray-200"
        >
          {items.length}
        </h2>
        <svg
          onClick={() => router.push("/checkout")}
          xmlns="http://www.w3.org/2000/svg"
          className="backdrop-filter bg-white bg-opacity-25 dark:text-white dark:bg-opacity-10 shadow-xl dark:shadow-none h-8 w-8 rounded-full cursor-pointer p-1 backdrop-blur-xl text-[#023047] dark:bg-gray-900 dark:backdrop-filter-none ring-[2px] ring-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {colorTheme === "light" ? (
          <LightBulbIcon
            onClick={() => setTheme("light")}
            className="h-8 text-gray-400 dark:text-gray-200 ml-2 cursor-pointer"
          />
        ) : (
          <MoonIcon
            onClick={() => setTheme("dark")}
            className="h-8 text-[#023047]  ml-2 cursor-pointer"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
