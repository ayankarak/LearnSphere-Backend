
import Category from "./category.model.js";
import Course from "./course.model.js";
import Lesson from "./lesson.model.js";
import Enrollment from "./enrollment.model.js";
import User from "./user.model.js";

// Category -> Courses (One-to-Many)
Category.hasMany(Course, {
    foreignKey: "categoryId",
    as: "courses"
});

Course.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category"
});

// Course -> Lessons (One-to-Many)
Course.hasMany(Lesson, {
    foreignKey: "courseId",
    as: "lessons",
    onDelete: "CASCADE"
});

Lesson.belongsTo(Course, {
    foreignKey: "courseId",
    as: "course"
});

// User - Enrollment
User.hasMany(Enrollment, {
  foreignKey: "userId",
  as: "enrollments",
});

Enrollment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Course - Enrollment
Course.hasMany(Enrollment, {
  foreignKey: "courseId",
  as: "enrollments",
});

Enrollment.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

export {Category, Course, Lesson, Enrollment};
