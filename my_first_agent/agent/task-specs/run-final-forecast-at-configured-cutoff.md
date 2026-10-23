# Run Final Forecast at Configured Cutoff Task Specification

## Basic Information

- **Task ID:** T16
- **Task name:** Run Final Forecast at Configured Cutoff
- **Task type:** Reason
- **Task owner:** CPVC forecasting coordinator

## 1. Task Description

Run the final forecast once at the configured cutoff using the final evidence, frozen roster, approved assumptions, and current rules. This is a defined forecasting procedure that produces the final forecast and resource quantities for the final H1 coordinator approval gate; it does not approve the plan.

## 2. Inputs

### Input 1

- **Input name:** Final forecast package
- **Contents and format:** Final evidence version, frozen roster, baseline, uncertainty assumptions, safety-buffer rule, resource rules, cutoff trigger, final-approval deadline, and maximum revision rounds.
- **Source:** T7, T10, T11, and T15: Run Pre-Event Confirmation Window and Final Reminder.

- **If a required input is missing or invalid:** Record the final forecast as undetermined and hand the case to H0 or H1, as applicable.

## 3. Outputs

### Output 1

- **Output name:** Final forecast and resource quantities for H1 approval
- **Contents and format:** Final estimate, likely range, buffered attendance, category quantities, evidence versions, assumptions, limitations, forecast version, approval deadline, and revision-round status.
- **Next task or recipient:** H1: Coordinator Reviews Forecast and Resource Plan for final approval.
- **Complete when:** One final forecast version is calculated at the cutoff and all inputs, limitations, and approval controls are recorded; the plan remains unpublished until H1 approves that exact version.

## 4. Planned Tools

### Tool 1

- **Tool name:** run-final-forecast
- **Input:** Final forecast package
- **Output:** Final forecast and resource quantities
- **Implementation Route:** Functions/scripts using the approved forecasting and quantity procedures.
- **Integration approach:** Direct integration.
- **Role in this task:** Calculate the final estimate, buffer, and category quantities once at the cutoff.
- **Task timeout:** 20 minutes per final cutoff run.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive transient calculation failure when no final version was written. Verify the version first if output status is uncertain.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the final forecast as undetermined and hand the case to H1. Do not publish the plan.
