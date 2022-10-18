import express from "express";
import consign from "consign";

const app = express();

consign({
  cwd: __dirname, //current work directory
})
  .include("libs/config.js")
  .then("models/index.js")
  .then("libs/middlewares.js")
  .then("routes")
  .then("libs/boot.js")
  .into(app);
