// test/test.js
"use strict"

const assert = require('assert');
const request = require('supertest');
const app = require('../bundle/bin/www'); // Asegúrate de que exporte la app de Express
const Fakerator = require("fakerator");

let server;
const fakerator = Fakerator("es-ES");
const fakeEmail = fakerator.internet.email();
console.log(fakeEmail);

before((done) => {
    server = app.listen(3000, () => {
        console.log('Servidor de tests corriendo en http://localhost:3000');
        done();
    });
});

after((done) => {
    server.close(done);
});

describe('API Unit Testing', function() {
  describe('GET', function(){
    it('Should serve json on index', function(done){
      request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('Should insert a user', function(done){
      let user = {
        email: fakeEmail,
        password: "123456",
        fullname: "Test User"
      }
      request(app)
        .post('/registerUser')
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
      request(app)
        .post('/loginUser')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
  });
});