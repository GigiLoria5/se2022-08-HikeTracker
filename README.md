# se2022-08-HikeTracker

[![Unit Tests](https://github.com/GigiLoria5/se2022-08-HikeTracker/workflows/Unit%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HikeTracker/actions)

[![Integration Tests](https://github.com/GigiLoria5/se2022-08-HikeTracker/workflows/Integration%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HikeTracker/actions)

[![Frontend tests](https://github.com/GigiLoria5/se2022-08-HikeTracker/workflows/Frontend%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HikeTracker/actions)

Manual test reports in client/gui_test

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
- Leaflet **1.9.3**

### Backend

- NodeJS **16.18**
- Sqlite3 **5.1.2**
- express **4.18.2**
- passport **0.6.0**
- nodemailer **6.8.0**

### Testing

- E2E Tests: Jest
- Integration Tests: Mocha
- Unit Tests: Jest

## React Client Application Routes

- Route `/` : a simple welcome page that acts as an entry point for all users
- Route `/hikes` : shows the list of hikes added by local guides, with the possibility of adding filters to show a specific subset. For each hike there is a certain amount of information available, from this page you can then view the complete information on each individual hike.
- Route `/hikes/:id` : shows users all the information related to a hike. There is also a map in the sidebar, which, however, is only visible to a user authenticated as a hiker or local guide.
- Route `/login`: the page contains a form composed of username and password fields and a submit button. This route allows the user to perform login operation. The results of the authentication procedure (user logged in, wrong email and password) are shown inside an alert dialogue message on top of the screen. This route is linked to sign up route, by clicking on the text down the submit button.

- Route `/register`: the page contains a form that allows the user to define a new account, by inserting

  - user account type: hiker, hut worker, local guide, emergency operator. <ins>Platform managers cannot be registered in this way, but requires system administrator the creation of their accounts. <ins>
  - first name: not compulsory if type hiker has been selected
  - last name: not compulsory if type hiker has been selected
  - phone number: not compulsory if type hiker has been selected
  - email address: compulsory, the value inserted is checked using html email validator
  - password: compulsory, minimum lenght is 8 maximum is 64.
    At the bottom of this form there is a submit button and a link to go back to login route.

- Route `/local-guide-page`: the page contains the actions a local guide can do

  - Adding a hike
  - Adding a hut

- Route `/local-guide-add-hikes1`: the page contains a form that allows the local guide to add a GPX file, specifying start and end point types and related information

  - upload gpx file
  - start point type: can be "gps", "address", "name"
    - start point name: if name is selected
    - start point address: if address is selected
  - start point description
  - end point type: can be "gps", "address", "name"
    - end point name: if name is selected
    - end point address: if address is selected
  - start point description

- Route `/local-guide-add-hikes2`: the page contains a form that allows the local guide to add information about the hike, by inserting

  - title
  - length (automatically extracted from gpx file)
  - expected time
    - if possible computed from gpx
    - otherwise to be inserted manually as hours and minutes
  - total ascent (automatically extracted from gpx file)
  - difficulty: can be "Tourist", "Hiker", "Professional Hiker"
  - geographical area
    - country
    - province
    - city
  - reference points: points can be added/edited clicking on the map, for each point:
    - type: can be "gps", "address", "name"
      - name: if name is selected
      - address: if address is selected
    - description
  - description
    At the bottom of this form there is a submit button and a button to get back to the previous page.

- Route `/local-guide-add-hut`: the page contains a form that allows the local guide to add information about a hut

## API Format

### User Login and Logout

- POST `/api/sessions`

  - Headers: ` {"Content-Type": "multipart/form-data"}`
  - Description: Perform login
  - Request body: Object containing username and password

  ```
  {
    "username": "c.basile@hiker.it"
    "password": "password"
  }
  ```

  - Response: `200 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `500 Internal Server Error` (generic error)
  - Response body: An object containing user data

  ```
  {
     "id":1,
     "name":"Cataldo",
     "surname":"Basile",
     "email":"c.basile@hiker.it",
     "email_verified":1,
     "phone_number":"3399957495",
     "role":"hiker",
     "token":null}
  }
  ```

- GET `/api/sessions/current`

  - Headers: ` {"Content-Type": "multipart/form-data"}`
  - Description: Retrieve session cookies
  - Permissions allowed: Authenticated user
  - Request body: Session cookies

  - Response: `200 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `500 Internal Server Error` (generic error)
  - Response body: An object containing user data

  ```
  {
     "id":1,
     "name":"Cataldo",
     "surname":"Basile",
     "email":"c.basile@hiker.it",
     "email_verified":1,
     "phone_number":"3399957495",
     "role":"hiker",
     "token":null}
  }
  ```

- DELETE `/api/sessions/current`

  - Description: Logout
  - Request body: _None_
  - Response: `204 No Content` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: _TBC_

### User Registration

- POST `/api/users`

  - Headers: ` {"Content-Type": "multipart/form-data"}`
  - Description: Add new user
  - Permissions allowed: _None_
  - Request body: User object

    ```
    {
      "role": "hut_worker",
      "name": "Test",
      "surname": "Test",
      "phone_number": "3331111111",
      "email": "test@test.it",
      "password": "password"
    }
    ```

  - Response: `201 OK` (Created)
  - Error responses: `422 Unprocessable entity` (Validation of body failed), `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- GET `/api/users/confirm/:token`

  - Headers: ` {"Content-Type": "multipart/form-data"}`
  - Description: Account verification
  - Permissions allowed: _None_
  - Request body: _None_
  - Request parameters: token (integer)

  - Response: `200 OK` (success) + HTML page when the account has been verified or `422 Unprocessable Entity` (token can't be activated) + html when the token has already been verified or it's wrong
  - Error responses: `404 Missing token` (Missing token), `422 Unprocessable Entity` (Wrong token or account already verified), `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

### Hikes

- POST `/api/hikes`

  - Headers: ` {"Content-Type": "multipart/form-data"}`
  - Description: Add description for hike
  - Permissions allowed: Local guide
  - Request body: Hike description, including gpx file with gpx tag
  - gpx file size must be less than 10MB

  ```
  {
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
        "start_point": {
          "latitude":44.57425086759031,
          "longitude":6.982689192518592,
          "description":"Start point",
          "type":"gps",
          "value":"gps"
        },
        "end_point": {
          "latitude":44.574263943359256,
          "longitude":6.982647031545639,
          "description":"End point",
          "type":"name",
          "value":"End point name"
        },
        "reference_points":{
          "points":[
            {"latitude":44.59376471183216,"longitude":6.970151980345208,"type":"gps","value":"gps","description":"Colle Reisassetto"},{"latitude":44.605312234235114,"longitude":6.97978383606973,"type":"gps","value":"gps","description":"Punta di Fiutrusa"}
          ]
        },
        "gpx" : ...
  }
  ```

  - Response: `201 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `400 Bad Request` (arguments error),`500 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- GET `/api/countries`

  - Description: Return an array containing all the countries where hikes are available
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

- GET `/api/provinces/:country`

  - Description: Return an array containing all the provinces of a specific country where hikes are available
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

- GET `/api/cities/:province`

  - Description: Return an array containing all the cities of a specific province where hikes are available
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

- GET `/api/hike/:id`

  - Description: Return an object contaning hike information. If the user sending the request is an hiker also the gpx file will be sent
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `422 Fields validation failed` (parameter error) `500 Internal Server Error` (generic error)
  - Response body: Hike object, or an error message in case of failure

  ```
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
      "gpx_track": "8_monte_calvo",
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18,
      "start":
        {
          "id": 3,
          "city": "Carignano",
          "province": "Torino",
          "country": "Italy",
          "address": "SP138, 10041",
          "coordinates": "44.88578, 7.626319"
        },
      "end":
        {
          "id": 18,
          "value_type": "gps",
          "value": null,
          "description": "Mountain peak",
          "coordinates": "45.462770631936834, 7.693279470138337"
        },
      "reference_points": [
          {
            "id": 17,
            "value_type": "address",
            "value": "SP138, 10041",
            "description": "Chapel of the Visitation of Valinotto",
            "coordinates": "44.88578, 7.626319",
            "ref_point_type": "location"
          },
          {
            "id": 19,
            "value_type": "address",
            "value": "Ca' Palasot, Frazione Campo, 1, 10081",
            "description": "Palasot Inn (Restaurant)",
            "coordinates": "45.45229, 7.7025213",
            "ref_point_type": "location"
          }
      ],
      "author": "Martina Piccolo",
      "gpx_content": { gpx file code }
    }
  ```

- GET `/api/hikes/filters?city=value&province=value&country=value&difficulty=value&track_length_min=value&track_length_max=value&ascent_min=value&ascent_max=value&expected_time_min=value&expected_time_max=value`

  - Description: Return an array containing all the hikes after applying the specified filters. If no filters are specified (null values), the complete list is obtained.
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `400 Bad Request` (parameter error) `500 Internal Server Error` (generic error)
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
      "gps_track": "8_monte_calvo",
      "start_point_type": "parking_lot",
      "start_point_id": 3,
      "end_point_type": "location",
      "end_point_id": 18,
      "author_id": 3,
      "start":
        {
          "id": 3,
          "city": "Carignano",
          "province": "Torino",
          "country": "Italy",
          "address": "SP138, 10041",
          "coordinates": "44.88578, 7.626319"
        },
      "end":
        {
          "id": 18,
          "value_type": "gps",
          "value": null,
          "description": "Mountain peak",
          "coordinates": "45.462770631936834, 7.693279470138337"
        },
      "reference_points": [
          {
            "id": 17,
            "value_type": "address",
            "value": "SP138, 10041",
            "description": "Chapel of the Visitation of Valinotto",
            "coordinates": "44.88578, 7.626319",
            "ref_point_type": "location"
          },
          {
            "id": 19,
            "value_type": "address",
            "value": "Ca' Palasot, Frazione Campo, 1, 10081",
            "description": "Palasot Inn (Restaurant)",
            "coordinates": "45.45229, 7.7025213",
            "ref_point_type": "location"
          }
      ],
      "author": "Martina Piccolo"
    },
    ...
  ]
  ```

### Parking lot

- POST `/api/parking`

  - Description: Add a new parking lot
  - Permissions allowed: Local guide
  - Request body: Parking lot description

  ```
  {
    "city": "Torino",
    "province": "Torino",
    "country": "Italy",
    "latitude": 15.7,
    "longitude": 45.4,
    "address": "Address Test"
  }
  ```

  - Response: `200 OK` (Created)
  - Error responses: 
    - `401 Unauthorized` (not logged in or wrong permissions)
    - `422 Fields validation failed` or `A parking lot having the same location parameters already exists` (Wrong body content)
    - `404 User not found` (specified user not found)
    - `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- DELETE `/api/parking/:id`

  - Description: Delete a parking lot by an id
  - Permissions allowed: Local guide
  - Request body: _None_
  - Response: `200 OK` (Deleted)
  - Error responses: 
    - `401 Unauthorized` (not logged in or wrong permissions)
    - `422 Params validation failed`(Wrong params)
    - `500 Database error` (Database error)
    - `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- DELETE `/api/parking/address/:address`

  - Description: Delete a parking lot by an address
  - Permissions allowed: Local guide
  - Request body: _None_
  - Response: `200 OK` (Deleted)
  - Error responses: 
    - `401 Unauthorized` (not logged in or wrong permissions)
    - `422 Params validation failed`(Wrong params)
    - `500 Database error` (Database error)
    - `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```  
  
### Huts

- POST `/api/huts`

  - Description: Add description for hut
  - Permissions allowed: Local guide
  - Request body: Hut description

  ```
  {
    "name": "Hut test",
    "city": "Turin",
    "province": "TO",
    "country": "Italy",
    "address": "Hut route 66",
    "altitude": 1950 ,
    "description": "Amazing hut in the middle of the mountains",
    "beds_number": 10,
    "latitude": 15.7,
    "longitude": 45.4,
    "phone_number" : "+393331171111",
    "email" : "hut@hut.it",
    "website" : "www.hut.com",
    "type" : "alpine_hut"

  }
  ```

  - Response: `201 OK` (Created)
  - Error responses:
    - `401 Unauthorized` (not logged in or wrong permissions)
    - `422 Fields validation failed` or `422 An hut having the same location parameters already exists` (Wrong body content)
    - `404 User not found` (specified user not found)
    - `500 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- DELETE `/api/huts`

  - Description: Delete an hut by its id
  - Permissions allowed: Local guide
  - Request body: Hut id

  ```
  {
      "hutId": 5,
  }
  ```

  - Response: `200 OK` (Deleted)
  - Error responses:
    - `401 Unauthorized` (not logged in or wrong permissions)
    - `422 Params validation failed`(Wrong params)
    - `500 Database error` (Database error)
    - `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- DELETE `/api/huts/name`

  - Description: Delete an hut by its name
  - Permissions allowed: Local guide
  - Request body: Hut name

  ```
  {
      "hutName": "Hut name"
  }
  ```

  - Response: `200 OK` (Deleted)
  - Error responses:
    - `401 Unauthorized` (not logged in or wrong permissions)
    - `422 Params validation failed`(Wrong params)
    - `500 Database error` (Database error)
    - `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

## Database Tables

- Table `user` contains: id(PK), name, surname, email, password, salt, email_verified, phone_number, role, token
  - Possible roles are: hiker, emergency_operator, platform_manager, local_guide, hut_worker
  - _email_verified_ is a flag which indicates whether (value 1) or not (value 0) the email has been verified. An user with email_verified=0 can't do anything (like a visitor).
  - _token_ is a string used to verify the user email.
- Table `hut` contains: id(PK), name, city, province, country, address, phone_number, altitude, description, beds_number, opening_period, coordinates, email, website, type, user_id
  - Possible values for _type_ are: alpine_hut, fixed_bivouac, unmanaged_hut, hiking_hut, other
  - _altitude_ is in meters
  - _coordinates_ includes latitude and longitude using the following format (latitude, longitude)
  - _user id_ is the id of the local guide that creates and manages the hut on the platform
- Table `parking_lot` contains: id(PK), city, province, country, address, coordinates, user_id
  - _coordinates_ includes latitude and longitude using the following format (latitude, longitude)
- Table `location` contains: id(PK), value_type, value, description, coordinates
  - Possible value types are: name, gps, address
  - If the value type is gps, the field value will be null and the actual gps coordinates will be inserted inside coordinates field, to avoid data replication
  - _coordinates_ includes latitude and longitude using the following format (latitude, longitude)
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
- Table `reference_point` contains: hike_id, ref_point_type, ref_point_id (the PK is the combination of each of them)
  - _ref_point_type_ can be: parking_lot, location, hut

## Users Credentials

| email                    | password | role        |
| ------------------------ | -------- | ----------- |
| c.basile@hiker.it        | password | hiker       |
| g.desantis@localguide.it | password | local guide |
| m.piccolo@guideturin.it  | password | local guide |
| i.folletti987@google.com | password | local guide |
| manager@manager.com      | password | manager     |
