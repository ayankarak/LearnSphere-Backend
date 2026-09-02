import express from "express";

const router = express.Router();

import {getAllCourses,getCourseById,createCourse,updateCourse,deleteCourse
} from "../controllers/course.controller";

router.get("/", getAllCourses);

router.get("/:id", getCourseById);

router.post("/", createCourse);

router.patch("/:id", updateCourse);

router.delete("/:id", deleteCourse);


module.exports = router;