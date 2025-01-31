import { EntitySchema } from "typeorm"

export const Course = new EntitySchema({
  name: "Course",
  tableName: "courses",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    title: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    instructorId: {
      type: "int",
      nullable: false,
    },
    level: {
      type: "varchar",
      nullable: true,
    },
    duration: {
      type: "int",
      nullable: true,
    },
    videoUrl: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    users: {
      type: "many-to-many",
      target: "UserEntity",
      joinTable: {
        name: "user_courses",
        joinColumn: {
          name: "courseId",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "userId",
          referencedColumnName: "id",
        },
      },
    },
    userCourses: {
      type: "one-to-many",
      target: "UserCourse",
      inverseSide: "course",
    },
  },
})

