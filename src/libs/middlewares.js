import express from "express";
import cors from "cors";

module.exports = (app) => {
  app.set("port", process.env.PORT || 8000);
  app.use(express.json());
  app.use(cors());
};
