import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user name' })
  name: string;

  @Field(() => String, { description: 'user email' })
  email: string;
}
