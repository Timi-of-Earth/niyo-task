import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-model.enum';
import { title } from 'process';
import { createTaskDto } from './dto/create-task.dto';
import { getTasksDto } from './dto/get-tasks.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { userInfo } from 'os';


@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: getTasksDto, @GetUser() user: User): Promise<Task[]> {
        return this.taskService.getTasks(filterDto, user)
    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto, @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user)
    }

    @Get(':id')
    getSingleTask(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.taskService.getSingleTask(id, user);
    }

    @Delete('/:id')
    deleteSingleTask(@Param('id') id: string, @GetUser() user: User): Promise<Task[]> {
        return this.taskService.deleteSingleTask(id, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: updateTaskStatusDto, @GetUser() user: User): Promise<Task> {
        const {status} = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status, user);
    }
}
