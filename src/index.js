import { gql } from 'apollo-server-express'
import { ProductTypes, ProductQuery, ProductMutation, ProductResolvers } from './modules/products';
import { userTypes, userQuery, userMutation, userResolvers } from './modules/user';
import { reviewTypes, reviewQuery, reviewMutation, reviewResolvers } from './modules/reviews';

export const typeDefs = gql`
        scalar Date
        scalar JSON
        scalar Number
        directive @isAuth on FIELD_DEFINITION

        type Query
        type Mutation
        ${ProductTypes}
        ${userTypes}
        ${reviewTypes}
`
export const resolvers = {
    Query: {
        ...ProductQuery,
        ...userQuery,
        ...reviewQuery,
    },
    Mutation: {
        ...ProductMutation,
        ...userMutation,
        ...reviewMutation,
    },
}
