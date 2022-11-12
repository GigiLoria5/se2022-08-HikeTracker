# se2022-08-HikeTracker

[![Unit Tests](https://github.com/GigiLoria5/se2022-08-HikeTracker/workflows/Unit%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HikeTracker/actions)
[![Integration Tests](https://github.com/GigiLoria5/se2022-08-HikeTracker/workflows/Integration%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HikeTracker/actions)

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
- nodemailer **6.8.0**

### Testing

- Integration Tests: Mocha
- Unit Tests: Jest

## React Client Application Routes

- Route `/` : a simple welcome page that acts as an entry point for all users
- Route `/hikes` : shows the list of hikes added by local guides, with the possibility of showing everyone various information about them, and for authenticated users also shows the map
- Route `/login`: the page contains a form composed of username and password fields and a submit button. This route allows the user to perform login operation. The results of the authentication procedure (user logged in, wrong email and password) are shown inside an alert dialogue message on top of the screen. This route is linked to sign up route, by clicking on the text down the submit button.

- Route `/register`: the page contains a form that allows the user to define a new account, by inserting

  - user account type: hiker, hut worker, local guide, emergency operator. <ins>Platform managers cannot be registered in this way, but requires system administrator the creation of their accounts. <ins>
  - first name: not compulsory if type hiker has been selected
  - last name: not compulsory if type hiker has been selected
  - phone number: not compulsory if type hiker has been selected
  - email address: compulsory, the value inserted is checked using html email validator
  - password: compulsory, minimum lenght is 8 maximum is 64.
    At the bottom of this form there is a submit button and a link to go back to login route.

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
      "phone": "3331111111",
      "email": "test@test.it",
      "password": "password"
    }
      ```
  - Response: `201 OK` (Created)
  - Error responses: `422 Unprocessable entity` (Email already exists), `503 Internal Server Error` (generic error)
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
  
  - Response: HTML page when the account has to be verified or has already been verified 
  - Error responses: `404 Missing token` (Email already exists), `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  <!DOCTYPE html>
    <html lang="en">

    <head>
	    <meta charset="UTF-8">
	      <title> HikeTracker account already verified! </title>

    </head>

    <body>
	    <h1> Account already verified<h1>
			  <h2> Your account has already been verified! </h2>
			    <p> You just have to perform the login with the credentials you choose. </p>
			<a href="http://localhost:3000/login"> Click here to perform the login</a>
			</div>
    </body>

    </html>

  ```

### Hikes

- POST `/api/hikes`

  - Headers: ` {"Content-Type": "multipart/form-data"}`
  - Description: Add description for hike
  - Permissions allowed: Local guide
  - Request body: Hike description, including gpx file with gpx tag

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
        "start_point_type": "parking_lot",
        "start_point_id": 3,
        "end_point_type": "location",
        "end_point_id": 18
        "reference_points": {
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
        }
        "gpx" : ...
  }
  ```

  - Response: `201 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `500 Internal Server Error` (generic error)
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
