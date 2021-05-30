import { db } from "../../../firebase";
import Category from "../../components/Category";
import Header from "../../components/Header";

function categoryPage({ categories }) {
  return (
    <div className="bg-[#10acd3] dark:bg-gray-800">
      <Header />
      <div className="flex flex-wrap">
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
}

export default categoryPage;

export async function getServerSideProps(context) {
  const getcategories = await db.collection("categories").get();

  const categories = await Promise.all(
    getcategories.docs.map(async (product) => ({
      image: product.data().image,
      name: product.data().name,
    }))
  );

  return {
    props: {
      categories,
    },
  };
}
