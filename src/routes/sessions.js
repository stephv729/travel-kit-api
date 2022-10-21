module.exports = (app) => {
  const User = app.models.index.models.User;
  const jwt = app.get("jwt");

  const payload = {
    check: true,
  };

  function generateToken() {
    return jwt.sign(payload, app.get("key"), {
      expiresIn: "7d",
    });
  }

  app.get("/login", (req, res) => {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user.dataValues.password === req.body.password) {
          const token = generateToken();
          return res.json({ ...user.dataValues, token });
        }
        res.json({ error: "Invalid Credentials" });
      })
      .catch((error) => res.json({ error: error.message }));
  });

  app.post("/signup", (req, res) => {
    User.create(req.body)
      .then((user) => {
        const token = generateToken();
        return res.json({ ...user.dataValues, token });
      })
      .catch((error) => {
        console.log("ERROR:", error);
        const errors = error.errors?.map((e) => e.message);
        return res
          .status(422)
          .json({ error: errors?.length !== 0 ? errors : error.message });
      });
  });

  app.delete("/logout",(req,res)=>{
    
  })
};
