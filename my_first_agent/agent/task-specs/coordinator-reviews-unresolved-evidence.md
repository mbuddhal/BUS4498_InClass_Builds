# Coordinator Reviews Unresolved Evidence Task Specification

## Basic Information

- **Task ID:** H0
- **Task name:** Coordinator Reviews Unresolved Evidence
- **Task type:** Decide
- **Task owner:** CPVC event planning coordinator

## 1. Task Description

The coordinator reviews T8 or T6 unresolved evidence and decides whether the evidence supports forecasting, a permitted additional check is needed, or the forecast must be deferred. This task preserves human judgment over material conflicts, missing information, and baseline approval.

## 2. Inputs

### Input 1

- **Input name:** Unresolved evidence package
- **Contents and format:** Evidence summary, evidence versions, check ledger, materiality assessment, remaining conflicts or gaps, and handoff question.
- **Source:** T8: Investigate Unresolved Attendance Signals or T6: Run Data-Quality Checks and Route Exceptions.

- **If a required input is missing or invalid:** Return the package to the sending task for completion; do not approve a forecast from an incomplete package.

## 3. Outputs

### Output 1

- **Output name:** Coordinator evidence decision
- **Contents and format:** Decision to approve supported evidence, request one permitted additional investigation, approve a documented baseline, or defer the forecast, with rationale.
- **Next task or recipient:** T9, T8, or C2: Forecast Deferred for Human Decision, as applicable.
- **Complete when:** The decision, rationale, unresolved issues, and receiving route are recorded.

## 4. Planned Tools

### Tool 1

- **Tool name:** present-unresolved-evidence
- **Input:** Unresolved evidence package
- **Output:** Coordinator evidence decision
- **Implementation Route:** File operations or review-queue functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Present the evidence and record the coordinator’s decision; it cannot make or infer the decision.
- **Task timeout:** One business day after assignment for coordinator response.
- **Maximum retries:** Not applicable — manual task.
- **Retry only when:** Not applicable — manual task.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the forecast as deferred and route it to C2. Do not continue as if evidence were sufficient.
