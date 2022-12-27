**DESKTOP TESTS**
1) Start a Hike [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Select a hike
    4) Select "Start this hike"
    5) Edit date and time
    6) Click "START"

2) Try to start a hike while another one is running [PASSED]
    1) Login as hiker
    2) Check on page "My hikes" that there is an ongoing hike (or do test 1)
    3) Go to "Hikes"
    4) Select a hike
    5) You can't select "Start this hike", since another one is running

3) Wrong date/time [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Select a hike
    4) Select "Start this hike"
    5) Type a random string into the date/time picker form
    6) Click "START"
    7) The app shows an error message "Please select a date and a time."

**MOBILE TESTS**
1) Start a Hike [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Select a hike
    4) Select "Start this hike"
    5) Edit date and time
    6) Click "START"

2) Try to start a hike while another one is running [PASSED]
    1) Login as hiker
    2) Check on page "My hikes" that there is an ongoing hike (or do test 1)
    3) Go to "Hikes"
    4) Select a hike
    5) You can't select "Start this hike", since another one is running

3) Wrong date/time [PASSED]
    1) Login as hiker
    2) Go to "Hikes"
    3) Select a hike
    4) Select "Start this hike"
    5) Type a random string into the date/time picker form
    6) Click "START"
    7) The app shows an error message "Please select a date and a time."

    NOTE: The app allows to insert a future date as start/end time. This is fine for testing, but not for the ultimate users.