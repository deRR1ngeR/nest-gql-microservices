import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'libs/auth/decorator/current-user.decorator';
import { GqlAuthGuard } from 'libs/auth/guards/gql-auth.guard';
import { RolesGuard } from 'libs/auth/guards/role.guard';
import { CreditCardInput } from './dto/credit-card.input';
import StripeService from './stripe/stripe.service';
import { User } from 'apps/account/src/apps/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import CreateChargeInput from './dto/create-charge.input';

@Resolver(() => User)
export class StripeResolver {
    constructor(
        private readonly stripeService: StripeService,
        private readonly userService: UserService
    ) { }

    @Mutation(() => User, { name: 'addCredit' })
    @UseGuards(GqlAuthGuard, RolesGuard)
    async addCreditCard(@Args('CreditCardInput') creditCard: CreditCardInput, @CurrentUser() user: User) {
        const customerId = (await this.userService.findUserById(user.id)).customerId;
        return this.stripeService.attachCreditCard(creditCard.paymentMethodId, customerId);
    }

    @Mutation(() => User, { name: 'charge' })
    @UseGuards(GqlAuthGuard)
    async createCharge(@Args('CreateChargeInput') charge: CreateChargeInput, @CurrentUser() user: User) {

        const customerId = (await this.userService.findUserById(user.id)).customerId;

        const res = await this.stripeService.charge(charge.amount, charge.paymentMethodId, customerId);
        console.log(res)
    }
}
