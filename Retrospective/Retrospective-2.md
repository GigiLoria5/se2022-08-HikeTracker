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
  - Our main problem was...
- What lessons did you learn (both positive and negative) in this sprint?
  - ...
- Which improvement goals set in the previous retrospective were you able to achieve?
  - Compared with the previous sprint, we managed to improve the estimation of both front-end and back-end tasks, by adding more specific tasks and define better what to do, but there is still the problem of being too optimistic in the estimations.
- Which ones you were not able to achieve? Why?
  - _Something about the coordination_
- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - **...**: ...
  - **...**: ...
  - **...**: ...
- One thing you are proud of as a Team!!
  - ...
