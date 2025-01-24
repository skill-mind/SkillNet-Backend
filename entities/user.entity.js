import { EntitySchema } from 'typeorm';

const UserEntity = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    walletAddress: {
      type: 'varchar',
      unique: true,
    },
    role: {
      type: 'varchar',
      length: 20,
    },
    // Generalizes to job seeker/employer/institution name
    name: {
      type: 'varchar',
      length: 100,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    // Tutor-specific (nullable)
    title: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    // Used as bio (Job Seeker, Tutor, Institution)/description (Company)
    bio: {
      type: 'text',
      nullable: true,
    },
    // Tutor-specific (nullable)
    skills: {
      type: 'simple-array',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
  indices: [
    { columns: ['walletAddress'] },
    { columns: ['email'] },
    { columns: ['role'] }, // Index role if querying by it frequently
  ],
});

export default UserEntity;