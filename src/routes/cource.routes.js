import express from "express";

const router = express.Router();
import validate from "../middleware/validate.middleware.js";
import { createCourseSchema, updateCourseSchema } from "../validators/course.validator.js";

import {getAllCourses,getCourseById,createCourse,updateCourse,deleteCourse
} from "../controllers/course.controller.js";

router.get("/", getAllCourses);

router.get("/:id", getCourseById);

router.post("/", validate(createCourseSchema), createCourse);

router.patch("/:id", validate(updateCourseSchema), updateCourse);

router.delete("/:id", deleteCourse);

export default router;