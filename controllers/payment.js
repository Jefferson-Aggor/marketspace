const Payment = require("../models/Payment");
const { sendEmail } = require("../utils/utils");
const postPayment = async (req, res) => {
  const {
    name,
    email,
    phone,
    location,
    quantity,
    product,
    product_name,
    shop_name,
  } = req.body;
  try {
    const payment = await Payment.create(req.body);

    const mailOptions = {
      to: email,
      subject: "Order has been placed",
      html: `
      <p>You have successfully placed an order of ${product_name} from ${shop_name}</p>
      <br>
      <h3>Your order info</h3>
      <p>PRODUCT NAME : <strong>${product_name}</strong></p>
      <p>QUANTITY : <strong>${quantity}</strong></p>
      <p>LOCATION : <strong>${location}</strong></p>
      <p>TEL : <strong>${phone}</strong></p>
      <br>
      <p>Sit tight and relax while we process your order. Thank You</p>
      `,
    };

    try {
      await sendEmail(mailOptions);
      req.flash("success_msg", "Order has been placed");
      res.redirect("/");
    } catch (err) {
      console.log(err);
      req.flash("error_msg", "Failed to place order");
      res.redirect("/");
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { postPayment };
