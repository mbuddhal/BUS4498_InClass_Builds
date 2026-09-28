# Run Pre-Event Confirmation Window and Final Reminder Task Specification

## Basic Information

- **Task ID:** T15
- **Task name:** Run Pre-Event Confirmation Window and Final Reminder
- **Task type:** Act
- **Task owner:** CPVC registration coordinator

## 1. Task Description

Send the final approved reminder, collect late cancellations and responses during the configured confirmation window, reconcile the resulting changes, and stop accepting forecast inputs at the final cutoff.

## 2. Inputs

### Input 1

- **Input name:** Frozen roster and confirmation schedule
- **Contents and format:** Roster version, event start time, final-reminder schedule, approved message template, and final cutoff.
- **Source:** T14: Close Registration and Freeze Planning Roster.

- **If a required input is missing or invalid:** Do not send the final reminder; record the window as blocked and hand it to the CPVC registration coordinator.

## 3. Outputs

### Output 1

- **Output name:** Final pre-event evidence set and closed input window
- **Contents and format:** Final reminder delivery log, late response records, cancellation records, reconciled evidence version, and cutoff timestamp.
- **Next task or recipient:** T16: Run Final Forecast at Configured Cutoff.
- **Complete when:** The final cutoff has passed, all available responses are recorded, and no further forecast inputs are accepted.

## 4. Planned Tools

### Tool 1

- **Tool name:** run-confirmation-window
- **Input:** Frozen roster and confirmation schedule
- **Output:** Final pre-event evidence set and closed input window
- **Implementation Route:** Messaging APIs, file operations, and scheduling functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Dispatch the final reminder, collect responses, reconcile them, and close the input window.
- **Task timeout:** Until the configured final cutoff, with a maximum of 24 hours.
- **Maximum retries:** 1
- **Retry only when:** Retry a reminder only after a definitive delivery failure using roster version plus reminder-stage ID as an idempotency key; never retry an uncertain send. Read collection retries use source-record IDs to avoid duplicates.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the window and affected evidence as incomplete and hand the case to the CPVC registration coordinator. Do not run the final forecast as if the window completed.
