const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const app = express();

// require files
const index = require("./routes/index");
const auth = require("./routes/auth");
const dashboard = require("./routes/dashboard");
const payment = require("./routes/payment");
const { connectDB } = require("./config/db");

dotenv.config();
// static path
app.use(express.static(path.join(__dirname, "public")));

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cookie parser
app.use(cookieParser());

// express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// method override
app.use(methodOverride("_method"));
// connect flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  next();
});
// express handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

connectDB();

app.use("/", index);
app.use("/auth", auth);
app.use("/dashboard", dashboard);
app.use("/payment", payment);

const PORT = process.env.PORT || 5800;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
