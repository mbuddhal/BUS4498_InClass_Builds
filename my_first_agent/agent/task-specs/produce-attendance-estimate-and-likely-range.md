# Produce Attendance Estimate and Likely Range Task Specification

## Basic Information

- **Task ID:** T9
- **Task name:** Produce Attendance Estimate and Likely Range
- **Task type:** Reason
- **Task owner:** CPVC forecasting coordinator

## 1. Task Description

Generate a point estimate and likely attendance range from reconciled evidence, approved baseline assumptions, and T8 investigation results. The defined forecasting procedure identifies confidence and limitations but does not apply the safety buffer or approve resources.

## 2. Inputs

### Input 1

- **Input name:** Forecast evidence package
- **Contents and format:** Versioned reconciled evidence, baseline and uncertainty assumptions, T8 evidence summary, remaining uncertainty, and forecast trigger.
- **Source:** T5, T7, and T8: Investigate Unresolved Attendance Signals.

- **If a required input is missing or invalid:** Record the forecast as undetermined and hand the package to H0: Coordinator Reviews Unresolved Evidence.

## 3. Outputs

### Output 1

- **Output name:** Attendance estimate and likely range
- **Contents and format:** Point estimate, likely range, confidence or limitations, evidence versions, assumptions, and forecast trigger.
- **Next task or recipient:** T10: Add Safety Buffer.
- **Complete when:** The estimate and range are reproducible from the recorded package and all limitations are stated.

## 4. Planned Tools

### Tool 1

- **Tool name:** produce-attendance-estimate
- **Input:** Forecast evidence package
- **Output:** Attendance estimate and likely range
- **Implementation Route:** Functions/scripts using the approved forecasting procedure; no production integration is required.
- **Integration approach:** Direct integration.
- **Role in this task:** Combine supported evidence into the point estimate, likely range, and limitations.
- **Task timeout:** 20 minutes per forecast run.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive transient calculation or model failure when no forecast output was written. If output status is uncertain, verify the forecast version before retrying.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the estimate as undetermined and hand the case to H0. Do not continue to T10.
