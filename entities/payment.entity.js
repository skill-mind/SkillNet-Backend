import { EntitySchema } from 'typeorm';

export const Payment = new EntitySchema({
    name: 'Payment',
    tableName: 'payment',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        senderId: {
            type: 'int',
            nullable: true,
        },
        receiverId: {
            type: 'int',
            nullable: true,
        },
        date: {
            type: 'timestamptz',
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        amount: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: false,
        },
        payment_code: {
            type: 'varchar',
            length: 50,
            nullable: false,
            unique: true
        },
        transaction_type: {
            type: "enum",
            enum: [
                "course_creation",
                "course_enrollment",
                "certification_exam"
            ],
            nullable: false,
        },
        created_at: {
            type: 'timestamptz',
            default: () => 'CURRENT_TIMESTAMP'
        },
    },
    relations: {
        sender: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: 'senderId',
                referencedColumnName: 'id'
            },
            onDelete: 'SET NULL'
        },
        receiver: {
            type: 'many-to-one', 
            target: 'User',
            joinColumn: {
                name: 'receiverId',
                referencedColumnName: 'id'
            },
            onDelete: 'SET NULL'
        }
    }
});