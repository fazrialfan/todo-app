import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    const { name } = createTodoDto;

    todo.name = name;

    return await this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find({
      order: {
        createdAt: -1
      }
    });
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id }});

    if (!todo) {
      throw new NotFoundException(`Todo with ID: ${id} not found.`);
    }

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    const { name, completed } = updateTodoDto;

    if (name) {
      todo.name = name;
    }

    if (completed !== null || completed !== undefined) {
      todo.completed = completed;
    }

    return await this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.todoRepository.delete({ id });
  }
}
