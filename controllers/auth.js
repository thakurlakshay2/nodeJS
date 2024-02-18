const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.get("Cookie"));
  // const isLoggedIn = req.get("Cookie").trim().split("=")[1];
  const isLoggedIn = req.session.isLoggedIn;
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5bab316ce0a7c75f783cb8a8")
    .then((user) => {
      req.user = user;
      req.session.isLoggedIn = true;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
  // res.setHeader("Set-Cookie", "loggedIn=true");
};

exports.postLogout = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true");
  req.session.destroy(() => {
    res.redirect("/");
  });
};
