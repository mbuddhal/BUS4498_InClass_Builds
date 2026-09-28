# Run Data-Quality Checks and Route Exceptions Task Specification

## Basic Information

- **Task ID:** T6
- **Task name:** Run Data-Quality Checks and Route Exceptions
- **Task type:** Verify
- **Task owner:** CPVC event planning coordinator

## 1. Task Description

The coordinator reviews standard data-quality findings from T5, confirms whether corrections are supported, and routes unresolved conflicts or missing evidence. Fixed checks inform the review, but a person decides whether an exception is corrected or must be escalated.

## 2. Inputs

### Input 1

- **Input name:** Data-quality findings
- **Contents and format:** Structured findings identifying missing fields, duplicate records, conflicting statuses, timestamps, evidence versions, and proposed corrections.
- **Source:** T5: Normalize and Reconcile Attendance Records.

- **If a required input is missing or invalid:** Record the input failure and send the case to the CPVC event planning coordinator for reconstruction; do not treat the records as clean.

## 3. Outputs

### Output 1

- **Output name:** Corrected attendance evidence
- **Contents and format:** Reconciled records with supported corrections and a resolution log.
- **Next task or recipient:** T7: Establish Baseline and Uncertainty Assumptions.
- **Complete when:** The coordinator confirms that all correctable findings have evidence-supported dispositions.

### Output 2

- **Output name:** Exception queue
- **Contents and format:** Unresolved issue, evidence version, materiality, missing information, and requested human decision.
- **Next task or recipient:** H0: Coordinator Reviews Unresolved Evidence.
- **Complete when:** Every unresolved finding is recorded and routed without being treated as corrected.

## 4. Planned Tools

### Tool 1

- **Tool name:** present-data-quality-findings
- **Input:** Data-quality findings
- **Output:** Corrected attendance evidence; Exception queue
- **Implementation Route:** File operations and validation functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Display fixed-rule findings and record the coordinator’s correction or escalation decision; it has no authority to approve unsupported corrections.
- **Task timeout:** One business day after assignment for coordinator review.
- **Maximum retries:** Not applicable — manual task.
- **Retry only when:** Not applicable — manual task.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the exception as unresolved and hand it to H0. Do not continue to T7 as if it succeeded.
