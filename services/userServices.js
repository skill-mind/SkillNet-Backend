import AppDataSource from "../config/config";
import { AppError } from "../utils/errors";
import User from "../entities/user.entity";

class UserService {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getUserById(id) {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new AppError(`User with this ID ${id} not found`, 404);
        }

        return user;
    }
}

export default new UserService();