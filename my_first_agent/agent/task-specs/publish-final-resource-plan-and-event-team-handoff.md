# Publish Final Resource Plan and Event-Team Handoff Task Specification

## Basic Information

- **Task ID:** T17
- **Task name:** Publish Final Resource Plan and Event-Team Handoff
- **Task type:** Act
- **Task owner:** CPVC event planning coordinator

## 1. Task Description

Publish the coordinator-approved final quantities, assumptions, roster version, and exception notes to authorized event staff so the plan can be executed before the event. Publication is permitted only after final H1 approval of the exact T16 forecast version and before the configured approval deadline.

## 2. Inputs

### Input 1

- **Input name:** Approved final resource plan
- **Contents and format:** Approved final forecast version matching T16 exactly, H1 approval identity and timestamp, quantities, assumptions, roster version, and exception notes.
- **Source:** H1: Coordinator Reviews Forecast and Resource Plan.

- **If a required input is missing, mismatched, late, or invalid:** Keep the plan unpublished and return it to H1 for correction or explicit coordinator escalation.

## 3. Outputs

### Output 1

- **Output name:** Event-day operational handoff
- **Contents and format:** Published plan, authorized recipient list, version, publication timestamp, assumptions, and exception notes.
- **Next task or recipient:** Authorized event staff and T18: Capture Event Check-In Data.
- **Complete when:** Authorized staff can access the approved version and publication is recorded.

## 4. Planned Tools

### Tool 1

- **Tool name:** publish-resource-plan
- **Input:** Approved final resource plan
- **Output:** Event-day operational handoff
- **Implementation Route:** File operations or authorized web API calls.
- **Integration approach:** Direct integration.
- **Role in this task:** Publish the exact approved version to authorized staff and record delivery.
- **Task timeout:** 10 minutes per approved version.
- **Maximum retries:** 1
- **Retry only when:** Retry only after a definitive publication failure using forecast version and event ID as an idempotency key. If delivery is uncertain, verify access before retrying.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the handoff as unpublished or uncertain and hand the case to H1. Do not treat the plan as operational.
