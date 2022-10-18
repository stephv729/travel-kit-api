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
          console.log(data);
          return res.json({ status: "received and created" });
        })
        .catch((error) => {
          console.log("ERROR:", error.message);
          // const errors = error.errors?.map((e) => e.message);
          return res.status(422).json({ error: error.message });
        });
    });
};
