**DESKTOP TESTS**
1) Terminate an hike [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Return to menu
    5) Return to "My hikes"
    6) Click on "Terminate"

2) Cancel an hike [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Return to menu
    5) Return to "My hikes"
    6) Click on "Cancel ongoing hike"

3) Try to insert an end date before start date [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Click on "Terminate" with end date before start date
    5) Message: "Please select a date and time after the departure date"

4) Try to insert an empty end date[PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Click on "Terminate" with end date empty
    5) Message: "Please select a date and time after the departure date"

5) Try to insert a wrong format of the end date[PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Click on "Terminate" with a wrong format of the end date
    5) Message: "Please select a date and time" and the border of the end time field became red

6) Try to insert an end date before the start date, but with the end time after the start time[PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Click on "Terminate" with wrong end date
    5) Message: "Please select a date and time after the departure date"

**MOBILE TESTS**
1) Terminate an hike [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Return to menu
    5) Return to "My hikes"
    6) Click on "Terminate"

2) Cancel an hike [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Return to menu
    5) Return to "My hikes"
    6) Click on "Cancel ongoing hike"

3) Try to insert an end date before start date [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Click on "Terminate" with end date before start date
    5) Message: "Please select a date and time after the departure date"

4) Try to insert an end date before the start date, but with the end time after the start time[PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Start a hike
    4) Click on "Terminate" with wrong end date
    5) Message: "Please select a date and time after the departure date"