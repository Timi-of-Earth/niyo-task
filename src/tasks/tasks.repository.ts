import { Injectable } from "@nestjs/common";
import { User } from "../auth/user.entity";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-model.enum";
import { Task } from "./task.entity";

@Injectable()
export class TasksRepository extends Repository<Task> {

    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager())
    }

    async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });

        await this.save(task);
        return task;
    }

}