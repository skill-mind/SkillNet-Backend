import { EntitySchema } from 'typeorm';

const Job = new EntitySchema({
  name: 'Job',
  tableName: 'jobs',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    title: {
      type: 'varchar',
      nullable: false
    },
    description: {
      type: 'text',
      nullable: true
    },
    company: {
      type: 'varchar',
      nullable: false
    },
    location: {
      type: 'varchar',
      nullable: true
    },
    salary: {
      type: 'decimal',
      nullable: true
    },
    requiredSkills: {
      type: 'simple-array',
      nullable: true
    },
    applicationLink: {
      type: 'varchar',
      nullable: true
    },
    banner: {
      type: 'varchar',
      nullable: true
    },
    bannerPublicId: {
      type: 'varchar',
      nullable: true
    },
    createdAt: {
      type: 'timestamp',
      createDate: true
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true
    }
  },
  uniques: [
    { columns: ['title', 'company'] }
  ]
});

export default Job