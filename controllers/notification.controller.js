import NotificationService from "../services/notificationService.js";

class NotificationController {
    constructor() {
        this.notificationService = NotificationService;
    }

    async create(req, res) {
        try {
            const notification = await this.notificationService.create(req.body);
            res.status(201).json(notification);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const notifications = await this.notificationService.findAll();
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const notification = await this.notificationService.findById(req.params.id);
            if (!notification) {
                return res.status(404).json({ error: "Notification not found" });
            }
            res.json(notification);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findBySender(req, res) {
        try {
            const notifications = await this.notificationService.findBySender(req.params.senderId);
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findByReceiver(req, res) {
        try {
            const notifications = await this.notificationService.findByReceiver(req.params.receiverId);
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findByType(req, res) {
        try {
            const notifications = await this.notificationService.findByType(req.params.type);
            res.json(notifications);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const notification = await this.notificationService.update(req.params.id, req.body);
            res.json(notification);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await this.notificationService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new NotificationController();
