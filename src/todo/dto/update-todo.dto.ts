import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

    @ApiProperty()
    @IsOptional()
    status:TodoStatus
}
enum TodoStatus{
    ACTIVE='ACTIVE',
    DONE='DONE'
}