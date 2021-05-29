import Product from "./Product";
import React from "react";

const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.slice(0, 4).map((product) => (
        <Product key={product.id} {...product} />
      ))}
      <img
        className="md:col-span-full w-screen"
        src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/6/AmazonStores/ATVPDKIKX0DER/47ef4e639d1650606c58d368adc50358.w2541.h600._CR0%2C46%2C2541%2C508_SX1500_.jpg"
        alt="ban"
      />

      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      {products.slice(5, products.length).map((product) => (
        <Product key={product.id} docId={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductFeed;
