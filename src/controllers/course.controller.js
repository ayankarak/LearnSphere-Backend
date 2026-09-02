export const getAllCourses = (req, res) => {
    res.json({
        message: "All courses"
    });
};

export const getCourseById = (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Course details",
        id
    });
};

export const createCourse = (req, res) => {
    const { title, price, instructor } = req.body;

    res.json({
        message: "Course created",
        course: {
            title,
            price,
            instructor
        }
    });
};

export const updateCourse = (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Course updated",
        id,
        data: req.body
    });
};

export const deleteCourse = (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Course deleted",
        id
    });
};

