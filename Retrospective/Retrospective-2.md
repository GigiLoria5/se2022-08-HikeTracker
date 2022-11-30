# TEMPLATE FOR RETROSPECTIVE (Team 08)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done
  - 5 vs. 4
- Total points committed vs. done
  - 22 vs. 17
- Nr of hours planned vs. spent (as a team)
  - 72,65 vs. 72,75

**Remember**a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Integration Tests passing _(our addtion)_
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 5       |        | 8,5        | 10,833       |
| _#2_  | 10      | 5      | 17,25      | 19,75        |
| _#4_  | 9       | 8      | 14         | 15,25        |
| _#5_  | 9       | 2      | 17         | 17,75        |
| _#6_  | 8       | 2      | 9          | 9,167        |
| _#7_  | 7       | 5      | 6,9        | 0            |

- Hours per task average, standard deviation (estimate and actual)

  |                        | estimate | actual |
  | ---------------------- | -------- | ------ |
  | Hours per task average | 1,816    | 1,516  |
  | Standard deviation     | 0,960    | 1,328  |

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
  - -0,001

## QUALITY MEASURES

> Disclosure: due to a 2-tier server architecture choice, the presence of unit tests is highly affected as both the dao layer and the controller layer have strong dependencies (database and dao respectively). Therefore, in our definition of done, we have added integration testing, which in this architecture is the only real way of testing.

> The only possible unit tests were on some front-end utility functions without dependencies.

- Unit Testing
  - Total hours estimated: 0,5
  - Total hours spent: 0,75
  - Nr of automated unit test cases: 7
  - Coverage: 100 %
- Integration testing
  - Total hours estimated: 6,5
  - Total hours spent: 5
  - Nr of automated integration test cases: 72 (out of a total of 118 considering previous)
  - Coverage: 83,43 %
- E2E testing
  - Total hours estimated: 5
  - Total hours spent: 4,5
- Code review
  - Total hours estimated: 4,75
  - Total hours spent: 4,5

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - Our main problem was that we were too optimistic about the changes needed to complete the stories that had not been completed in the previous sprint, which in fact needed more adjustment than expected.
  - There was no communication between the different (intended in different stories) frontend developers in designing interfaces with the same style and this caused refactoring problems in the last few days.

- What lessons did you learn (both positive and negative) in this sprint?

  - Working with more communication between frontend and backend developers, and also with having fewer members on the same story (maximum three including tests), would help to have better productivity and higher code quality.
  - The merging task should be a separate task and assigned to no more than two specific member(s), in order to avoid having a 'completed' story but broken up over several branches without knowing who should merge them.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - Compared to the previous sprint, we definitely managed to improve the estimation of both front-end and testing tasks, adding more specific tasks and better defining what to do. In particular, for the front-end it helped a lot to add the interface design task, and for the testing part to have the E2E, integration and code review tasks separate.

- Which ones you were not able to achieve? Why?

  - Although we managed to improve the estimates, there remains the problem of being too optimistic and this leads to not considering problems and improvements to be made to the code as a result of tests/reviews.
  - Coordination between frontend and backend has certainly improved through greater use of GitHub issues to communicate problems and things to do, but it still can be improved further to avoid situations where one does not know who exactly has to do something (as happened with the merge).

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - **Improve Code Review**: in order to have higher quality code, we should separate the code review task into two parts, one for the backend and one for the frontend. This way, each reviewer can focus more on the details that ultimately end up making a difference, and it would also solve many problems in the merge.
  - **Check GUI consistency**: before merging, we should check the developed user interface to see whether or not it is consistent with the general style of the application and whether the general HCI guidelines have been followed. 
  - **Assign Git Merge Task**: in some stories there was the problem of not knowing who was in charge of merging the frontend and backend work together because there was no specific task but it was included in other ones. To prevent this from happening again, separate tasks related to this activity should be added.

- One thing you are proud of as a Team!!
  - We managed to complete almost all the stories we committed to in this sprint with a solid result, following business priority unlike the last sprint. In particular, there was a lot of transparency in realising that stories 5 and 6 needed more time, and deciding, correctly, to move the time allocated to story 7 to where it was needed.
