'use strict';
import mongoose from 'mongoose';
import mlab from '../../connection';
import faker from 'faker';

mlab.then(
    () => console.log('mlab connection loginSchemaMutation'),
    (err) => console.log(err)
);


const Schema = mongoose.Schema;

const loginSchemaMutation = new Schema({
    userEmail:      { type: String, default: 'user@gmail.com' },
    userPassword:   { type: String, default: 'user@1234' },
    accessToken:    { type: String, default: faker.internet.password() },
    loginTime:      { type: String, default: new Date }
}, {
	collection: 'login'
});

export default loginSchemaMutation;