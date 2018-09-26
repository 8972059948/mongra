'use strict';
import {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType
} from 'graphql';

const LoginDetailsOutputType = new GraphQLObjectType({
    name: 'logindetailsoutput',
    description: 'details for login output',
    fields: () => ({
      _id: {
        type: GraphQLID,
        description: 'Resturent Object Id'
      },
      userEmail: {
        type: GraphQLString,
        description: 'User Email. ',
      },
      userPassword: {
        type: GraphQLString,
        description: 'User Password. '
      },
      accessToken: {
        type: GraphQLString,
        description: 'The type of food. '
      },
      loginTime: {
        type: GraphQLString,
        description: 'The type of food. '
      },
    })
});

export default LoginDetailsOutputType;