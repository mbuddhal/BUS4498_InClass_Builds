# Coordinator Reviews Forecast and Resource Plan Task Specification

## Basic Information

- **Task ID:** H1
- **Task name:** Coordinator Reviews Forecast and Resource Plan
- **Task type:** Decide
- **Task owner:** CPVC event planning coordinator

## 1. Task Description

The coordinator reviews the attendance forecast, safety buffer, resource quantities, assumptions, exception notes, and review context. H1 is used for both interim planning reviews and the final T16 approval gate. For the final gate, approval must name the exact forecast version and be recorded before the configured deadline and within the maximum revision-round limit. The coordinator approves publication or records an override through T12; approval is required before the final handoff.

## 2. Inputs

### Input 1

- **Input name:** Forecast and resource plan
- **Contents and format:** Versioned estimate, likely range, buffered attendance, food/drink/swag quantities, assumptions, evidence limitations, unresolved issues, review context, revision round, configured final-approval deadline, and maximum revision rounds.
- **Source:** T11: Calculate Food, Drink, and Swag Quantities or T16: Run Final Forecast at Configured Cutoff.

- **If a required input is missing or invalid:** Return the plan to the sending task for correction and do not publish it.

## 3. Outputs

### Output 1

- **Output name:** Coordinator approval or override
- **Contents and format:** Approval naming the exact forecast version with coordinator identity and timestamp, or a reasoned override containing revised values and affected outputs.
- **Next task or recipient:** T17: Publish Final Resource Plan and Event-Team Handoff after final approval, or T12: Record Coordinator Override and Revise Plan while the deadline and revision limit remain.
- **Complete when:** The coordinator’s decision and receiving route are recorded against the reviewed plan version. Silence, timeout, a missed deadline, or an exhausted revision limit never counts as approval.

## 4. Decision Guardrails

- Every final approval must reference the exact T16 forecast version being published.
- T12 may create another revision only when the current time is before the configured final-approval deadline and the revision count is below the maximum.
- If either limit is reached, keep the plan unpublished and route it to the CPVC event planning coordinator for an explicit decision.

## 5. Planned Tools

### Tool 1

- **Tool name:** present-forecast-resource-plan
- **Input:** Forecast and resource plan
- **Output:** Coordinator approval or override
- **Implementation Route:** File operations or review-queue functions.
- **Integration approach:** Direct integration.
- **Role in this task:** Present the plan and record the coordinator’s decision; it cannot approve or override autonomously.
- **Task timeout:** One business day after assignment for coordinator response.
- **Maximum retries:** Not applicable — manual task.
- **Retry only when:** Not applicable — manual task.
- **On timeout, exhausted retries, or an error that cannot be retried:** Keep the plan unpublished and route it to the CPVC event planning coordinator for follow-up. Do not treat silence as approval.
