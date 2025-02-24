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
    type: {
      type: "enum",
      enum: ["exam", "certification", "candidate"],
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
