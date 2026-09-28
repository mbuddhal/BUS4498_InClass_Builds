# Open Registration and Set Event Window Task Specification

## Basic Information

- **Task ID:** T2
- **Task name:** Open Registration and Set Event Window
- **Task type:** Act
- **Task owner:** CPVC registration coordinator

## 1. Task Description

Open the approved registration process, record the active event window, and associate the reminder schedule. Fixed dates and status rules perform this task after T1 approval.

## 2. Inputs

### Input 1

- **Input name:** Approved event brief
- **Contents and format:** Structured approved event record with event dates, capacity, registration close, forecast cutoff, and reminder schedule.
- **Source:** T1: Define Event Planning Brief.

- **If a required input is missing or invalid:** Keep registration closed and hand the case to the CPVC registration coordinator for correction.

## 3. Outputs

### Output 1

- **Output name:** Open registration record and event calendar
- **Contents and format:** Event identifier, open/close timestamps, capacity, status, and linked reminder schedule.
- **Next task or recipient:** T3: Send Scheduled Reminder and T4: Collect Registrations, Cancellations, and Reminder Responses.
- **Complete when:** The registration record is active and the event window matches the approved brief.

## 4. Planned Tools

### Tool 1

- **Tool name:** open-registration
- **Input:** Approved event brief
- **Output:** Open registration record and event calendar
- **Implementation Route:** Database or file operations and scheduling functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Create the event window and registration status from approved fields.
- **Task timeout:** 10 minutes per task run.
- **Maximum retries:** 0
- **Retry only when:** Not applicable — retries are not permitted; if the outcome is uncertain, verify the event status before any manual correction.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record registration as not opened or status uncertain and hand the case to the CPVC registration coordinator. Do not continue to reminders.
