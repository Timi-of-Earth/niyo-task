import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-model.enum';
import { createTaskDto } from './dto/create-task.dto';
import { getTasksDto } from './dto/get-tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

    constructor(private tasksRepository: TasksRepository) {}

    getTasks(filterDto: getTasksDto, user: User): Promise<Task[]> {
        const {search, status} = filterDto;
        const query = this.tasksRepository.createQueryBuilder('task');

        query.where({user});
        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                {search: `%${search}%`}
            )
        }
        return query.getMany()
    }


    async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {

        const task = await this.tasksRepository.createTask(createTaskDto, user);

        await this.tasksRepository.save(task);
        return task;
    }


    async getSingleTask(id: string, user: User): Promise<Task> {
        const found = await this.tasksRepository.findOneBy({
            id,
            user
        });
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return found;
    }

    async deleteSingleTask(id: string, user: User): Promise<Task[]> {
        const result = await this.tasksRepository.delete({
            id,
            user
        });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} could not be found`)
        }
        return this.tasksRepository.find();
    }
    

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        let task = await this.getSingleTask(id, user);
        task.status = status;

        return await this.tasksRepository.save(task);
    }
}
