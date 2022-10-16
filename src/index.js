import express from "express";

const app = express();

//Settings
app.set("port", process.env.PORT || 3050);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
