module.exports = (app) => {
  const User = app.models.index.models.User;

  app
    .route("/users")
    .get((req, res) => {
      User.findAll({})
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })

  app
    .route("/users/:id")
    .get((req, res) => {
      User.findOne({ where: req.params })
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .patch((req, res) => {
      User.update(req.body, { where: req.params })
        .then((data) => res.json({ status: "updated" }))
        .catch((error) => res.status(422).json({ error: error.message }));
    });
};
