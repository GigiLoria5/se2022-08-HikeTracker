**DESKTOP TESTS**


1) Testing search by hut name [PASSED]
   1) Correct name with 1 response - OK
   2) Correct name with multiple responses - OK
   3) Wrong name with 0 responses - OK 
   4) Delete research by using keyboard - OK
   5) Press delete button - OK


2) Testing search by hut geograpghic area - working [PASSED]
   1) Only country - OK
   2) Country and province - OK
   3) All - OK

3) Testing search by hut coordinates and radius [ERROR]
   1) Insert wrong values in radius field - OK
   2) Insert wrong values in coordinates fields - OK
   3) Define a radius and change the position on the map - [ERROR] No huts are shown after having define a radisu having no huts and moving into an area having huts 
   4) Select a position with no huts near 
      1) Press delete [ERROR] The list of huts is not reloaded after the radius has been deleted by pressing x button

4)  Testing search by hut type [PASSED]
    1)  Select one hut type available in the list - OK
    2)  Select more hut types available in the list - OK
    3)  Select one hut type unavailable in the list - OK
    4)  Select hyt type that returns 0 elements - OK 
    5)  Select hut types together - OK

5)  Testing ranges [ERROR]
    1)  Altitude
        1)  Min = Max = 0 [ERROR] -> Right slider is not working
        2)  Min = Max = MAX 
        3)  Min = Max in the middle 
        4)  Return 1 hut
        5)  Return multiple huts
        6)  Double click on sliders - OK
        7)  Right slider is not effective (setting a range by using only the right slider returns all the huts, it could be a BE problem ) [ERROR]
    2) Beds number 
        1)   Min = Max = 0 [ERROR] -> Right slider is not working
        2)   Min = Max = MAX 
        3)   Min = Max in the middle
        4)   Return 1 hut
        5)   Return multiple huts
        6)   Double click on sliders
        7)   Right slider is not effective (setting a range by using only the right slider returns all the huts, it could be a BE problem ) [ERROR]
   
6)  Testing multiple filters together [ERROR]
    1)  Returing exaclty one element
        1)  Right slider is not effective

    2)  Returning more elements 
        1)  Right slider is not effective
   

7)  Testing interface functions [PASSED]
    1)  Go up button OK
    2)  Reset filters - OK
        1)  When no filter is selected - OK
        2)  When all filters are selected - OK


**MOBILE TESTS**


* Reset button is not working sometimes 

1) Testing search by hut name [PASSED]
   1) Correct name with 1 response - OK
   2) Correct name with multiple responses - OK
   3) Wrong name with 0 responses - OK
   4) Delete research by using keyboard - OK
   5) Press delete button - OK

2) Testing search by hut geograpghic area [PASSED]
   1) Only country - OK
   2) Country and province - OK
   3) All - OK


3) Testing search by hut coordinates and radius [ERROR]
   1) Insert wrong values in radius field - OK
   2) Insert wrong values in coordinates fields - OK
   3) Radius with 0 huts - OK
   4) Define a radius and change the position on the map - [ERROR] No huts are shown after having defined a radius having no huts and then moving into an area having huts, with the same radius
   5) Press delete [ERROR] The list of huts is not reloaded after the radius has been deleted by pressing x button (only using the keyboard it is reloaded)

4)  Testing search by hut type [PASSED]
    1)  Select one hut type that returns 1 or more elements  - OK
    2)  Select more hut types that returns 1 and more elements  - OK
    3)  Select one hut type that returns 0 elements - OK
    4)  Select more hut types together - OK

5)  Testing ranges [ERROR]
    1)  Altitude
        1)  Min = Max = 0 [ERROR] -> Right slider is not working if left is set to 0
        2)  Min = Max = MAX 
        3)  Min = Max in the middle 
        4)  Return 1 hut
        5)  Return 0 hut 
        6)  Return multiple huts
        7)  Right slider is not working if left is set to 0[ERROR]
        8)  Double click on sliders - OK
    2) Beds number 
        1)   Min = Max = 0 [ERROR] -> Right slider is not working if left is set to 0
        2)   Min = Max = MAX 
        3)   Min = Max in the middle
        4)   Return 1 hut
        5)   Return 0 hut 
        6)   Return multiple huts
        7)   Right slider is not working if left is set to 0 [ERROR]
        8)   Double click on sliders - OK

6)  Testing multiple filters together 
    1)  Returing exaclty one element
        1)  Right slider is not working if left is set to 0 [ERROR]
    2)  Returning more elements 
        1)  Right slider is not working if left is set to 0[ERROR]


7)  Testing interface functions
    1)  Go up button OK
    2)  Reset filters 
        1)  When no filter is selected - OK
        2)  When filters are selected - OK