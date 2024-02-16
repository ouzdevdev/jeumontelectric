const passport = require("passport");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await User.findOne({ where: { user_email: email } });
      if (!user) {
        return done(null, false, { message: "Invalid email" });
      }

      if (user.user_password !== password) {
        return done(null, false, { message: "Invalid email or password" });
      }

      return done(null, user);
    }
  )
);

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const accessToken = jwt.sign(
        {
          email: user.user_email,
          role: user.role_id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      const refreshToken = jwt.sign(
        {
          email: user.user_email,
          role: user.role_id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      res.json({ accessToken, refreshToken });
    });
  })(req, res, next);
};

exports.refresh = (req, res) => {
  const { refreshToken } = req.body;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        user_email: decoded.email,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          email: foundUser.user_email,
          role: foundUser.role_id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ accessToken });
    })
  );
};
