import { User } from "../auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-model.enum";
import { Exclude } from "class-transformer";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne((_type) => User, (user) => user.tasks, {eager: false})
    @Exclude({toPlainOnly: true})
    user: User
}