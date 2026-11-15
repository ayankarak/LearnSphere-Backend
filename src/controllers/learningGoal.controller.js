
import { Op } from "sequelize";

import {
    LearningGoal,
    LessonProgress
} from "../models/associations.js";

import { createLearningGoalSchema } from "../validators/learningGoal.validator.js";

import {
    BadRequestError
} from "../utils/AppError.js";


// GET TODAY AND TOMORROW GOALS
export const getLearningGoals = async (req, res) => {
    const userId = req.user.id;

    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

    const tomorrowDate = new Date(`${today}T00:00:00Z`);
    tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);

    const tomorrow = tomorrowDate.toISOString().slice(0, 10);

    const goals = await LearningGoal.findAll({
        where: {
            userId,
            goalDate: {
                [Op.in]: [today, tomorrow]
            }
        },
        order: [["goalDate", "ASC"]]
    });

    const goalsWithProgress = await Promise.all(
        goals.map(async (goal) => {
            const startDate = new Date(
                `${goal.goalDate}T00:00:00+05:30`
            );

            const endDate = new Date(
                `${goal.goalDate}T00:00:00+05:30`
            );

            endDate.setDate(endDate.getDate() + 1);

            const completedLessons = await LessonProgress.count({
                where: {
                    userId,
                    isCompleted: true,
                    completedAt: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    }
                }
            });

            return {
                ...goal.toJSON(),
                completedLessons,
                remainingLessons: Math.max(
                    goal.targetLessons - completedLessons,
                    0
                )
            };
        })
    );

    res.status(200).json({
        success: true,
        goals: goalsWithProgress
    });
};


// CREATE OR UPDATE LEARNING GOAL
export const createLearningGoal = async (req, res) => {
    const validation = createLearningGoalSchema.safeParse(req.body);

    if (!validation.success) {
        throw new BadRequestError(
            validation.error.issues[0].message
        );
    }

    const { goalDate, targetLessons } = validation.data;
    const userId = req.user.id;

    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

    const tomorrowDate = new Date(`${today}T00:00:00Z`);
    tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);

    const tomorrow = tomorrowDate.toISOString().slice(0, 10);

    if (goalDate !== today && goalDate !== tomorrow) {
        throw new BadRequestError(
            "You can only set goals for today or tomorrow"
        );
    }

    let goal = await LearningGoal.findOne({
        where: {
            userId,
            goalDate
        }
    });

    if (goal) {
        goal.targetLessons = targetLessons;
        await goal.save();
    } else {
        goal = await LearningGoal.create({
            userId,
            goalDate,
            targetLessons
        });
    }

    res.status(200).json({
        success: true,
        message: "Learning goal saved successfully",
        goal
    });
};
