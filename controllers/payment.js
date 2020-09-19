const Payment = require("../models/Payment");
const sendEmail = require("../utils/sendEmail");
const postPayment = async (req, res) => {
  const {
    name,
    email,
    owner_email,
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
      <p>You have successfully placed an order of <strong> ${product_name} </strong> from <strong> ${shop_name} </strong> </p>
      <br>
     
      <p>Sit tight and relax while we process your order. Thank You</p>
      `,
    };

    const mailToOwner = {
      to: owner_email,
      subject: "An order has been placed",
      html: `
      <h3> Order info</h3>
      <p> Name : <strong>${name}</strong></p>
      <p>Email : <strong>${email}</strong></p>
      <p>Tel : <strong>${phone}</strong></p>
      <p>Location : <strong>${location}</strong></p>
      <p>Quantity : <strong>${quantity}</strong>
      <p>Ordered At : <strong>${payment.orderedAt}</strong>
      <br>
      <br>
      <a href='${req.protocol}://${req.get(
        "host"
      )}/dashboard'>Go to dashboard</a> to process order.
      `,
    };

    try {
      await sendEmail(mailOptions);
      req.flash("success_msg", "Order has been placed");
      res.redirect(`/product/${product}`);
      await sendEmail(mailToOwner);
    } catch (err) {
      req.flash("error_msg", "Failed to place order");
      console.log(err);
      res.redirect(`/product/${product}`);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const formatPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({ _id: req.params._id });

    if (!payment) {
      req.flash(
        "error_msg",
        `Product with ordered id of ${req.params._id} not found `
      );
      res.redirect(`/dashboard/${req.user._id}/sales`);
    }

    payment.new = false;

    payment.save();
    req.flash("success_msg", "Order has been processed");
    res.redirect(`/dashboard/${req.user._id}/sales`);
  } catch (error) {
    console.log(err.message);
  }
};

module.exports = { postPayment, formatPayment };
