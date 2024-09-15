import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => String)
  createdAt: String;

  @Field(() => String)
  updatedAt: String;

  @Field(() => Int)
  userId: number;
}
