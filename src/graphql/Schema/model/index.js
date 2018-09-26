'use strict';
import foodItemInputType        from './inputType/foodItem';
import resturentInputType       from './inputType/resturentCollection';
import loginDetailsInputType    from './inputType/login';
import loginDetailsOutputType   from './outputType/loginDetails';
import foodItemOutputType       from './outputType/foodItem';
import resturentOutputType      from './outputType/resturentCollection';

const graphqlModel = { 

    foodItemInputType, 
    foodItemOutputType, 
    resturentOutputType, 
    resturentInputType,
    loginDetailsInputType,
    loginDetailsOutputType

};

module.exports = graphqlModel;