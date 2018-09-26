'use strict';
import mongoose from 'mongoose';
import mlab from '../../connection';

mlab.then(
    () => console.log('mlab connection loginSchema'),
    (err) => console.log(err)
);


var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;

var loginSchema = new Schema({
    _id: ObjectIdSchema,
    userEmail:      { type:  String, default: 'user@gmail.com' },
    userPassword:   String,
    accessToken:    String,
    loginTime:      { type: String, default: new Date }
}, {
	collection: 'login'
});

module.exports = loginSchema;