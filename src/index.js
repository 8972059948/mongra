'use strict';
import express from 'express';
import cors    from 'cors';
import dotenv  from 'dotenv';
import mongoose from 'mongoose';
import faker from 'faker';

import {
	foodModel,
	foodModelMutation,
	resturentModel, 
	resturentModelMutation,
	loginModel,
	loginModelMutation
} from './mongoose/model';

dotenv.config();
var app = express();

// var foodModel = mongoose.model('foodModel', foodSchema);


// var Schema = mongoose.Schema;
// var ObjectIdSchema = Schema.ObjectId;
app.get('/api/v1/find/login/:userEmail/:userPassword', cors(), (req, res) => {

	let { userEmail, userPassword } = req.params;
	
	loginModelMutation.find({ userEmail:userEmail, userPassword: userPassword },(err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/save/login', cors(), (req, res) => {
	
	var savelogin = new loginModel({
		'userEmail': faker.internet.email(),
		'userPassword': faker.internet.password(),
		'accessToken':faker.random.uuid(),
		'loginTime': new Date // Time of save the data in unix timestamp format
	})

	loginModelMutation.create(savelogin,(err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})


app.get('/api/v1/save/foods', cors(), (req, res) => {
	
	var savedata = new foodModel({
		'foodName': 'Apple',
		'foodType': 'Gala',
		'time': Math.floor(Date.now() / 1000) // Time of save the data in unix timestamp format
	})

	foodModelMutation.create(savedata,(err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/save/foods/:foodName/:foodType', cors(), (req, res) => {
	
	var foodName = req.params.foodName;
	var foodType = req.params.foodType;

	var savedata = new foodModel({
		'foodName': foodName,
		'foodType': foodType,
		'time': Math.floor(Date.now() / 1000) // Time of save the data in unix timestamp format
	})

	savedata.save((err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/find/foods', cors(), (req, res) => {

	foodModel.find({},(err, result) => {
		if (err) {
			console.log('Error in finding foods ',err);
			res.send(JSON.stringify({
				error : 'Error'
			}))
		}
		if (result) {
			res.json(result)
		}
	})

})


app.get('/api/v1/removeall/foods', cors(), (req, res) => {

	foodModel.remove({},(err, result) => {
		if (err) {
			console.log('Error in finding foods ',err);
			res.send(JSON.stringify({
				error : 'Error'
			}))
		}

		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/save/resturent', cors(), (req, res) =>{

	var savedata = new resturentModelMutation({
		'resId': faker.random.uuid(),
		'resturentName': faker.name.findName(),
		'location': {
			'city': faker.address.city(),
			'state': faker.address.state(),
			'country': faker.address.country(),
			'pin': faker.address.zipCode()
		},
		'resDescription': faker.random.words(),
		'openingHours': faker.date.recent(),
		'otherDeatils': faker.random.word(),
		'menuType': [ faker.random.word(), faker.random.word(), faker.random.word() ],
	})

	savedata.save((err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/edit/resturent/:_id', cors(), (req, res) =>{
    var id = req.params._id;
	var savedata = new resturentModelMutation({
		'resId': faker.random.uuid(),
		'resturentName': faker.name.findName(),
		'location': {
			'city': faker.address.city(),
			'state': faker.address.state(),
			'country': faker.address.country(),
			'pin': faker.address.zipCode()
		},
		'resDescription': faker.random.words(),
		'openingHours': faker.date.recent(),
		'otherDeatils': faker.random.word(),
		'menuType': [ faker.random.word(), faker.random.word(), faker.random.word() ],
	})

	resturentModelMutation.findById(id,  (err,rest) => {
			rest.set({ resId: faker.random.uuid() });
			rest.set({ resDescription: faker.random.words() });
			rest.set({ openingHours: faker.date.recent() });
			rest.set({ otherDeatils: faker.random.word() });
			rest.save(function (err, updatedRest) {
				if (err) return handleError(err);
				res.send(updatedRest);
			});
			// {$set: savedata}, {new: true},
		    // console.log("Ud Res: ",rest); 
			// rest.set(savedata);
			// console.log(" Updated ",rest);
			// rest.save((err1,updatedRest) => {
			// 	console.log(" Updated ",updatedRest);
			// res.send(rest);
			// }) 
	})
    // resturentModelMutation.update({_id: id}, savedata, (err) => {
    //     if(!err) {
	// 		console.log("Successfully Updated.... ");
	// 	}
	// })
})

app.get('/api/v1/save/resturentcollection', cors(), (req, res) =>{

	var savedata = new resturentModelMutation({
		'resturentName': 'BBQ',
		'menuType': [ 'Checken Roast', 'Tanduri Motton' ],
	})

	savedata.save((err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/save/resturentcollection/:resturentName/:menu1/:menu2', cors(), (req, res) =>{

	var resturentName     = req.params.resturentName;
	var menu1             = req.params.menu1;
	var menu2             = req.params.menu2;

	var savedata = new resturentModel({
		'resturentName': resturentName,
		'menuType': [ menu1, menu2 ],
	})

	resturentModelMutation.create(savedata, (err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/find/resturentcollection', cors(), (req, res) => {

	resturentModel.find({},(err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/remove/resturents', cors(), (req, res) => {

	resturentModel.deleteMany({},(err, result) => {
		if (err) { console.log('Error in save ',err); }
		if (result) {
			res.json(result)
		}
	})

})

app.get('/api/v1/remove/resturent/:_id', cors(), (req, res) => {
    const id = req.params._id;
	resturentModelMutation.findByIdAndRemove(id, (err,result) => {
		if(err) { console.log('Error in save ',err); }
		if(result) {
			res.json(result);
		}
	})

})

module.exports = app;