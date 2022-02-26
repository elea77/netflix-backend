const config = require('../configs/checkout.config');
const stripe = require('stripe')(config.stripe.sk);

const initiateStripeSession = async (req) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ['data.product'],
  });

  // console.log("token", req.headers.authorization);
  // console.log("user id",req.user.id);

  const filteredResult = prices.data.find((e) => e.lookup_key == req.body.abonnement);

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: filteredResult.id,
        quantity: 1,
      },
    ],
    metadata: {
      userId: req.user.id,
      token: req.headers.authorization
    },
    mode: 'subscription',
    success_url: `${config.stripe.next_url}/checkout/confirmation?amount=${req.body.total}`,
    cancel_url: `${config.stripe.next_url}/checkout/cancel`,
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