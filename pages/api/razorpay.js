const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handler(req, res) {

 
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: 'rzp_test_7hUvqKUbEBiMqi',
      key_secret: 'X0tlpLDLZLi1upWA5bX3E5O1',
    });

    const body = JSON.parse(req.body)

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = body.amount;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
}
