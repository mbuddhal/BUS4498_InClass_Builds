# Establish Baseline and Uncertainty Assumptions Task Specification

## Basic Information

- **Task ID:** T7
- **Task name:** Establish Baseline and Uncertainty Assumptions
- **Task type:** Reason
- **Task owner:** CPVC forecasting coordinator

## 1. Task Description

Select the strongest approved attendance baseline and calculate uncertainty inputs from reconciled evidence and prior event results. Fixed baseline and uncertainty rules are applied; unsupported assumptions are recorded as limitations.

## 2. Inputs

### Input 1

- **Input name:** Reconciled attendance evidence
- **Contents and format:** Versioned canonical attendance records and data-quality findings.
- **Source:** T5: Normalize and Reconcile Attendance Records and T6: Run Data-Quality Checks and Route Exceptions.

### Input 2

- **Input name:** Historical attendance evidence
- **Contents and format:** Prior event results and the approved historical 40 percent baseline in a structured evidence record.
- **Source:** T20: Store Results and Update Future Baseline and approved CPVC history.

- **If a required input is missing or invalid:** Record the limitation and route the case to H0: Coordinator Reviews Unresolved Evidence; do not silently substitute a baseline.

## 3. Outputs

### Output 1

- **Output name:** Versioned baseline and uncertainty assumptions
- **Contents and format:** Selected baseline, uncertainty values, source versions, selection rationale, and limitations.
- **Next task or recipient:** T8: Investigate Unresolved Attendance Signals and T9: Produce Attendance Estimate and Likely Range.
- **Complete when:** Each assumption has an approved source or an explicit limitation and version.

## 4. Planned Tools

### Tool 1

- **Tool name:** establish-forecast-assumptions
- **Input:** Reconciled attendance evidence; Historical attendance evidence
- **Output:** Versioned baseline and uncertainty assumptions
- **Implementation Route:** File operations and rule-based calculation functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Apply the approved baseline and uncertainty rules and record the evidence versions used.
- **Task timeout:** 15 minutes per forecast run.
- **Maximum retries:** 0
- **Retry only when:** Not applicable — retries are not permitted; a new evidence version requires a new task run and a new recorded version.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record assumptions as incomplete and hand the case to H0. Do not continue to T9 as if assumptions succeeded.
