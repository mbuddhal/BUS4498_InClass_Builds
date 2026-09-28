# Batch New Records and Evaluate Recalculation Triggers Task Specification

## Basic Information

- **Task ID:** T13
- **Task name:** Batch New Records and Evaluate Recalculation Triggers
- **Task type:** Verify
- **Task owner:** CPVC forecasting coordinator

## 1. Task Description

Batch new registrations, cancellations, and reminder responses and evaluate the configured scheduled, material-change, and manual recalculation triggers. The task prevents a forecast run for every individual record.

## 2. Inputs

### Input 1

- **Input name:** Pending attendance changes
- **Contents and format:** Versioned new records, pending-change set, last forecast, scheduled checkpoints, material-change thresholds, and manual requests.
- **Source:** T3: Send Scheduled Reminder and T4: Collect Registrations, Cancellations, and Reminder Responses.

- **If a required input is missing or invalid:** Record the batch as incomplete and route it to T5: Normalize and Reconcile Attendance Records.

## 3. Outputs

### Output 1

- **Output name:** Recalculation decision and pending-change set
- **Contents and format:** Batched records, change metrics, trigger evaluation, queue status, and next checkpoint.
- **Next task or recipient:** T5 when a trigger is met; otherwise the next configured checkpoint or T14 when registration closes.
- **Complete when:** Each pending change is included once and the trigger decision is recorded.

## 4. Planned Tools

### Tool 1

- **Tool name:** evaluate-recalculation-triggers
- **Input:** Pending attendance changes
- **Output:** Recalculation decision and pending-change set
- **Implementation Route:** Database queries and rule-based functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Batch changes, calculate configured metrics, and queue at most one recalculation.
- **Task timeout:** 10 minutes per checkpoint.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive transaction failure before a queue update, using the pending-set version as an idempotency key. Hand off if queue state is uncertain.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the trigger decision as unknown and hand the case to the CPVC forecasting coordinator. Do not silently drop changes or claim a recalculation was queued.
