import { EntitySchema } from "typeorm"

export const UserCourse = new EntitySchema({
  name: "UserCourse",
  tableName: "user_courses",
  columns: {
    userId: {
      primary: true,
      type: "int",
    },
    courseId: {
      primary: true,
      type: "int",
    },
    progress: {
      type: "int",
      default: 0,
    },
    enrollmentDate: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "userId",
        referencedColumnName: "id",
      },
      onDelete: "CASCADE",
    },
    course: {
      type: "many-to-one",
      target: "Course",
      joinColumn: {
        name: "courseId",
        referencedColumnName: "id",
      },
      onDelete: "CASCADE",
    },
  },
})

