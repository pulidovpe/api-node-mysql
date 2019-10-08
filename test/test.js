"use strict"

const assert = require('assert');
const request = require('supertest');
const app = require('../bundle/bin/www');
const Fakerator = require("fakerator");

const server = request("http://localhost:8000");

const fakerator = Fakerator("es-ES");
const fakeEmail = fakerator.internet.email();
console.log(fakeEmail);

describe('API Unit Testing', function() {
  describe('GET', function(){
    it('Should serve json on index', function(done){
      server.get('/')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('Should insert a user', function(done){
      let user = {
        email: fakeEmail,
        password: "123456",
        fullname: "Test User"
      }
      server.post('/registerUser')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done)
    });

    it('Should login with the new user', function(done){
      let user = {
        email: fakeEmail,
        password: "123456"
      }
      server.post('/loginUser')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
  });
});