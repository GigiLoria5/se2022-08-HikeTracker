/* IMPORTS */
const hikeDao = require('../dao/HikeDAO');
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { step } = require('mocha-steps');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
const request = require('supertest');
let agent = chai.request.agent(app);
const server = "http://localhost:3001";
const expect = chai.expect;

describe('Add hike', () => {

    let authenticatedUser = request.agent(server);
    let last_hike_id;
    let last_gps_track;

    step('T0 login', (done) => {
        authenticatedUser
            .post('/api/sessions')
            .send({
                "username": "g.desantis@localguide.it",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step('T1: POST/api/hikes [GOOD]', async function () {
        await authenticatedUser
            .post('/api/hikes')
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
                        "type": "hut",
                        "id": 1
                    },
                    {
                        "type": "hut",
                        "id": 2
                    },
                    {
                        "type": "location",
                        "id": 12
                    }
                ]
            }))
            .attach('gpx', 'test/TestFileGood.gpx')
            .then(function (res) {
                console.log(res.body);
                res.should.have.status(201);
            });
    });

    step('T1.5: Delete the previous hike', async function () {
        const hikes = await hikeDao.getAllHikes();
        for (h of hikes) {
            last_hike_id = h.id;
            last_gps_track = h.gps_track;
        }

        fs.unlink('gpx_files/' + last_gps_track + '.gpx', function (err, results) {
            if (err) console.log('File Doesnt exists');
            else console.log('deleted!');
        });

        await hikeDao.deleteHike(last_hike_id).then(_a => {
            hikeDao.deleteReferencePoints(last_hike_id);
        });
        const hikes2 = await hikeDao.getAllHikes();
    });

    step('T2: POST/api/hikes [NO FILE]', async function () {
        await authenticatedUser
            .post('/api/hikes')
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
                        "type": "hut",
                        "id": 1
                    },
                    {
                        "type": "hut",
                        "id": 2
                    },
                    {
                        "type": "location",
                        "id": 12
                    }
                ]
            }))
            .then(function (res) {
                res.should.have.status(400);
            });
    });

    step('T3: POST/api/hikes [HIKE NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
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
                        "type": "hut",
                        "id": 1
                    },
                    {
                        "type": "hut",
                        "id": 2
                    },
                    {
                        "type": "location",
                        "id": 12
                    }
                ]
            }))
            .attach('gpx', 'test/TestFileGood.gpx')
            .then(function (res) {
                res.should.have.status(400);
            });
    });

    step('T4: POST/api/hikes [START POINT TYPE NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
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
                        "type": "hut",
                        "id": 1
                    },
                    {
                        "type": "hut",
                        "id": 2
                    },
                    {
                        "type": "location",
                        "id": 12
                    }
                ]
            }))
            .attach('gpx', 'test/TestFileGood.gpx')
            .then(function (res) {
                res.should.have.status(400);
            });
    });

    step('T5: POST/api/hikes [END POINT TYPE NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
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
                        "type": "hut",
                        "id": 1
                    },
                    {
                        "type": "hut",
                        "id": 2
                    },
                    {
                        "type": "location",
                        "id": 12
                    }
                ]
            }))
            .attach('gpx', 'test/TestFileGood.gpx')
            .then(function (res) {
                res.should.have.status(400);
            });
    });

    step('T6: POST/api/hikes [REFERENCE POINT TYPE NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
            .field("province", "Torino")
            .field("country", "Italy")
            .field("description", "Goosebump...")
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
                        "type": "hello",
                        "id": 1
                    },
                    {
                        "type": "hut",
                        "id": 2
                    },
                    {
                        "type": "location",
                        "id": 12
                    }
                ]
            }))
            .attach('gpx', 'test/TestFileGood.gpx')
            .then(function (res) {
                res.should.have.status(400);
            });
    });

    step('T7: POST/api/hikes [FILE NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
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
                        "type": "hut",
                        "id": 1
                    },
                    {
                        "type": "hut",
                        "id": 2
                    },
                    {
                        "type": "location",
                        "id": 12
                    }
                ]
            }))
            .attach('gpx', 'test/TestFileWrong.txt')
            .then(function (res) {
                res.should.have.status(400);
            });
    });
});