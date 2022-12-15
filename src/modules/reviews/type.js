export const reviewTypes = `
    type Review {
        num: Number
        userId: Number
    }

    extend type Query {
      getAllReview: Review
    }

    input inputReview {
        rating: Number
    }

    extend type Mutation {
      addReview(input: inputReview): Boolean
    }
`;
