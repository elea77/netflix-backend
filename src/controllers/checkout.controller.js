const config = require('../configs/checkout.config');
const stripe = require('stripe')(config.stripe.sk);

const initiateStripeSession = async (req) => {
  const priceDataArray = [];

  req.body.cart.forEach(element => {
    priceDataArray.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: element.title
        },
        unit_amount: element.price * 100,
      },
      quantity: element.qty
    })
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: priceDataArray, 
    payment_intent_data: {
      metadata: { userId: req.user.id, cart: JSON.stringify(req.body.cart) },
    },
    mode: "payment",
    success_url: `${config.stripe.next_url}/confirmation?amount=${req.body.total}`,
    cancel_url: `${config.stripe.next_url}/cancel`,
  });
  
  return session;
}

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