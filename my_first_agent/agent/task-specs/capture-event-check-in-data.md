# Capture Event Check-In Data Task Specification

## Basic Information

- **Task ID:** T18
- **Task name:** Capture Event Check-In Data
- **Task type:** Sense
- **Task owner:** CPVC event staff

## 1. Task Description

Record actual event check-ins, reconcile duplicate check-ins, and preserve approved late-arrival handling so T19 can compare actual attendance with the final forecast.

## 2. Inputs

### Input 1

- **Input name:** Event check-in records
- **Contents and format:** Structured check-in events with event ID, attendee or registration identifier, timestamp, and approved late-arrival status.
- **Source:** Event staff check-in process and T17: Publish Final Resource Plan and Event-Team Handoff.

- **If a required input is missing or invalid:** Preserve the record as incomplete and route it to the CPVC event planning coordinator for review.

## 3. Outputs

### Output 1

- **Output name:** Actual attendance record
- **Contents and format:** Deduplicated final count, source records, timestamps, late-arrival notes, and data-quality notes.
- **Next task or recipient:** T19: Compare Forecast with Actual Attendance.
- **Complete when:** The check-in window closes and every available record is counted or marked unresolved.

## 4. Planned Tools

### Tool 1

- **Tool name:** capture-check-in-records
- **Input:** Event check-in records
- **Output:** Actual attendance record
- **Implementation Route:** File operations, database functions, or check-in forms.
- **Integration approach:** Direct integration.
- **Role in this task:** Append check-ins, deduplicate by approved identifier, and produce the final count.
- **Task timeout:** Through the event check-in window, with a maximum of 24 hours.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive write failure using event ID plus check-in record ID as an idempotency key. Hand off when write outcome is uncertain.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record actual attendance as incomplete and hand the case to the CPVC event planning coordinator. Do not report a final count as complete.
