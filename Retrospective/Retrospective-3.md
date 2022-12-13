# TEMPLATE FOR RETROSPECTIVE (Team 08)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done
  - 2 vs. 2
- Total points committed vs. done
  - 8 vs. 8
- Nr of hours planned vs. spent (as a team)
  - 72 vs. 72,917

**Remember**a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Integration Tests passing _(our addtion)_
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 19      |        | 34,5       | 34,333       |
| _#7_  | 10      | 5      | 19,833     | 20,833       |
| _#8_  | 11      | 8      | 17,667     | 17,75        |

- Hours per task average, standard deviation (estimate and actual)

  |                        | estimate | actual |
  | ---------------------- | -------- | ------ |
  | Hours per task average | 1,800    | 1,823  |
  | Standard deviation     | 0,983    | 1,047  |

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
  - -0,013

## QUALITY MEASURES

> Disclosure: due to a 2-tier server architecture choice, the presence of unit tests is highly affected as both the dao layer and the controller layer have strong dependencies (database and dao respectively). Therefore, in our definition of done, we have added integration testing, which in this architecture is the only real way of testing.

- Unit Testing
  - Total hours estimated: 0
  - Total hours spent: 0,5
  - Nr of automated unit test cases: 12 (out of a total of 19 considering previous)
  - Coverage: 100 %
- Integration testing
  - Total hours estimated: 3,917
  - Total hours spent: 3,5
  - Nr of automated integration test cases: 39 (out of a total of 157 considering previous)
  - Coverage: 83,73 %
- E2E testing
  - Total hours estimated: 4
  - Total hours spent: 4
- Code review
  - Total hours estimated: 5,333
  - Total hours spent: 4,833

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - This time we managed to avoid major errors in the evaluation of the work to be done and the estimation of each task. Indeed, the time taken to finish what was committed is more or less the same as estimated, with only minor variations that did not affect our plans.

- What lessons did you learn (both positive and negative) in this sprint?

  - ...

- Which improvement goals set in the previous retrospective were you able to achieve?

  - The separation of the code review into two separate tasks (frontend and backend) has, as expected, significantly improved the quality of the inspection, as the two revievers were able to detect almost all problems/errors, resulting in a higher quality application.
  - With the separation of the code reviews, the front-end reviewer was also able to spend time checking the consistency of the interfaces. In fact, no style refactoring was necessary this time, which had taken up a lot of time in the previous sprint.
  - Creating specific git merge tasks and assigning them to specific member(s) also paid off: for each story/tasks, we had full knowledge of who was/were in charge of performing the merge, avoiding unpleasant situations where one feature had not yet been merged with the rest.

- Which ones you were not able to achieve? Why?

  - We managed to achieve all the improvements we set out to accomplish in the last retrospective.

- ## Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

- ## One thing you are proud of as a Team!!
  -
