import { Router } from "express";

const healCheckRoute = Router();

healCheckRoute.get("/",(req, res) => {
    res.status(200).json({ message: "server is healthy" });
})

export default healCheckRoute;