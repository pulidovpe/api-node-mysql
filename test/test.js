"use strict"

const assert = require('assert');
const request = require('supertest');
const app = require('../bundle/bin/www');

const server = request("http://localhost:8000");

describe('Index test', function() {
  describe('GET', function(){
    it('should serve json on index', function(done){
      server.get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
describe('Register test', function() {
  describe('POST', function(){
    it('should serve json on index', function(done){
      let user = {
        email: "test@email.com",
        password: "123456",
        fullname: "Test User"
      }
      server.post('/registerUser')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201, done)
    });
  });
});
describe('Login test', function() {
  describe('POST', function(){
    it('should serve json on index', function(done){
      let user = {
        email: "test@email.com",
        password: "123456"
      }
      server.post('/loginUser')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
  });
});