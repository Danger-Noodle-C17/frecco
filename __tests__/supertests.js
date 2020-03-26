const request = require('supertest');
const path = require('path');
const fs = require('fs');
const db = require('../server/models/models.js');

const server = 'http://localhost:3000';
// do i need a empty array in the test file to test database
// const testJsonFile = path.resolve(__dirname, '../server/db/markets.test.json');

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
// describe('Route integration', () => {
//   beforeEach((done) => {
//     fs.writeFile(testJsonFile, JSON.stringify([]), () => {
//       db.reset();
//       done();
//     });
//   })
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

//   describe('/markets', () => {
//     describe('GET', () => {
//       it('responds with 200 status and application/json content type', () => {
//         return request(server)
//           .get('/markets')
//           .expect('Content-Type', /application\/json/)
//           .expect(200);
//       });

//       // For this test, you'll need to inspect the body of the response and
//       // ensure it contains the markets list. Check the markets.dev.json file
//       // in the dev database to get an idea of what shape you're expecting.
//       it('markets from "DB" json are in body of response', () => {
//         return request(server)
//           .get('/markets')
//           .expect([]);
//       });
//     });

//     describe('PUT', () => {
//       it('responds with 200 status and application/json content type', () => {
//         const obj = [
//           {
//             location: 'NY',
//             cards: 10,
//           },
//         ];
//         return request(server)
//           .put('/markets')
//           .send(obj)
//           .expect(200)
//           .expect('Content-Type', /application\/json/);
//         // .expect(obj);
//       });

//       it('responds with the updated market list', () => {
//         const obj = [
//           {
//             location: 'NJ',
//             cards: 11,
//           },
//         ];
//         return request(server)
//           .put('/markets')
//           .send(obj)
//           .expect(obj);
//       });

//       it('responds to invalid request with 400 status and error message in body', () => {
//         const obj = [{
//           name: 'whatever',
//         }];
//         return request(server)
//           .put('/markets')
//           .send(obj)
//           .expect(400)
//           .expect({error: "Missing fields on some markets"})
          

//       });
//     });
//   });
// });
