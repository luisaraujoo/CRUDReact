import express from "express";
import { login } from "../controllers/authentication.js";

const router = express.Router();

router.post("/login", login);

export default router;
