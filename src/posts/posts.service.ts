import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateUniqueSlug } from './posts.util';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: {
        content: createPostInput.content,
        title: createPostInput.title,
        slug: generateUniqueSlug(createPostInput.title),
        user: {
          connect: {
            id: createPostInput.userId
          }
        }
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        user: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id
      },
      include: {
        user: true
      }
    });
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return this.prisma.post.update({
      data: {
        content: updatePostInput.content,
        title: updatePostInput.title,
        slug: generateUniqueSlug(updatePostInput.title)
      },
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id
      }
    });
  }
}
