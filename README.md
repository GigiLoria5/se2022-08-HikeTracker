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
- POST `/api/hikes`

  - Description: Add description for hike
  - Permissions allowed: Local guide
  - Request body: Hike description

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
        "reference_points": [1, 2, 12]
  }
  ```

  - Response: `201 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed) or `500 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- POST `/api/uploadFile`
  - Headers: ` {"Content-Type": "multipart/form-data"}`
  - Description: Upload file
  - Permissions allowed: Local guide
  - Request body: File name
  - File: gpx file

  ```
  {
    "gpx" : ...
    "name" : 1_monte_ferra
  }  
  ```

  - Response: `201 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed) or `500 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

## Database Tables
