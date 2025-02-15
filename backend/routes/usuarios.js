import express from "express";
import { register, getUsers, deleteUser } from "../controllers/usuario.js";

const router = express.Router();

router.post("/register", register);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;
