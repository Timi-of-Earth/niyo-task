import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-model.enum";

export class updateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}