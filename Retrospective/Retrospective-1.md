# TEMPLATE FOR RETROSPECTIVE (Team 08)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done
  - 4 vs. 2
- Total points committed vs. done
  - 14 vs. 4
- Nr of hours planned vs. spent (as a team)
  - 72 vs. 76

**Remember**a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Integration Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 10      |        | 31         | 33,833       |
| _#1_  | 6       | 2      | 10,5       | 14,417       |
| _#2_  | 6       | 5      | 13         | 13           |
| _#3_  | 6       | 2      | 6,5        | 6,75         |
| _#4_  | 5       | 5      | 11         | 8            |

- Hours per task average, standard deviation (estimate and actual)

  |                        | estimate | actual |
  | ---------------------- | -------- | ------ |
  | Hours per task average | 2,172    | 2,303  |
  | Standard deviation     | 2,683    | 2,816  |

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
  - -0,050

## QUALITY MEASURES

- Unit Testing
  - Total hours estimated: _not available_
  - Total hours spent: 0
  - Nr of automated unit test cases: 0
  - Coverage: _not available_
- Integration testing
  - Total hours estimated: _not available_
  - Nr of automated integration test cases: 55
  - Total hours spent: 5,58
  - Coverage: _not available_
- E2E testing
  - Total hours estimated: _not available_
  - Total hours spent: 0,75
- Code review
  - Total hours estimated: _not available_
  - Total hours spent: 1,5

> _The estimation of the above measures cannot be carried out as these activities have been included as subtasks of other macro activities._

## ASSESSMENT

- What caused your errors in estimation (if any)?
  - Our main problem was underestimating the time it took to make the GUIs and implement filters, but in general story number 1 proved to be very challenging.
- What lessons did you learn (both positive and negative) in this sprint?
  - We realised that planning and estimating must be done more thoroughly, as we tend to underestimate the workload and be too optimistic with the number of stories to be committed. In addition, we understood that we need to have more communication to help synchronise the work.
- Which improvement goals set in the previous retrospective were you able to achieve?
  - We definitely succeeded in improving the description of tasks by using checklists and creating more sub-tasks, although it could still be done better (e.g. by better specifying the testing part). In addition, we were both able to improve collaboration on VCS and have better documentation.
- Which ones you were not able to achieve? Why?
  - We could not improve the estimates for the front-end tasks, in fact they were once again totally wrong. The main reason for this is underestimating the things needed for the interface, not having a clear idea of what each one contains and not following a precise design.
- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - **Improve the estimates of the front-end tasks**: this can be achieved by defining a design (in which both the person who will realise the interface and the server side participate) prior to realising the interface, so that we can better establish what is needed, what functionality is required on the server side, how many (estimated) hours will be required, and also avoid making ongoing changes.
  - **Improve estimates for the testing part**: obtainable by separating the main testing task.
  - **Having more co-ordination between frontend and backend**: achievable through the creation of 'issues' on GitHub or comments on YouTrack for missing or necessary parts.
- One thing you are proud of as a Team!!
  - Despite many difficulties and the occurrence of bigger tasks than we had imagined, we did not lose heart and managed to turn the problems around and produce a working application.
