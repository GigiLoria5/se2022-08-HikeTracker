# se2022-08-HireTracker

[![Unit Tests](https://github.com/GigiLoria5/se2022-08-HireTracker/workflows/Unit%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HireTracker/actions)
[![Integration Tests](https://github.com/GigiLoria5/se2022-08-HireTracker/workflows/Integration%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HireTracker/actions)

Application developed during the Software Engineering II course (Year 2022-23) by Group 08 at the Politecnico di Torino (Master of Science in Computer Engineering).

## Usage

### Client

- in client/ run `npm install`, then `npm start`

### Server

- in server/ run `npm install`, then run `node index.js` or `nodemon index.js` if nodemon is installed

## Selected Technologies

### Frontend

- React **18.2.0**
- MUI **5.10.9**

### Backend

- NodeJS **16.18**
- Sqlite3 **5.1.2**
- express **4.18.2**
- passport **0.6.0**

### Testing

- Mocha
- Jest

## React Client Application Routes

## API Format

### Hike

- GET /api/countries

  - Description: Return an array containing all the countries
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the countries, or an error message in case of failure

  ```
  [
    ...,
    {
      "country": "Italy"
    },
    ...
  ]
  ```

- GET /api/provinces/:country

  - Description: Return an array containing all the provinces of a specific country
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the provinces, or an error message in case of failure

  ```
  [
    ...,
    {
      "province": "Cuneo"
    },
    ...
  ]
  ```

- GET /api/cities/:province

  - Description: Return an array containing all the cities of a specific province
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the cities, or an error message in case of failure

  ```
  [
    ...,
    {
      "city": "Condove"
    },
    ...
  ]
  ```

- GET /api/hikes/city/:city

  - Description: Return an array containing all the hikes of a specific city
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the hikes, or an error message in case of failure

  ```
  [
    ...,
    {
      "id": 8,
      "title": "Ring for Monte Calvo",
      "peak_altitude": 1357,
      "city": "Carignano",
      "province": "Torino",
      "country": "Italy",
      "description": "It runs between ...",
      "ascent": 320,
      "track_length": 6.2,
      "expected_time": 3.3,
      "difficulty": 2,
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18
    },
    ...
  ]
  ```

- GET /api/hikes/province/:province

  - Description: Return an array containing all the hikes of a specific province
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the hikes, or an error message in case of failure

  ```
  [
    ...,
    {
      "id": 8,
      "title": "Ring for Monte Calvo",
      "peak_altitude": 1357,
      "city": "Carignano",
      "province": "Torino",
      "country": "Italy",
      "description": "It runs between ...",
      "ascent": 320,
      "track_length": 6.2,
      "expected_time": 3.3,
      "difficulty": 2,
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18
    },
    ...
  ]
  ```

- GET /api/hikes/country/:country

  - Description: Return an array containing all the hikes of a specific country
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the hikes, or an error message in case of failure

  ```
  [
    ...,
    {
      "id": 8,
      "title": "Ring for Monte Calvo",
      "peak_altitude": 1357,
      "city": "Carignano",
      "province": "Torino",
      "country": "Italy",
      "description": "It runs between ...",
      "ascent": 320,
      "track_length": 6.2,
      "expected_time": 3.3,
      "difficulty": 2,
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18
    },
    ...
  ]
  ```

- GET /api/hikes/difficulty/:difficulty

  - Description: Return an array containing all the hikes with a specific difficulty
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the hikes, or an error message in case of failure

  ```
  [
    ...,
    {
      "id": 8,
      "title": "Ring for Monte Calvo",
      "peak_altitude": 1357,
      "city": "Carignano",
      "province": "Torino",
      "country": "Italy",
      "description": "It runs between ...",
      "ascent": 320,
      "track_length": 6.2,
      "expected_time": 3.3,
      "difficulty": 2,
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18
    },
    ...
  ]
  ```

- GET /api/hikes/length/:track_length

  - Description: Return an array containing all the hikes between a range of track length (All strings: "0-5","5-15","15-more")
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses:  `400 Bad Request` (parameter error) `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the hikes, or an error message in case of failure

  ```
  [
    ...,
    {
      "id": 8,
      "title": "Ring for Monte Calvo",
      "peak_altitude": 1357,
      "city": "Carignano",
      "province": "Torino",
      "country": "Italy",
      "description": "It runs between ...",
      "ascent": 320,
      "track_length": 6.2,
      "expected_time": 3.3,
      "difficulty": 2,
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18
    },
    ...
  ]
  ```

- GET /api/hikes/ascent/:ascent

  - Description: Return an array containing all the hikes between a range of ascent (All strings: "0-300","300-600","600-1000","1000-more")
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses:  `400 Bad Request` (parameter error) `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the hikes, or an error message in case of failure

  ```
  [
    ...,
    {
      "id": 8,
      "title": "Ring for Monte Calvo",
      "peak_altitude": 1357,
      "city": "Carignano",
      "province": "Torino",
      "country": "Italy",
      "description": "It runs between ...",
      "ascent": 320,
      "track_length": 6.2,
      "expected_time": 3.3,
      "difficulty": 2,
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18
    },
    ...
  ]
  ```

- GET /api/hikes/expected_time/:expected_time

  - Description: Return an array containing all the hikes between a range of expected time (All strings: "0-1","1-3","3-5","5-more")
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses:  `400 Bad Request` (parameter error) `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the hikes, or an error message in case of failure

  ```
  [
    ...,
    {
      "id": 8,
      "title": "Ring for Monte Calvo",
      "peak_altitude": 1357,
      "city": "Carignano",
      "province": "Torino",
      "country": "Italy",
      "description": "It runs between ...",
      "ascent": 320,
      "track_length": 6.2,
      "expected_time": 3.3,
      "difficulty": 2,
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18
    },
    ...
  ]
  ```

### Hut

- GET /api/hut/:id

  - Description: Return an array containing all the informations about a hut with a specified id
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing the hut, or an error message in case of failure

  ```
  [
    {
      "id": "1",
      "name": "Rifugio Melezè",
      "city": "Bellino",
      "province": "Cuneo",
      "country": "Italy",
      "address": "Pian Melezè, 1, 12020",
      "phone_number": 175956410,
      "altitude": 1812,
      "description": "The building was ...",
      "beds_number": 50,
      "opening_period": "Open all year"
    }
  ]
  ```

### Location

- GET /api/location/:id

  - Description: Return an array containing all the informations about a location with a specified id
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing the location, or an error message in case of failure

  ```
  [
    {
      "id": "2",
      "value_type": "name",
      "value": "Prarotto",
      "description": "Chapel"
    }
  ]
  ```

### Parking

- GET /api/parking/:id

  - Description: Return an array containing all the informations about a parking lot with a specified id
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing the parking lot, or an error message in case of failure

  ```
  [
    {
      "id": "3",
      "city": "Carignano",
      "province": "Torino",
      "country": "Italy",
      "address": "SP138, 10041"
    }
  ]
  ```

### Reference points

- GET /api/reference/:id

  - Description: Return an array containing all the informations about all the reference points with a specified hike id
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all the reference points, or an error message in case of failure

  ```
  [
    ...,
    {
      "hike_id": "4",
      "ref_point_type": "location",
      "ref_point_id": 7
    },
    ...
  ]
  ```

## Database Tables

- Table `user` contains: id(PK), name, surname, email, password, salt, email_verified, phone number, role
  - Possible roles are: hiker, emergency_operator, platform_manager, local_guide, hut_worker
  - _email_verified_ is a flag which indicates whether (value 1) or not (value 0) the email has been verified. An user with email_verified=0 can't do anything (like a visitor).
    > The existing role verification is not made into the database, it must be performed within the backend. Remember that name, surname and phone number are mandatory only for local guides and hut workers.
- Table `hut` contains: id(PK), name, city, province, country, address, phone_number, altitude, description, beds_number, opening_period
  - _altitude_ is in meters
- Table `parking_lot` contains: id(PK), city, province, country, address
- Table `location` contains: id(PK), value_type, value, description
  - Possible value types are: name, gps, address
    > Again, there is no database control on the type. Although value_type may not be needed, I think it is useful to specify what type of value is present and should be expected by the person making the queries or handling the data.
- Table `hike` contains: id(PK), title, peak_altitude, city, province, country, description, ascent, track_length, expected_time, difficulty, gps_track, start_point_type, start_point_id, end_point_type, end_point_id
  - _peak_altitude_ is in meters
  - _ascent_ is in meters
  - _track_length_ is in km
  - _expected_time_ is in hours
  - _difficulty_ is mapped as following: 1=tourist, 2=hiker, 3=professional hiker
  - _gps_track_ is the gpx filename
  - _start_point_type_ and _end_point_type_ possible values are: hut, location, parking_lot
  - _start_point_id_ and _end_point_id_ do not have any FK contraints. Checks must be done within the backend
  - _author_id_ is the local guide identifier who have added the hike description
    > In order to avoid having to create associated tables or anything else, I preferred to specify the type here as well, so that I would still have the possibility of making queries in the right place.
- Table `reference_point` contains: hike_id, ref_point_type, ref_point_id (the PK is the combination of each of them)
  - _ref_point_type_ can be: parking_lot, location, hut
    > As in the previous cases, no check on external key constraints is performed. Here again, I preferred to insert a type column to help queries and avoid having to do a thousand joins with other associative tables.

## Users Credentials

| email                     | password | role        |
| ------------------------- | -------- | ----------- |
| c.basile@hiker.it         | password | hiker       |
| g.desantis@local_guide.it | password | local guide |
| m.piccolo@guide_turin.it  | password | local guide |
| i.folletti987@google.com  | password | local guide |
