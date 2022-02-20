module.exports = {
    stripe: {
        next_url: process.env.NEXT_URL,
        sk: process.env.STRIPE_SK,
        webhookSecret: process.env.WEBHOOKSECRET
    }
}