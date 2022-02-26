const config = require('../configs/checkout.config');
const stripe = require('stripe')(config.stripe.sk);

exports.stripewebhook = (req, res) => {
  
  let data;
  let eventType;
  const event = req.body;

  const webhookSecret = process.env.WEBHOOKSECRET;

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

  let subscription;
  let status;
  switch (eventType) {

    case 'customer.subscription.created':
      console.log(data.object);
      console.log("metadata", data.object.metadata);
      // subscription = event.data.object;
      // status = subscription.status;
      // console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription created.
      // handleSubscriptionCreated(subscription);
      break;

    case 'customer.subscription.updated':
      console.log(data.object);
      console.log("metadata", data.object.metadata);
      // console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription update.
      // handleSubscriptionUpdated(subscription);
      break;
    
    default:
      
  }
  res.sendStatus(200);
};