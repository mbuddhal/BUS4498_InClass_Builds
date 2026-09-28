# Send Scheduled Reminder Task Specification

## Basic Information

- **Task ID:** T3
- **Task name:** Send Scheduled Reminder
- **Task type:** Act
- **Task owner:** CPVC registration coordinator

## 1. Task Description

Send the approved reminder at its scheduled time and record delivery status. The configured schedule and message template control the action; delivery is not treated as an attendance response.

## 2. Inputs

### Input 1

- **Input name:** Reminder dispatch package
- **Contents and format:** Registration roster, event details, scheduled send time, approved message template, and reminder-stage identifier.
- **Source:** T1: Define Event Planning Brief and T2: Open Registration and Set Event Window.

- **If a required input is missing or invalid:** Do not send; record the reminder as blocked and hand it to the CPVC registration coordinator.

## 3. Outputs

### Output 1

- **Output name:** Reminder-delivery log and pending-response window
- **Contents and format:** Event ID, reminder-stage ID, recipient batch, send timestamp, delivery status, and response deadline.
- **Next task or recipient:** T4: Collect Registrations, Cancellations, and Reminder Responses.
- **Complete when:** Each planned dispatch has a definitive delivery status and the response window is recorded.

## 4. Planned Tools

### Tool 1

- **Tool name:** send-scheduled-reminder
- **Input:** Reminder dispatch package
- **Output:** Reminder-delivery log and pending-response window
- **Implementation Route:** Web API or messaging functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Send the configured reminder and record delivery without recording a response.
- **Task timeout:** 10 minutes per scheduled dispatch.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive delivery failure, using the event ID plus reminder-stage ID as an idempotency key. Never retry an uncertain outcome until delivery status is checked.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record delivery as unknown or failed and hand the case to the CPVC registration coordinator. Do not claim a reminder response.
