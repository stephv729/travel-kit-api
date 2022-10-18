module.exports = (app) => {
  const User = app.models.index.models.User;

  app
    .route("/users")
    .get((req, res) => {
      User.findAll({})
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .post((req, res) => {
      User.create(req.body)
        .then((data) => {
          return res.json(data);
        })
        .catch((error) => {
          console.log("ERROR:", error);
          const errors = error.errors?.map((e) => e.message);
          return res
            .status(422)
            .json({ error: errors?.length !== 0 ? errors : error.message });
        });
    });

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
