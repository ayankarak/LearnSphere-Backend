import { Op } from "sequelize";
import { UserActivity } from "../models/associations.js";
import { BadRequestError } from "../utils/AppError.js";

// SAVE USER ACTIVE TIME
export const saveActivity = async (req, res) => {
    const userId = req.user.id;
    const { activeSeconds } = req.body;

    if (
        !Number.isInteger(activeSeconds) ||
        activeSeconds <= 0 ||
        activeSeconds > 60
    ) {
        throw new BadRequestError(
            "Active seconds must be between 1 and 60"
        );
    }

    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
    });

    let activity = await UserActivity.findOne({
        where: {
            userId,
            activityDate: today
        }
    });

    if (!activity) {
        activity = await UserActivity.create({
            userId,
            activityDate: today,
            activeSeconds
        });
    } else {
        activity.activeSeconds += activeSeconds;
        await activity.save();
    }

    res.status(200).json({
        success: true,
        message: "Activity saved successfully",
        activity
    });
};


// GET LAST 7 DAYS ACTIVITY
export const getWeeklyActivity = async (req, res) => {
    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    const activities = await UserActivity.findAll({
        where: {
            userId,
            activityDate: {
                [Op.gte]: startDate.toISOString().slice(0, 10)
            }
        },
        attributes: ["activityDate", "activeSeconds"],
        order: [["activityDate", "ASC"]]
    });

    res.status(200).json({
        success: true,
        activities
    });
};
