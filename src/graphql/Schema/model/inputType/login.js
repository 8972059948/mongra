'use strict';
import {
    GraphQLString,
    GraphQLInputObjectType
} from 'graphql';

const LoginDetailsInputType = new GraphQLInputObjectType({
    name: 'logindetails',
    description: 'details of login',
    fields: () => ({
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

export default LoginDetailsInputType;