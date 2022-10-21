module.exports = (app) => {
  const BlogPost = app.models.index.models.BlogPost;
  const Trip = app.models.index.models.Trip;
  const User = app.models.index.models.User;

  const findTrip = (bg) => {
    const tripId = bg.dataValues["TripId"];
    return Trip.findOne({ where: { id: tripId } });
  };

  const findUser = (trip) => {
    const userId = trip.dataValues["UserId"];
    return User.findOne({ where: { id: userId } });
  };

  app
    .route("/blogposts")
    .get((req, res) => {
      BlogPost.findAll({})
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .post((req, res) => {
      BlogPost.create(req.body)
        .then((data) => res.json(data))
        .catch((error) => {
          console.log("ERROR:", error.message);
          const errors = error.errors?.map((e) => e.message);
          return res
            .status(422)
            .json({ error: errors?.length !== 0 ? errors : error.message });
        });
    });

  app
    .route("/blogposts/:id")
    .get(async (req, res) => {
      try {
        const blogPost = await BlogPost.findOne({ where: req.params });
        const trip = await findTrip(blogPost);
        const user = await findUser(trip);
        const { createdAt, updatedAt, token,...userData } = user.dataValues;
        return res.json({
          ...blogPost.dataValues,
          userDetails: userData,
        });
      } catch {
        (error) => res.status(422).json({ error: error.message });
      }
    })
    .delete((req, res) => {
      BlogPost.destroy({ where: req.params })
        .then((data) => res.json({ status: "deleted" }))
        .catch((error) => res.status(422).json({ error: error.message }));
    });
};
