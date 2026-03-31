import { Router } from "express";
import { getTareas, getTareasById, createTarea, updateTarea, deleteTarea, getTareasByUserId } from "../controllers/tareasControllers.js";

const tareasRouter = Router();

tareasRouter.get("/", getTareas);
tareasRouter.get("/usuario/:userId", getTareasByUserId);
tareasRouter.get("/:id", getTareasById);
tareasRouter.post("/", createTarea);
tareasRouter.put("/:id", updateTarea);
tareasRouter.delete("/:id", deleteTarea);

export default tareasRouter;
