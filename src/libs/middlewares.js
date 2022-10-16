import express from "express";

module.exports = (app) => {
  app.set("port", process.env.PORT || 3050);
  app.use(express.json());
};
