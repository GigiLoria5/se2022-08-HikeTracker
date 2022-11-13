/* IMPORTS */
const hikeDao = require('../dao/HikeDAO');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { step } = require('mocha-steps');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
let agent = chai.request.agent(app);
const expect = chai.expect;

describe('Add hike',()=>{

    let last_hike_id;

    step('T1: POST/api/hikes [GOOD]', async function() {
        await agent.post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
            .field("province", "Torino")
            .field("country", "Italy")
            .field("description", "It runs between ...")
            .field("ascent", 320)
            .field("track_length", 6.2)
            .field("expected_time", 3.3)
            .field("difficulty", 2)
            .field("start_point_type", "parking_lot")
            .field("start_point_id", 3)
            .field("end_point_type", "location")
            .field("end_point_id", 18)
            .field("reference_points", JSON.stringify({
              "points": [
                {
                  "type":"hut", 
                  "id":1
                }, 
                {
                  "type":"hut", 
                  "id":2
                }, 
                {
                  "type":"location", 
                  "id":12
                }
              ]
            }))
            .attach('gpx','test/TestFileGood.gpx')
            .then(function(res) {
                res.should.have.status(201);
            });
    });
    
    step('T1.5: Delete the previous hike', async function() {
        const hikes = await hikeDao.getAllHikes();
        console.log(hikes);
        for(h of hikes){
          last_hike_id = h.id;
        }
        hikeDao.deleteHike(last_hike_id).then(_a => {
            hikeDao.deleteReferencePoints(last_hike_id);
        });
        const hikes2 = await hikeDao.getAllHikes();
        console.log(hikes2);
    });

    step('T2: POST/api/hikes [NO FILE]', async function() {
        await agent.post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
            .field("province", "Torino")
            .field("country", "Italy")
            .field("description", "It runs between ...")
            .field("ascent", 320)
            .field("track_length", 6.2)
            .field("expected_time", 3.3)
            .field("difficulty", 2)
            .field("start_point_type", "parking_lot")
            .field("start_point_id", 3)
            .field("end_point_type", "location")
            .field("end_point_id", 18)
            .field("reference_points", JSON.stringify({
              "points": [
                {
                  "type":"hut", 
                  "id":1
                }, 
                {
                  "type":"hut", 
                  "id":2
                }, 
                {
                  "type":"location", 
                  "id":12
                }
              ]
            }))
            .then(function(res) {
                res.should.have.status(500);
            });
    });

    step('T3: POST/api/hikes [HIKE NOT VALID]', async function() {
      await agent.post('/api/hikes')
          .set('content-type', 'multipart/form-data')
          // .field("title", undefined)
          .field("peak_altitude", 1357)
          .field("city", "Carignano")
          .field("province", "Torino")
          .field("country", "Italy")
          .field("description", "It runs between ...")
          .field("ascent", 320)
          .field("track_length", 6.2)
          .field("expected_time", 3.3)
          .field("difficulty", 2)
          .field("start_point_type", "parking_lot")
          .field("start_point_id", 3)
          .field("end_point_type", "location")
          .field("end_point_id", 18)
          .field("reference_points", JSON.stringify({
            "points": [
              {
                "type":"hut", 
                "id":1
              }, 
              {
                "type":"hut", 
                "id":2
              }, 
              {
                "type":"location", 
                "id":12
              }
            ]
          }))
          .attach('gpx','test/TestFileGood.gpx')
          .then(function(res) {
              res.should.have.status(500);
          });
  });

    step('T4: POST/api/hikes [START POINT TYPE NOT VALID]', async function() {
        await agent.post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
            .field("province", "Torino")
            .field("country", "Italy")
            .field("description", "It runs between ...")
            .field("ascent", 320)
            .field("track_length", 6.2)
            .field("expected_time", 3.3)
            .field("difficulty", 2)
            .field("start_point_type", "ciao")
            .field("start_point_id", 3)
            .field("end_point_type", "location")
            .field("end_point_id", 18)
            .field("reference_points", JSON.stringify({
              "points": [
                {
                  "type":"hut", 
                  "id":1
                }, 
                {
                  "type":"hut", 
                  "id":2
                }, 
                {
                  "type":"location", 
                  "id":12
                }
              ]
            }))
            .attach('gpx','test/TestFileGood.gpx')
            .then(function(res) {
                res.should.have.status(500);
            });
    });

    step('T5: POST/api/hikes [END POINT TYPE NOT VALID]', async function() {
      await agent.post('/api/hikes')
          .set('content-type', 'multipart/form-data')
          .field("title", "Ring for Monte Calvo")
          .field("peak_altitude", 1357)
          .field("city", "Carignano")
          .field("province", "Torino")
          .field("country", "Italy")
          .field("description", "It runs between ...")
          .field("ascent", 320)
          .field("track_length", 6.2)
          .field("expected_time", 3.3)
          .field("difficulty", 2)
          .field("start_point_type", "parking_lot")
          .field("start_point_id", 3)
          .field("end_point_type", "ciao")
          .field("end_point_id", 18)
          .field("reference_points", JSON.stringify({
            "points": [
              {
                "type":"hut", 
                "id":1
              }, 
              {
                "type":"hut", 
                "id":2
              }, 
              {
                "type":"location", 
                "id":12
              }
            ]
          }))
          .attach('gpx','test/TestFileGood.gpx')
          .then(function(res) {
              res.should.have.status(500);
          });
  });

  step('T6: POST/api/hikes [REFERENCE POINT TYPE NOT VALID]', async function() {
      await agent.post('/api/hikes')
          .set('content-type', 'multipart/form-data')
          .field("title", "Ring for Monte Calvo")
          .field("peak_altitude", 1357)
          .field("city", "Carignano")
          .field("province", "Torino")
          .field("country", "Italy")
          .field("description", "It runs between ...")
          .field("ascent", 320)
          .field("track_length", 6.2)
          .field("expected_time", 3.3)
          .field("difficulty", 2)
          .field("start_point_type", "parking_lot")
          .field("start_point_id", 3)
          .field("end_point_type", "location")
          .field("end_point_id", 18)
          .field("reference_points", JSON.stringify({
            "points": [
              {
                "type":"hello", 
                "id":1
              }, 
              {
                "type":"hut", 
                "id":2
              }, 
              {
                "type":"location", 
                "id":12
              }
            ]
          }))
          .attach('gpx','test/TestFileGood.gpx')
          .then(function(res) {
              res.should.have.status(500);
          });
  });

  step('T7: POST/api/hikes [FILE NOT VALID]', async function() {
      await agent.post('/api/hikes')
          .set('content-type', 'multipart/form-data')
          .field("title", "Ring for Monte Calvo")
          .field("peak_altitude", 1357)
          .field("city", "Carignano")
          .field("province", "Torino")
          .field("country", "Italy")
          .field("description", "It runs between ...")
          .field("ascent", 320)
          .field("track_length", 6.2)
          .field("expected_time", 3.3)
          .field("difficulty", 2)
          .field("start_point_type", "parking_lot")
          .field("start_point_id", 3)
          .field("end_point_type", "location")
          .field("end_point_id", 18)
          .field("reference_points", JSON.stringify({
            "points": [
              {
                "type":"hut", 
                "id":1
              }, 
              {
                "type":"hut", 
                "id":2
              }, 
              {
                "type":"location", 
                "id":12
              }
            ]
          }))
          .attach('gpx','test/TestFileWrong.txt')
          .then(function(res) {
              res.should.have.status(500);
          });
  });
});