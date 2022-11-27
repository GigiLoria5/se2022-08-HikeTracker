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
            .field("start_point", "{\"latitude\":44.574263943359256,\"longitude\":6.982647031545639,\"description\":\"G2\",\"type\":\"gps\",\"value\":\"gps\"}")
            .field("end_point", "{\"latitude\":44.57425086759031,\"longitude\":6.982689192518592,\"description\":\"G1\",\"type\":\"gps\",\"value\":\"gps\"}")
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
                res.should.have.status(201);
            });
    });

    step('T1.5: Delete the previous hike', async function () {
        const hikes = await hikeDao.getAllHikes();
        last_hike_id = hikes[0].id;
        last_gps_track = hikes[0].gps_track;

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

    step('T8: POST/api/hikes [MISSING COUNTRY]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
            .field("province", "Torino")
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

    step('T9: POST/api/hikes [MISSING PROVINCE]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
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

    step('T10: POST/api/hikes [MISSING CITY]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
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

    step('T11: POST/api/hikes [MISSING PEAK ALTITUDE]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
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

    step('T12: POST/api/hikes [MISSING TITLE]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
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

    step('T13: POST/api/hikes [MISSING DESCRIPTION]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
            .field("province", "Torino")
            .field("country", "Italy")
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

    step('T14: POST/api/hikes [MISSING ASCENT]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
            .field("province", "Torino")
            .field("country", "Italy")
            .field("description", "It runs between ...")
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

    step('T15: POST/api/hikes [MISSING LENGTH]', async function () {
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

    step('T16: POST/api/hikes [MISSING EXPECTED TIME]', async function () {
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

    step('T17: POST/api/hikes [MISSING DIFFICULTY]', async function () {
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

    step('T18: POST/api/hikes [WRONG PEAK ALTITUDE TYPE]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", "1357")
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

    step('T19: POST/api/hikes [WRONG ASCENT TYPE]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Ring for Monte Calvo")
            .field("peak_altitude", 1357)
            .field("city", "Carignano")
            .field("province", "Torino")
            .field("country", "Italy")
            .field("description", "It runs between ...")
            .field("ascent", "320")
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

    step('T20: POST/api/hikes [WRONG TRACK LENGTH TYPE]', async function () {
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
            .field("track_length", "6.2")
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

    step('T21: POST/api/hikes [WRONG EXPECTED TIME TYPE]', async function () {
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
            .field("expected_time", "3.3")
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

    step('T22: POST/api/hikes [WRONG DIFFICULTY TYPE]', async function () {
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
            .field("difficulty", "2")
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