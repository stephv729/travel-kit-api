module.exports = (app) => {
  const Trip = app.models.index.models.Trip;

  app
    .route("/trips")
    .get((req, res) => {
      Trip.findAll({})
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .post((req, res) => {
      Trip.create(req.body)
        .then((data) => {
          return res.json(data);
        })
        .catch((error) => {
          console.log("ERROR:", error.message);
          const errors = error.errors?.map((e) => e.message);
          return res
            .status(422)
            .json({ error: errors?.length !== 0 ? errors : error.message });
        });
    });

  app
    .route("/trips/:id")
    .get((req, res) => {
      Trip.findOne({ where: req.params })
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .delete((req, res) => {
      Trip.destroy({ where: req.params })
        .then((data) => res.json({ status: "deleted" }))
        .catch((error) => res.status(422).json({ error: error.message }));
    });
};
