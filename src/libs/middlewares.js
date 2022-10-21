import express from "express";
import cors from "cors";
import { tokenKey } from "../keys";
import jwt from "jsonwebtoken";

module.exports = (app) => {
  const verification = express.Router();
  verification.use((req, res, next) => {
    let token = req.headers["authorization"] || req.headers["x-access-token"];
    const tokenType = "Bearer ";
    if (!token) {
      return res.status(401).send({
        error: "Must send a valid token",
      });
    }
    if (token.startsWith(tokenType)) {
      token = token.slice(tokenType.length, token.length);
    }
    if (token) {
      jwt.verify(token, tokenKey, (error, decoded) => {
        const currentUser = app.get("user");
        console.log(currentUser);
        if (error || token !== currentUser?.dataValues?.token) {
          return res.json({
            error: "Invalid token",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  });

  app.set("port", process.env.PORT || 8000);
  app.set("key", tokenKey);
  app.set("jwt", jwt);
  app.set("verification", verification);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
};
// const jwt = require("jsonwebtoken");
