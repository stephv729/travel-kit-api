module.exports = (app) => {
  const User = app.models.index.models.User;
  const jwt = app.get("jwt");
  const verification = app.get("verification");

  const payload = {
    check: true,
  };

  function generateToken() {
    return jwt.sign(payload, app.get("key"), {
      expiresIn: "1d",
    });
  }

  app.post("/login", (req, res) => {
    User.findOne({ where: { email: req.body.email } })
      .then(async (user) => {
        if (user.dataValues.password === req.body.password) {
          const newToken = generateToken();

          await User.update(
            { token: newToken },
            { where: { id: user.dataValues.id } }
          );
          const updatedUser = await User.findOne({
            where: { id: user.dataValues.id },
          });
          app.set("user", updatedUser);
          const { createdAt, updatedAt, token, ...userData } = user.dataValues;
          return res.json({ ...userData, token: newToken });
        }
        res.json({ error: "Invalid Credentials" });
      })
      .catch((error) => res.json({ error: error.message }));
  });

  app.post("/signup", (req, res) => {
    User.create(req.body)
      .then(async (user) => {
        const newToken = generateToken();

        await User.update(
          { token: newToken },
          { where: { id: user.dataValues.id } }
        );
        const updatedUser = await User.findOne({
          where: { id: user.dataValues.id },
        });
        app.set("user", updatedUser);
        const { createdAt, updatedAt, token, ...userData } = user.dataValues;
        return res.json({ ...userData, token: newToken });
      })
      .catch((error) => {
        console.log("ERROR:", error);
        const errors = error.errors?.map((e) => e.message);
        return res
          .status(422)
          .json({ error: errors?.length !== 0 ? errors : error.message });
      });
  });

  app.delete("/logout", verification, async (req, res) => {
    const currentUser = app.get("user");
    console.log(currentUser);
    if (!currentUser) {
      return res.json({ error: "Must Signup or Login first" });
    }
    User.update(
      { token: null },
      { where: { id: currentUser.dataValues?.id } }
    ).then(
      ()=> res.json({ msg: "You logged out succesfully" })
    ).catch(
      (error)=>res.json({ error: error.message })
    );
   
  });
};
