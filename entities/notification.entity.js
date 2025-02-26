import { EntitySchema } from "typeorm";

const Notification = new EntitySchema({
  name: "Notification",
  tableName: "notifications",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    senderId: {
      type: "int",
      nullable: false,
    },
    receiverId: {
      type: "int",
      nullable: false,
    },
    notificationType: {
      type: "varchar", //represents the type of notification for which dashboard it will be displayed
      nullable: true 
    },
    type: {
      type: "enum",
      enum: ["exam", "certification", "candidate", "new-student", "question", "payment", "announcement", "message", "new-request"],
      nullable: false,
    },
    message: {
      type: "text",
      nullable: false,
    },
    read: {
      type: "boolean",
      default: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    sender: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "senderId" },
      onDelete: "CASCADE",
    },
    receiver: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "receiverId" },
      onDelete: "CASCADE",
    },
  },
});

export default Notification;
