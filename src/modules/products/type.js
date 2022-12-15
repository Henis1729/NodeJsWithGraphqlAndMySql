export const ProductTypes = `
    type Product {
        id: ID
        name: String
        price: Float
        desc: String
        reviews: [Review]
    }

    extend type Query {
        product: Product
        products: [Product]
    }

    input ProductCreateDataInput {
        name: String
        price: Float
        desc: String
    }

    input ProductUpdateDataInput {
        id: ID!
        name: String
        price: Float
        desc: String
    }
    
    input ProductUpdateWhereInput {
        id: ID!
        name: String
        price: Float
        desc: String
    }

    extend type Mutation {
      productCreate(data: ProductCreateDataInput!): Product
      productUpdate(data: ProductUpdateDataInput!, where: ProductUpdateWhereInput!): Product 
    }
`;
