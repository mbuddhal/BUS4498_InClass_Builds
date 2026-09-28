# Collect Registrations, Cancellations, and Reminder Responses Task Specification

## Basic Information

- **Task ID:** T4
- **Task name:** Collect Registrations, Cancellations, and Reminder Responses
- **Task type:** Sense
- **Task owner:** CPVC registration coordinator

## 1. Task Description

Collect structured registration submissions, cancellation notices, and reminder responses while preserving timestamps and event history. The task does not infer attendance from delivery alone.

## 2. Inputs

### Input 1

- **Input name:** Attendance submissions and responses
- **Contents and format:** Structured registration, cancellation, and reminder-response records with participant/event identifiers and timestamps.
- **Source:** Registration form and T3: Send Scheduled Reminder.

- **If a required input is missing or invalid:** Preserve the raw record as invalid or incomplete and route it to T6: Run Data-Quality Checks and Route Exceptions.

## 3. Outputs

### Output 1

- **Output name:** Raw attendance record set and pending changes
- **Contents and format:** Append-only records, source timestamps, response type, event ID, and pending-change markers.
- **Next task or recipient:** T5: Normalize and Reconcile Attendance Records.
- **Complete when:** All available records for the collection window are stored with source and timestamp metadata.

## 4. Planned Tools

### Tool 1

- **Tool name:** collect-attendance-responses
- **Input:** Attendance submissions and responses
- **Output:** Raw attendance record set and pending changes
- **Implementation Route:** Database queries, form functions, or file operations.
- **Integration approach:** Direct integration.
- **Role in this task:** Retrieve and append available attendance signals without changing their meaning.
- **Task timeout:** 10 minutes per collection run.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive retrieval or transaction failure, using source-record IDs and event ID to prevent duplicate appends. Hand off when write outcome is uncertain.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the collection window as incomplete and route the affected records to T6. Do not report complete collection.
