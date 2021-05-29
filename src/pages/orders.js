import { getSession, useSession } from "next-auth/client";
import { db } from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";
import moment from "moment";
import { useRouter } from "next/router";
import Head from "next/head";

function Orders({ orders }) {
  const [session] = useSession();
  const router = useRouter();

  return (
    <div className="bg-[#10acd3] dark:bg-gray-800 min-h-screen">
      <Header />
      <Head>
        <title>Your orders</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dssvrf9oz/image/upload/v1620273120/image-removebg-preview_6_obe3fv.png"
        />
      </Head>
      <main className="max-w-screen-lg mx-auto p-10">
        <div className="text-3xl mb-2 pb-1 backdrop-filter backdrop-blur-2xl bg-white bg-opacity-25 dark:text-white dark:bg-opacity-10 shadow-xl dark:shadow-none rounded-lg pl-4">
          <h1 className="border-b-2 border-gray-700 dark:border-white pb-4">
            Your orders
          </h1>

          {session ? (
            <h2 className="text-xl">
              {orders.length > 0 ? (
                <>
                  {orders.length} Order{orders.length > 1 && "s"}
                </>
              ) : (
                <>
                  You don't have any order yet. Go visit the{" "}
                  <button
                    onClick={() => router.push("/")}
                    className="link  underline hover:no-underline"
                  >
                    Homepage Store
                  </button>{" "}
                  to purchase some items.
                </>
              )}
            </h2>
          ) : (
            <h2>Please sign in to see your orders.</h2>
          )}
        </div>

        <div className="text-3xl pt-2 mb-2 pb-1 backdrop-filter backdrop-blur-2xl bg-white bg-opacity-25 dark:text-white dark:bg-opacity-10 shadow-xl dark:shadow-none rounded-lg pl-0">
          {orders?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              amount={order.amount}
              amountShipping={order.amountShipping}
              images={order.images}
              timestamp={order.timestamp}
              items={order.items}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return { props: { orders } };
}