**DESKTOP TESTS**

* Search parameters are lost when the user goes back from the selected hut to the list of huts [ERROR]

1) Testing search by hut name 
   1) Correct name with 1 response - OK
   2) Correct name with multiple responses - OK
   3) Wrong name with 0 responses - OK 
   4) Delete research by using keyboard - OK
   5) Press delete button ( I think it should be visible only when something is insertend and not always). If pressed when hut name is not written, it goes into a loop [ERROR]


2) Testing search by hut geograpghic area - working [PASSED]
   1) Only country - OK
   2) Country and province - OK
   3) All - OK

3) Testing search by hut coordinates and radius [PASSED]
   1) Insert wrong values in radius field - OK
   2) Insert wrong values in coordinates fields - OK
   3) Define a radius and change the position on the map - OK 

4)  Testing search by hut type [PASSED]
    1)  Select one hut type available in the list - OK
    2)  Select more hut types available in the list - OK
    3)  Select one hut type unavailable in the list - OK
    4)  Select hyt type that returns 0 elements - OK 
    5)  Select hut types together - OK

5)  Testing ranges [ERROR]
    1)  Altitude
        1)  Min = Max = 0
        2)  Min = Max = MAX 
        3)  Min = Max in the middle 
        4)  Return 1 hut
        5)  Return multiple huts
        6)  Double click on the left slider create a loop [ERROR]
    2) Beds number 
        1)   Min = Max = 0
        2)   Min = Max = MAX 
        3)   Min = Max in the middle
        4)   Return 1 hut
        5)   Return multiple huts
        6)   Double click on the left slider create a loop [ERROR]
   
6)  Testing multiple filters together 
    1)  Returing exaclty one element
        1)  Left slider (both altitude and beds number) when selected create a loop [ERROR]
    2)  Returning more elements 
        1)  Left slider (both altitude and beds number) when selected create a loop [ERROR]
   

7)  Testing interface functions
    1)  Go up button OK
    2)  Reset filters 
        1)  When no filter is selected - OK
        2)  When all filters are selected 
            1)  Location coordinates are not erased [maybe ERROR]

**MOBILE TESTS**


* Filters creates loop if 2 searches are performed one after the other
* Filter section is reset every time click on it, even if filters are applied (once one filter is applied, if filter button is pressed again the filter module is empy like no filters are applied but they are)
* When the filters returns 0 elements, if we click again on filters the sliders disappears and null appear
* Loading animation should be centered 

1) Testing search by hut name 
   1) Correct name with 1 response - OK
   2) Correct name with multiple responses - OK
   3) Wrong name with 0 responses - [ERROR] Common error n3 described on top
   4) Delete research by using keyboard - OK
   5) Press delete button ( I think it should be visible only when something is insertend and not always). If pressed when hut name is not written, it goes into a loop [ERROR]

2) Testing search by hut geograpghic area  [ERROR]
   1) It goes into loop if the user don't close the filter using the X button but clicks on the grey background on the right 
   2) It goes in loop if 2 searches are performed one after the other 

3) Testing search by hut coordinates and radius [PASSED]
   1) Insert wrong values in radius field - OK
   2) Insert wrong values in coordinates fields - OK
   3) Radious with 0 huts - [ERROR] Common error n3 described on top
   4) Define a radius and change the position on the map - OK 

4)  Testing search by hut type [PASSED]
    1)  Select one hut type that returns 1 or more elements  - OK
    2)  Select more hut types that returns 1 and more elements  - OK
    3)  Select one hut type that returns 0 elements - [ERROR] Common error n3 described on top
    4)  Select more hut types together - OK

5)  Testing ranges [ERROR]
    1)  Altitude
        1)  Min = Max = 0 
        2)  Min = Max = MAX 
        3)  Min = Max in the middle 
        4)  Return 1 hut
        5)  Return 0 hut [ERROR] Common error n3 described on top
        6)  Return multiple huts
        7)  Double click on the left slider create a loop [ERROR]
    2) Beds number 
        1)   Min = Max = 0
        2)   Min = Max = MAX 
        3)   Min = Max in the middle
        4)   Return 1 hut
        5)   Return 0 hut [ERROR] Common error n3 described on top
        6)   Return multiple huts
        7)   Double click on the left slider create a loop [ERROR]

6)  Testing multiple filters together 
    1)  Returing exaclty one element
        1)  Left slider (both altitude and beds number) when selected create a loop [ERROR]
    2)  Returning more elements 
        1)  Left slider (both altitude and beds number) when selected create a loop [ERROR]


7)  Testing interface functions
    1)  Go up button OK
    2)  Reset filters 
        1)  When no filter is selected - OK
        2)  When  filters are selected [ERROR] (first apply a filter, then show the reuslt and press reset: altitude and beds number ranges will decrease and set to the current value of the shown item and not to default) 
            1)  Location coordinates are not erased [maybeERROR]