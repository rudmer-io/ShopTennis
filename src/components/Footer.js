import { useRouter } from "next/router";
import Image from "next/image";

function Footer() {
  const router = useRouter();
  return (
    <footer className="flex flex-col items-center justify-around p-2 w-screen">
      <div className="backdrop-filter backdrop-blur-2xl justify-around items-center bg-white bg-opacity-25 w-[90vw] dark:text-white dark:bg-opacity-10 shadow-xl dark:shadow-none rounded-xl relative flex p-3">
        <Image
          onClick={() => router.push("/")}
          objectfit="contain"
          width={90}
          height={60}
          src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1622372782/image-removebg-preview_20_grp1mc.png"
          alt="logo"
          className="cursor-pointer hidden sm:inline-flex"
        />
        <h3 className="link">© Copyright</h3>
        <h3
          className="link hidden sm:inline-flex"
          onClick={() => router.push("/contact")}
        >
          Contact
        </h3>
        <div>
          <a className="link" href="https://stripe.com/">
            Payment by Stripe
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
