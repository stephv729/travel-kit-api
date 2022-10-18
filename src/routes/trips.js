module.exports = (app) => {
  const Trips = app.db.models.Trips;

  app
    .route("/trips")
    .get((req, res) => {
      Trips.findAll({})
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .post((req, res) => {
      Trips.create(req.body)
        .then((data) => {
          console.log(data);
          return res.json({ status: "received and created" });
        })
        .catch((error) => {
          console.log(error)
          const errors = error.errors?.map((e) => e.message);
          return res.status(422).json({ errors });
        });
    });
};
