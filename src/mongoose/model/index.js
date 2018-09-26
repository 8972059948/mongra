'use strict';
import mongoose from 'mongoose';
import resturentSchema from './resturent/resturentSchema';
import resturentSchemMutation from './resturent/resturentSchemaMutation';
import foodSchema from './food/foodSchema';
import foodSchemaMutation from './food/foodSchemamutation';
import loginSchema from './login/loginSchema';
import loginSchemaMutation from './login/loginSchemamutation';

const resturentModel          = mongoose.model('resturentModel', resturentSchema);
const resturentModelMutation  = mongoose.model('resturentModelMutation',resturentSchemMutation);
const foodModel               = mongoose.model('foodmodel', foodSchema);
const foodModelMutation       = mongoose.model('foodmodelmutation', foodSchemaMutation);
const loginModel              = mongoose.model('loginModel', loginSchema);
const loginModelMutation      = mongoose.model('loginModelMutation', loginSchemaMutation);

const Model = { 
  resturentModel, 
  resturentModelMutation, 
  foodModel,
  foodModelMutation,
  loginModel,
  loginModelMutation
};

// Create a change stream. The 'change' event gets emitted when there's a
  // change in the database
//   resturentModel.watch().
//     on('change', data => console.log(new Date(), data));

// Create a change stream. The 'change' event gets emitted when there's a
  // change in the database
//   resturentModelMutation.watch().
//     on('change', data => console.log(new Date(), data));

module.exports = Model;