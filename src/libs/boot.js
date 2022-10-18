module.exports = (app) => {
  // app.models.index.sequelize.sync().then(() => {
    app.listen(app.get("port"), () => {
      console.log("Server on port", app.get("port"));
    });
  // });
};
