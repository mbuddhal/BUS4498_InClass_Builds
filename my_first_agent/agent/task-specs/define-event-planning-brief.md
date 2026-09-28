# Define Event Planning Brief Task Specification

## Basic Information

- **Task ID:** T1
- **Task name:** Define Event Planning Brief
- **Task type:** Decide
- **Task owner:** CPVC event planning coordinator

## 1. Task Description

The coordinator defines and approves the event requirements that control registration, reminders, forecasting, resource categories, and material-change thresholds. Human judgment is required because the event-specific requirements and constraints are not fixed by the system.

## 2. Inputs

### Input 1

- **Input name:** Event planning requirements
- **Contents and format:** Human-provided planning record containing event name, date, start time, venue or delivery mode, capacity, resource categories, registration close, forecast cutoff, reminder schedule, and thresholds.
- **Source:** CPVC event planning coordinator.

- **If a required input is missing or invalid:** Return the brief to the coordinator for clarification; do not open registration. Handoff recipient: CPVC event planning coordinator.

## 3. Outputs

### Output 1

- **Output name:** Approved event brief
- **Contents and format:** Completed structured event record with all required dates, limits, categories, and thresholds.
- **Next task or recipient:** T2: Open Registration and Set Event Window.
- **Complete when:** The coordinator has reviewed and approved every required field.

## 4. Planned Tools

### Tool 1

- **Tool name:** record-event-planning-brief
- **Input:** Event planning requirements
- **Output:** Approved event brief
- **Implementation Route:** File operations or form-recording functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Record the coordinator’s supplied values and return the draft for human approval; it cannot make the decision.
- **Task timeout:** One business day after assignment for the coordinator response.
- **Maximum retries:** Not applicable — manual task.
- **Retry only when:** Not applicable — manual task.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the brief as pending or invalid and hand it to the CPVC event planning coordinator. Do not open registration.
