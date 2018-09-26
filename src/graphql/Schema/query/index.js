'use strict';
import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString
} from 'graphql';

import { 
    foodModel, 
    resturentModel, 
    loginModel 
} from '../../../mongoose/model';

import { 
    foodItemOutputType, 
    resturentOutputType, 
    loginDetailsOutputType 
}  from '../model';

const Query = new GraphQLObjectType({
    name: 'RootQueryType',
        fields: () => ({

            loginDetails: {
                type: new GraphQLList(loginDetailsOutputType),
                resolve: () => {
                    var logindetails = new Promise((resolve, reject) => {
                        loginModel.find({},(err, res) => {
                            err ? reject(err) : resolve(res)
                        })
                    })
                    return logindetails
                }
            },

            userloginDetails: {
                type: new GraphQLList(loginDetailsOutputType),
                args: {
                    userEmail: {
                        name: 'userEmail',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (_,{ userEmail }) => {
                    var logindetails = new Promise((resolve, reject) => {
                        loginModel.find({ userEmail:userEmail },(err, res) => {
                            err ? reject(err) : resolve(res)
                        })
                    })
                    return logindetails
                }
            },

            foodItem: {
                type: new GraphQLList(foodItemOutputType),
                args: {
                    itemId: {
                        name: 'itemId',
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve: (_, {itemId}) => {
                    var foundItem = new Promise((resolve, reject) => {
                        foodModel.find({_id:itemId},(err, res) => {
                            err ? reject(err) : resolve(res)
                        })
                    })
                    return foundItem
                }
            },

            foodItems: {
                type: new GraphQLList(foodItemOutputType),
                resolve: () => {
                    var foundItems = new Promise((resolve, reject) => {
                        foodModel.find({},(err, res) => {
                            err ? reject(err) : resolve(res)
                        })
                    })
                    return foundItems
                }
            },

            resturentCollection: {
                type: new GraphQLList(resturentOutputType),
                resolve: () => {
                    var foundResturents = new Promise((resolve, reject) => {
                        resturentModel.find({},(err, res) => {
                            err ? reject(err) : resolve(res)
                        })
                    })
                    return foundResturents
                }
            }
            
        })
});

module.exports = Query;