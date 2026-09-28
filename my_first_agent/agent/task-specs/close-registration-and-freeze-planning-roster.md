# Close Registration and Freeze Planning Roster Task Specification

## Basic Information

- **Task ID:** T14
- **Task name:** Close Registration and Freeze Planning Roster
- **Task type:** Act
- **Task owner:** CPVC registration coordinator

## 1. Task Description

Close new registration at the configured time, freeze the planning roster version, preserve permitted late-cancellation handling, and schedule the final confirmation window.

## 2. Inputs

### Input 1

- **Input name:** Registration-close event and latest reconciled records
- **Contents and format:** Event ID, configured close timestamp, current registration status, and latest evidence version.
- **Source:** T1: Define Event Planning Brief, T5: Normalize and Reconcile Attendance Records, and the event clock.

- **If a required input is missing or invalid:** Keep registration status unchanged and hand the case to the CPVC registration coordinator.

## 3. Outputs

### Output 1

- **Output name:** Frozen planning roster and final-cycle schedule
- **Contents and format:** Frozen roster version, close timestamp, permitted late-cancellation rule, confirmation-window dates, and final forecast cutoff.
- **Next task or recipient:** T15: Run Pre-Event Confirmation Window and Final Reminder.
- **Complete when:** New registrations are blocked and the frozen roster version is auditable.

## 4. Planned Tools

### Tool 1

- **Tool name:** close-registration
- **Input:** Registration-close event and latest reconciled records
- **Output:** Frozen planning roster and final-cycle schedule
- **Implementation Route:** Database or file operations and scheduling functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Set the registration status to closed and create an immutable roster version.
- **Task timeout:** 10 minutes at the configured close time.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive failure before closure, using event ID and close-event ID as an idempotency key. If status is uncertain, verify status before retrying.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record closure as uncertain and hand the case to the CPVC registration coordinator. Do not begin the final forecast cycle.
