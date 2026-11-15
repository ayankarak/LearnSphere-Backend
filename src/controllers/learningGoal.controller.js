
import { Op } from "sequelize";

import {
    LearningGoal,
    LearningGoalTask
} from "../models/associations.js";

import {
    createLearningGoalTaskSchema,
    updateLearningGoalTaskSchema
} from "../validators/learningGoal.validator.js";

import {
    BadRequestError,
    NotFoundError
} from "../utils/AppError.js";


// GET TODAY AND TOMORROW GOALS
export const getLearningGoals = async (req, res) => {

    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

    const tomorrowDate = new Date(`${today}T00:00:00Z`);
    tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);

    const tomorrow = tomorrowDate.toISOString().split("T")[0];

    const goals = await LearningGoal.findAll({
        where: {
            userId: req.user.id,
            goalDate: {
                [Op.in]: [today, tomorrow]
            }
        },
        include: [
            {
                model: LearningGoalTask,
                as: "tasks",
                attributes: [
                    "id",
                    "taskText",
                    "isCompleted",
                    "createdAt",
                    "updatedAt"
                ]
            }
        ],
        order: [
            ["goalDate", "ASC"],
            [{ model: LearningGoalTask, as: "tasks" }, "createdAt", "ASC"]
        ]
    });

    res.status(200).json({
        success: true,
        goals
    });
};


// ADD NEW TASK
export const createLearningGoalTask = async (req, res) => {

    const validation = createLearningGoalTaskSchema.safeParse(req.body);

    if (!validation.success) {
        throw new BadRequestError(
            validation.error.issues[0].message
        );
    }

    const { goalDate, taskText } = validation.data;

    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

    const tomorrowDate = new Date(`${today}T00:00:00Z`);
    tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);

    const tomorrow = tomorrowDate.toISOString().split("T")[0];

    if (![today, tomorrow].includes(goalDate)) {
        throw new BadRequestError(
            "Goals can only be created for today or tomorrow"
        );
    }

    const [goal] = await LearningGoal.findOrCreate({
        where: {
            userId: req.user.id,
            goalDate
        },
        defaults: {
            userId: req.user.id,
            goalDate
        }
    });

    const task = await LearningGoalTask.create({
        goalId: goal.id,
        taskText
    });

    res.status(201).json({
        success: true,
        message: "Task added successfully",
        task
    });
};


// UPDATE TASK
export const updateLearningGoalTask = async (req, res) => {

    const validation = updateLearningGoalTaskSchema.safeParse(req.body);

    if (!validation.success) {
        throw new BadRequestError(
            validation.error.issues[0].message
        );
    }

    const task = await LearningGoalTask.findOne({
        where: {
            id: req.params.taskId
        },
        include: [
            {
                model: LearningGoal,
                as: "goal",
                where: {
                    userId: req.user.id
                },
                attributes: []
            }
        ]
    });

    if (!task) {
        throw new NotFoundError("Task not found");
    }

    await task.update(validation.data);

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task
    });
};


// DELETE TASK
export const deleteLearningGoalTask = async (req, res) => {

    const task = await LearningGoalTask.findOne({
        where: {
            id: req.params.taskId
        },
        include: [
            {
                model: LearningGoal,
                as: "goal",
                where: {
                    userId: req.user.id
                },
                attributes: []
            }
        ]
    });

    if (!task) {
        throw new NotFoundError("Task not found");
    }

    await task.destroy();

    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });
};
