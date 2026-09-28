# Add Safety Buffer Task Specification

## Basic Information

- **Task ID:** T10
- **Task name:** Add Safety Buffer
- **Task type:** Act
- **Task owner:** CPVC forecasting coordinator

## 1. Task Description

Apply the configured safety-buffer rule to the approved attendance estimate and likely range. The task records the calculation so resource planning can use the buffered value.

## 2. Inputs

### Input 1

- **Input name:** Attendance estimate and likely range
- **Contents and format:** Versioned point estimate, range, confidence limitations, and trigger.
- **Source:** T9: Produce Attendance Estimate and Likely Range.

### Input 2

- **Input name:** Approved buffer rule
- **Contents and format:** Configured percentage or quantity rule and applicable resource constraints.
- **Source:** T1: Define Event Planning Brief.

- **If a required input is missing or invalid:** Record the buffer as pending and hand the case to the CPVC forecasting coordinator; do not calculate quantities.

## 3. Outputs

### Output 1

- **Output name:** Buffered planning attendance
- **Contents and format:** Buffered quantity, calculation, source forecast version, rule version, and limitations.
- **Next task or recipient:** T11: Calculate Food, Drink, and Swag Quantities.
- **Complete when:** The configured rule has been applied once and the calculation is recorded.

## 4. Planned Tools

### Tool 1

- **Tool name:** apply-safety-buffer
- **Input:** Attendance estimate and likely range; Approved buffer rule
- **Output:** Buffered planning attendance
- **Implementation Route:** Functions/scripts using the configured buffer formula.
- **Integration approach:** Direct integration.
- **Role in this task:** Apply the rule and record the calculation without changing the source forecast.
- **Task timeout:** 10 minutes per forecast version.
- **Maximum retries:** 0
- **Retry only when:** Not applicable — retries are not permitted; a corrected input requires a new versioned calculation.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the buffer as incomplete and hand the case to the CPVC forecasting coordinator. Do not continue to resource quantities.
