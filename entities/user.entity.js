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
    name: {
      type: 'varchar',
      length: 100,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    title: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    bio: {
      type: 'text',
      nullable: true,
    },
    skills: {
      type: 'simple-array',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
  relations: {
    courses: {
      type: 'many-to-many',
      target: 'Course',
      joinTable: {
        name: 'user_courses',
        joinColumn: {
          name: 'userId',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'courseId',
          referencedColumnName: 'id',
        },
      },
    },
    userCourses: {
      type: 'one-to-many',
      target: 'UserCourse',
      inverseSide: 'user',
    },
  },
  indices: [
    { columns: ['walletAddress'] },
    { columns: ['email'] },
    { columns: ['role'] }, // Index role if querying by it frequently
  ],
});

export default UserEntity
