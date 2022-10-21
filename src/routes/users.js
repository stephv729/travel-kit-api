module.exports = (app) => {
  const User = app.models.index.models.User;
  const verification = app.get("verification");

  app.route("/users").get((req, res) => {
    User.findAll({})
      .then((data) => res.json(data))
      .catch((error) => res.status(422).json({ error: error.message }));
  });

  app.route("/users/:id").get((req, res) => {
    User.findOne({ where: req.params })
      .then((user) => {
        const { createdAt, updatedAt, token, ...userData } = user.dataValues;
        res.json(userData);
      })
      .catch((error) => res.status(422).json({ error: error.message }));
  });

  app
    .route("/profile")
    .get(verification, (req, res) => {
      const currentUser = app.get("user");
      if (!currentUser) {
        return res.json({ error: "Must Signup or Login first" });
      }
      User.findOne({ where: { id: currentUser.dataValues.id } })
        .then((user) => {
          const { createdAt, updatedAt, token, ...userData } = user.dataValues;
          res.json(userData);
        })
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .patch((req, res) => {
      const currentUser = app.get("user");
      if (!currentUser) {
        return res.json({ error: "Must Signup or Login first" });
      }
      User.update(req.body, { where: { id: currentUser.dataValues.id } })
        .then((_data) => res.json({ status: "updated" }))
        .catch((error) => res.status(422).json({ error: error.message }));
    });
};
