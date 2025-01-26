import { DataSource } from 'typeorm';
import  User  from '../entities/user.entity.js';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;