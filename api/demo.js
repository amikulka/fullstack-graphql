const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  enum ShoeType {
    JORDAN
    NIKE
    ADIDAS
  }
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }
  type Shoe {
    brand: ShoeType!
    size: Int!
  }
  input ShoesInput {
    brand: ShoeType
    size: Int
  }
  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }
  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return [
        { brand: 'NIKE', size: 12 },
        { brand: 'ADIDAS', size: 10 },
      ].filter((shoe) => shoe.brand === input.brand)
    },
    me() {
      return {
        email: 'yoda@masters.com',
        avatar: 'http://yoda.png',
        friends: [],
      }
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4000).then(() => console.log('on port 4000'))
