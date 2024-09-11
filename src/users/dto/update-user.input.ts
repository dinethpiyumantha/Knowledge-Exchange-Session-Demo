import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int, { description: 'user id' })
  id: number;

  @Field(() => String, { description: 'user name' })
  name: string;

  @Field(() => String, { description: 'user email' })
  email: string;
}
