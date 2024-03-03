const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: req.flash("err"),
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      req.flash("err", "Invalid email or password");
      return res.redirect("/login");
    }
    bcrypt
      .compare(pass, user.password)
      .then((result) => {
        if (result) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            res.redirect("/");
          });
        }
        req.flash("err", "Invalid email or password");
        res.redirect("/login");
      })
      .catch((err) => {
        res.redirect("/login");
      });
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  const confirmPass = req.body.confirmPassword;
  console.log(email);
  User.findOne({ email: email })
    .then((useDoc) => {
      if (useDoc) {
        return res.redirect("/signup");
      }
      return bcrypt.hash(pass, 12).then((hashedPass) => {
        const user = new User({
          name: email,
          email: email,
          password: hashedPass,
          cart: { items: [] },
        });
        return user.save();
      });
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {});
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
