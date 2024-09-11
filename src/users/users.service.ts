import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}
  
  create(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: createUserInput.name,
        email: createUserInput.email,
      }
    });
  }

  users(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        posts: true
      }
    });
  }

  user(id: number): Promise<User | null>  {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        posts: true
      }
    })
  }

  update(id: number, updateUserInput: UpdateUserInput): Promise<User>  {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserInput.name,
        email: updateUserInput.email
      }
    });
  }

  remove(id: number): Promise<User>  {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
