import AppDataSource from "../config/config.js";
import Notification from "../entities/notification.entity.js";

class NotificationService {
    constructor() {
        this.notificationRepository = AppDataSource.getRepository(Notification);
    }

    async create(notificationData) {
        const { senderId, receiverId, type, message } = notificationData;

        const VALID_TYPES = ["exam", "certification", "candidate"];
        if (!VALID_TYPES.includes(type)) {
            throw new Error("Invalid notification type. Must be 'exam', 'certification', or 'candidate'.");
        }

        // Check for duplicate notifications with the same sender, receiver, type, and message
        const existingNotification = await this.notificationRepository.findOne({
            where: { senderId, receiverId, type, message },
        });

        if (existingNotification) {
            throw new Error("Duplicate notification detected.");
        }

        // Create and save the notification
        const notification = this.notificationRepository.create(notificationData);
        return await this.notificationRepository.save(notification);
    }

    async findAll() {
        return await this.notificationRepository.find();
    }

    async findById(id) {
        return await this.notificationRepository.findOne({ where: { id } });
    }

    async findBySender(senderId) {
        return await this.notificationRepository.find({ where: { senderId } });
    }

    async findByReceiver(receiverId) {
        return await this.notificationRepository.find({ where: { receiverId } });
    }

    async findByType(type) {
        const VALID_TYPES = ["exam", "certification", "candidate"];
        if (!VALID_TYPES.includes(type)) {
            throw new Error("Invalid notification type. Must be 'exam', 'certification', or 'candidate'.");
        }

        return await this.notificationRepository.find({ where: { type } });
    }

    async update(id, notificationData) {
        const existingNotification = await this.findById(id);
        if (!existingNotification) {
            throw new Error("Notification not found");
        }

        await this.notificationRepository.update(id, notificationData);
        return this.findById(id);
    }

    async delete(id) {
        const notification = await this.findById(id);
        if (!notification) {
            throw new Error("Notification not found");
        }

        return await this.notificationRepository.delete(id);
    }
}

export default new NotificationService();