import { db } from "../../../firebase";
import Product from "../../components/Product";
import Header from "../../components/Header";

function category({ path, Allproducts }) {
  const categorizedItems = Allproducts.filter((products) => {
    return products.category === path;
  });

  return (
    <div className="bg-[#10acd3] min-h-screen dark:bg-gray-800">
      <Header />
      <h1 className="backdrop-filter bg-white bg-opacity-25 dark:text-white dark:bg-opacity-10 shadow-xl dark:shadow-none flex flex-col p-5 space-y-50 mt-5 mb-5 text-xl font-semibold rounded-lg ml-5 mr-5">
        {`${path} section`}
      </h1>
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
        {categorizedItems.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default category;

export async function getServerSideProps(context) {
  const path = context.query.id;
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

  return {
    props: {
      Allproducts,
      path,
    },
  };
}
