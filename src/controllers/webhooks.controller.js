const stripe = require("stripe")("sk_test_51IYAwmJ5UFJGtqNY5XAkZV7YcOxeb9DBVOYHBpFEQw7Hl5sUOm7Y0MtEEzH8ZMlqhS6SXLlzHYFmxoI1cWvfpcpL00u6751kXb");
const Order = require("../models/order.model");

exports.stripewebhook = (req, res) => {
  
  let data;
  let eventType;
  
  // const webhookSecret = process.env.WEBHOOKSECRET;
  const webhookSecret = "whsec_613accc209a25345fe8d3135de199891693d5e9db387f5dce865900e997e3df2";

  if (webhookSecret) {

    let event;
    let signature = req.headers["stripe-signature"];
    
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {

    case "payment_intent.succeeded":

      const productIdArray = [];
      
      JSON.parse(data.object.metadata.cart).forEach(element => {
        productIdArray.push(element.id);
      });
      
      const newOrder = new Order({
        amount: data.object.amount / 100,
        date: data.object.created,
        user: data.object.metadata.userId,
        products: productIdArray,
        stripeId: data.object.id,
        status: data.object.status
      });

      newOrder.save().then((data) => console.log(data)).then(err => console.log(err));
    
      break;
    
    default:
      
  }
  res.sendStatus(200);
};