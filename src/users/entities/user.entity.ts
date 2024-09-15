import { ObjectType, Field, Int, ComplexityEstimatorArgs } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'user id' })
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  // @Field(() => String)
  // password: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => [Post], { nullable: 'itemsAndList' })
  posts?: (Post | null)[];
}
