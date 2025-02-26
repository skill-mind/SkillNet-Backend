import AppDataSource from "../config/config.js";
import UserEntity from "../entities/user.entity.js";

class UserController {
  async createUser(req, res) {
    try {
      const { walletAddress, role, name, email, title, bio, skills } = req.body;

  
      if (!walletAddress || !role || !name || !email) {
        return res.status(400).json({ error: "walletAddress, role, name, and email are required" });
      }

      const userRepository = AppDataSource.getRepository(UserEntity);

   const existingUser = await userRepository.findOne({ where: { walletAddress } });
      if (existingUser) {
        return res.status(400).json({ error: "User with this wallet address already exists" });
      }

      let skillsString = skills;
      if (Array.isArray(skills)) {
        skillsString = skills.join(",");
      }

      const newUser = userRepository.create({
        walletAddress,
        role,
        name,
        email,
        title: title || null,
        bio: bio || null,
        skills: skillsString || null,
      });

      await userRepository.save(newUser);

      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
