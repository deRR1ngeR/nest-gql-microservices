import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType('CreditCardInput')
@InputType('CreditCardInput')
export class CreditCardInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  paymentMethodId: string;
}

export default CreditCardInput;
