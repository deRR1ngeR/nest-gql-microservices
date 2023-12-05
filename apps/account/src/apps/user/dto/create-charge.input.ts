import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType('CreateChargeInput')
@InputType('CreateChargeInput')
export class CreateChargeInput {
    @IsString()
    @IsNotEmpty()
    @Field()
    paymentMethodId: string;

    @IsNumber()
    @Field()
    amount: number;
}

export default CreateChargeInput;