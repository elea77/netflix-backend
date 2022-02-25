const config = require('../configs/checkout.config');
// const stripe = require('stripe')(config.stripe.sk);
const stripe = require('stripe')("sk_test_51IYAwmJ5UFJGtqNY5XAkZV7YcOxeb9DBVOYHBpFEQw7Hl5sUOm7Y0MtEEzH8ZMlqhS6SXLlzHYFmxoI1cWvfpcpL00u6751kXb");

const initiateStripeSession = async (req) => {
  const priceDataArray = [
    {
      price_data: {
        currency: "eur",
        product_data: {
          name: req.body.abonnement,
        },
        unit_amount: req.body.total * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: priceDataArray,
    payment_intent_data: {
      metadata: { userId: req.user.id, abonnement: JSON.stringify(req.body) },
    },
    mode: "payment",
    success_url: `http://localhost:3000/confirmation?amount=${req.body.total}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  return session;
};

exports.createSession = async function (req, res) {
  try {
    const session = await initiateStripeSession(req);
    res.status(200).json({
      id: session.id,
      price: session.amout_total,
      currency: session.currency,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};