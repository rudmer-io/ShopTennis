import { groupBy } from "lodash";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email, name } = req.body;

  const groupedItems = Object.values(groupBy(items, "id"));

  const transformedItems = groupedItems.map((group) => ({
    description: group[0].description,
    quantity: group.length,
    price_data: {
      currency: "inr",
      unit_amount: group[0].price * 100,
      product_data: {
        name: group[0].title,
        images: [group[0].image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1ItxEESFst3xNopgDUD588ny"],
    shipping_address_collection: {
      allowed_countries: [
        "GB",
        "AF",
        "QA",
        "RU",
        "AO",
        "US",
        "FR",
        "IN",
        "PL",
        "RS",
        "SG",
        "RO",
        "PT",
        "PH",
        "PK",
        "NP",
        "MN",
        "MX",
        "LK",
        "KR",
        "JP",
        "IL",
        "ID",
        "GR",
        "IT",
        "ES",
        "EG",
        "DE",
        "CN",
        "BR",
        "BD",
        "AU",
        "AE",
      ],
    },
    line_items: transformedItems,
    mode: "payment",
    discounts: [
      {
        coupon: "SHOP20",
      },
    ],
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      name,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
