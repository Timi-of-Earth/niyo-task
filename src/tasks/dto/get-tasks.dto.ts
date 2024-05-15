import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task-model.enum";

export class getTasksDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}