module.exports = (app) => {
  const User = app.models.index.models.User;
  const jwt = app.get("jwt");
  app.get("/login", (req, res) => {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user.dataValues.password === req.body.password) {
          const payload = {
            check: true,
          };
          const token = jwt.sign(payload, app.get("key"), {
            expiresIn: "7d",
          });
          return res.json({ ...user.dataValues, token });
        }
        res.json({ error: "Invalid Credentials" });
      })
      .catch((error) => res.json({ error: error.message }));
  });
};
