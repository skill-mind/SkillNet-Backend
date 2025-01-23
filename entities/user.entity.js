import { EntitySchema } from 'typeorm';

const UserEntity = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    walletAddress: {
      type: 'varchar',
      unique: true
    },
    role: {
      type: 'varchar',
      length: 20
    },
    fullName: {
      type: 'varchar',
      length: 100
    },
    username: {
      type: 'varchar',
      unique: true,
      length: 30
    },
    email: {
      type: 'varchar',
      unique: true
    },
    title: {
      type: 'varchar',
      length: 100
    },
    experience: {
      type: 'text'
    },
    skills: {
      type: 'simple-array'
    },
    createdAt: {
      type: 'timestamp',
      createDate: true
    }
  },
  indices: [
    { columns: ['walletAddress'] },
    { columns: ['username'] },
    { columns: ['email'] }
  ]
});

export default UserEntity;