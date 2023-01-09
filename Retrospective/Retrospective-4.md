# TEMPLATE FOR RETROSPECTIVE (Team 08)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done
  - 3 vs. 3
- Total points committed vs. done
  - 13 vs. 13
- Nr of hours planned vs. spent (as a team)
  - 72 vs. 73.5

**Remember**a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Integration Tests passing _(our addtion)_
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 15      |        | 29         | 28,75        |
| _#17_ | 11      | 5      | 16,5       | 18,333       |
| _#18_ | 11      | 3      | 12         | 14,333       |
| _#34_ | 10      | 5      | 14,5       | 12,083       |

- Hours per task average, standard deviation (estimate and actual)

  |                        | estimate | actual |
  | ---------------------- | -------- | ------ |
  | Hours per task average | 1,532    | 1,564  |
  | Standard deviation     | 0,887    | 1,131  |

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
  - -0,020

## QUALITY MEASURES

> **Disclosure**: due to a 2-tier server architecture choice, the presence of unit tests is highly affected as both the dao layer and the controller layer have strong dependencies (database and dao respectively). Therefore, in our definition of done, we have added integration testing, which in this architecture is the only real way of testing.

- Unit Testing
  - Total hours estimated: 0
  - Total hours spent: 0
  - Nr of automated unit test cases: 0 (out of a total of 19 considering previous)
  - Coverage: 100 % (calculated by Jest considering only what can be unit tested)
- Integration testing
  - Total hours estimated: 5,75
  - Total hours spent: 5
  - Nr of automated integration test cases: 43 (out of a total of 200 considering previous)
  - Coverage: 83,89 % (calculated by Mocha)
- E2E testing
  - Total hours estimated: 6
  - Total hours spent: 6
- Code review
  - Total hours estimated: 8,333
  - Total hours spent: 7,916
- Technical Debt management:
  - Total hours estimated: 1,5
  - Total hours spent: 0,667
  - Hours estimated for remediation by SonarQube: 10
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 10 (only "major" issues, but they are not our priority)
  - Hours spent on remediation: 0,667
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0,5
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability):
    - Reliability: A
    - Security: A
    - Maintainability: A

> **Technical Debt Handling Strategy**: our focus is mainly on solving all 'blocking' and 'critical' issues and ensures that we reach at least 80 % coverage on the backend part of the application. If there is time left over (from the allocated one on handling the TD), we spend it on solving the 'major' issues as well. Obviously 'blocking', 'critical' and 'major' refer to the severity levels used by SonarQube.

## ASSESSMENT

- What caused your errors in estimation (if any)?

  -

- What lessons did you learn (both positive and negative) in this sprint?

  - Positive lesson: .
  - Negative lesson: .

- Which improvement goals set in the previous retrospective were you able to achieve?

  -

- Which ones you were not able to achieve? Why?

  - We managed to achieve all the improvements we set out to accomplish in the last retrospective.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - **...:** .
  - **...:** .

- One thing you are proud of as a Team!!
  -
