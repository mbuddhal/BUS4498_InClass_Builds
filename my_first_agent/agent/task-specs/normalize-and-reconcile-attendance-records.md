# Normalize and Reconcile Attendance Records Task Specification

## Basic Information

- **Task ID:** T5
- **Task name:** Normalize and Reconcile Attendance Records
- **Task type:** Verify
- **Task owner:** CPVC attendance-data coordinator

## 1. Task Description

Normalize identifiers and timestamps, deduplicate records, distinguish confirmed, canceled, and unanswered statuses, and identify conflicts or missing fields so later checks use a consistent evidence set.

## 2. Inputs

### Input 1

- **Input name:** Raw attendance records
- **Contents and format:** Append-only registration, cancellation, reminder-response, and pending-change records with event IDs and timestamps.
- **Source:** T4: Collect Registrations, Cancellations, and Reminder Responses and the prior reconciled version.

- **If a required input is missing or invalid:** Record the evidence version as incomplete and route the issue to T6: Run Data-Quality Checks and Route Exceptions.

## 3. Outputs

### Output 1

- **Output name:** Reconciled attendance evidence
- **Contents and format:** Versioned canonical records with normalized identifiers, statuses, timestamps, duplicate links, and unresolved findings.
- **Next task or recipient:** T6: Run Data-Quality Checks and Route Exceptions and T7: Establish Baseline and Uncertainty Assumptions.
- **Complete when:** Every input record is assigned a canonical status or an explicit unresolved finding.

## 4. Planned Tools

### Tool 1

- **Tool name:** normalize-attendance-records
- **Input:** Raw attendance records
- **Output:** Reconciled attendance evidence
- **Implementation Route:** File operations and validation functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Apply deterministic normalization and reconciliation rules while preserving the source evidence.
- **Task timeout:** 15 minutes per evidence batch.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive processing failure and write to a new evidence-version ID; do not overwrite a prior version. Hand off if the output version is uncertain.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the batch as unreconciled and route it to T6. Do not pass it as clean evidence.
