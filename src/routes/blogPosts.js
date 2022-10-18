module.exports = (app) => {
  const BlogPost = app.models.index.models.BlogPost;

  app
    .route("/blogposts")
    .get((req, res) => {
      BlogPost.findAll({})
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .post((req, res) => {
      BlogPost.create(req.body)
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
    .route("/blogposts/:id")
    .get((req, res) => {
      BlogPost.findOne({ where: req.params })
        .then((data) => res.json(data))
        .catch((error) => res.status(422).json({ error: error.message }));
    })
    .delete((req, res) => {
      BlogPost.destroy({ where: req.params })
        .then((data) => res.json({ status: "deleted" }))
        .catch((error) => res.status(422).json({ error: error.message }));
    });
};
