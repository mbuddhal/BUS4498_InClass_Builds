# Workflow of Tasks

*Replace all bracketed prompts with information specific to your proposed system. Delete instructional text that does not belong in your final specification. Add or remove task sections as needed. Every task shown in the general workflow must have a corresponding task specification below.*

## 1. Workflow Overview
### 1.1 Workflow Goal
This workflow supports the system goal defined in `my_first_agent/README.md`.

### 1.2 Workflow Trigger

The workflow starts when CPVC creates an AI Hackathon event and opens registration. It then updates as registrations, cancellations, and reminder responses change, with a final attendance forecast generated before the event.

### 1.3 Completion Condition at Runtime

A run is complete when the system has processed the latest registration, cancellation, reminder, and prior attendance data, generated an attendance forecast with a safety buffer, and provided the recommended quantities for food, drinks, and swag to CPVC organizers.

### 1.4 General Workflow

CPVC creates an event through T1: Define Event Planning Brief, opens registration with T2, and collects registrations, cancellations, and reminder responses through T3. T4: Normalize and Reconcile Attendance Records checks for duplicates, missing information, and conflicting records. If issues exist, T5: Run standard data-quality checks and route exceptions. T6: Establish Baseline and Uncertainty Assumptions applies the historical 40 percent baseline when needed.

T7: Investigate Unresolved Attendance Signals uses a bounded AI agent to choose the next approved attendance-data check based on what issues it finds. The agent can review registration, cancellation, reminder, or historical evidence, but it must stay within its check/time limit and hand unresolved cases to a coordinator. T8: Produce Attendance Estimate and Likely Range creates the forecast, followed by T9: Add Safety Buffer and T10: Calculate Food, Drink, and Swag Quantities.

A coordinator reviews the plan through H1. If changes are needed, T11: Record Coordinator Override and Revise Plan updates it. While registration remains open, T12: Monitor New Registrations and Reminder Responses sends new information back to T4. After the event, T13: Capture Event Check-In Data, T14: Compare Forecast with Actual Attendance, and T15: Store Results and Update Future Baseline complete the workflow.

### 1.5 Workflow Diagram

```mermaid
flowchart TD
    S([Start: CPVC creates AI Hackathon event])

    S --> T1["T1: Define event planning brief"]
    T1 --> T2["T2: Open registration and set event window"]
    T2 --> T3["T3: Collect registrations, cancellations, and reminder responses"]

    T3 --> T4["T4: Normalize and reconcile attendance records"]
    T4 --> D1{"D1: Are records complete and consistent?"}

    D1 -->|No| T5["T5: Resolve data issues or flag missing evidence"]
    T5 --> D2{"D2: Can the issue be corrected before forecasting?"}
    D2 -->|Yes| T3
    D2 -->|No| T6["T6: Establish baseline and uncertainty assumptions"]

    D1 -->|Yes| T6
    T6 --> T7A

    subgraph T7["T7: Investigate attendance signals"]
        T7A["Choose next approved evidence check"]
        T7A --> T7B["Inspect registration, cancellation, reminder, or historical evidence"]
        T7B --> T7C["Update evidence summary and remaining uncertainty"]
        T7C --> D3{"Is the evidence sufficient for a supported forecast?"}
        D3 -->|No, another useful check remains| T7A
    end

    D3 -->|Yes| T8["T8: Produce attendance estimate and likely range"]
    D3 -->|No useful check or budget exhausted| H0["H0: Coordinator reviews unresolved evidence"]

    H0 -->|Resolved or baseline approved| T8
    H0 -->|Still unresolved| C2([C2: Forecast deferred for human decision])

    T8 --> T9["T9: Add safety buffer"]
    T9 --> T10["T10: Calculate food, drink, and swag quantities"]

    T10 --> H1["H1: Coordinator reviews forecast and resource plan"]
    H1 --> D4{"D4: Approve resource plan?"}

    D4 -->|No| T11["T11: Record coordinator override and revise plan"]
    T11 --> H1

    D4 -->|Yes| D5{"D5: Is the event canceled?"}
    D5 -->|Yes| C3([C3: Workflow stopped])
    D5 -->|No| D6{"D6: Is registration still open?"}

    D6 -->|Yes| T12["T12: Monitor new registrations and reminder responses"]
    T12 --> T4

    D6 -->|No| T13["T13: Capture event check-in data"]
    T13 --> T14["T14: Compare forecast with actual attendance"]
    T14 --> T15["T15: Store results and update future baseline"]
    T15 --> C1([C1: Forecast and learning record stored])
```
