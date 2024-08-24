import { getDefaultAutoSelectFamily } from "net";
import { createOne, getAll } from "../../repositories/mainFactory";
import Notification from "./notificationModel";
import catchAsync from "../../utils/catchAsync";
import IRequest from "../../express/expressInterfaces";
import { NextFunction, Response } from "express";

const getAllNotifications = getAll(Notification);
const createNotification = createOne(Notification);

const getNewMessages = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const newMessages = await Notification.find({userId: req.user?.id, viewed: false});
    res.status(200).json({
        status: 'success',
        result: newMessages.length,
        data: newMessages
    });
});

export default {
    getAllNotifications,
    createNotification,
    getNewMessages
}