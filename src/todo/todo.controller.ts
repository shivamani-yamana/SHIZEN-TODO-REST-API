import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { userEmail } from '../common/decorators/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({description:"To Create a new Task wrt the user email",summary:"Create a Task"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createTodoDto: CreateTodoDto,@userEmail() userEmail:string) {
    return this.todoService.create(createTodoDto,userEmail);
  }
  
  @ApiOperation({description:"To Get all tasks wrt the user email",summary:"Get all tasks"})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@userEmail() userEmail:string) {
    return this.todoService.findAll(userEmail);
  }
  
  @ApiOperation({description:"To Get a specific task wrt the user email",summary:"Get a specific task"})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }
  
  
  @ApiOperation({description:"To Update a task wrt the user email",summary:"Update a task"})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
  
  @ApiOperation({description:"To Delete a task wrt the user email",summary:"Delete a task"})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
