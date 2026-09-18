# Investigate unresolved attendance signals Task Specification

```yaml
# BASIC INFORMATION
task_id: "T8"
task_name: "Investigate unresolved attendance signals"
task_owner: "CPVC event planning coordinator"
```

## 1. Task Goal

- **Objective:** Resolve important attendance uncertainties or produce an evidence summary that supports the next forecasting decision.

## 2. Inbound Inputs

### Input 1

- **Input name:** Reconciled attendance evidence
- **What it contains:** Current registrations, cancellations, reminder responses, unanswered records, timestamps, and data-quality findings.
- **Source:** T5 and T6.

### Input 2

- **Input name:** Historical attendance evidence
- **What it contains:** Prior event attendance results and the approved baseline used for comparison.
- **Source:** T7.

### Input 3

- **Input name:** Investigation limits
- **What it contains:** Approved evidence sources, maximum of three checks, and a five-minute time limit.
- **Source:** Workflow configuration.

## 3. Tool Permissions and Boundaries

## 4. How the Agent Should Reason

The agent must choose its next permitted subtask from the current unresolved signals and intermediate findings. It may skip, repeat, or combine permitted subtasks, but it must not follow a fixed sequence. It may not contact registrants, change attendance records, approve a baseline, or produce the final forecast.

### Permitted Subtask 1

- **Subtask name:** Inspect registration evidence
- **Subtask description:** Examine registration status, timestamps, duplicates, and unanswered records to identify evidence that changes expected attendance.
- **Subtask boundary:** Use only the supplied registration records; do not edit them or infer facts not supported by the records.
- **Retry limits:** One attempt per evidence version.

### Permitted Subtask 2

- **Subtask name:** Inspect cancellation and reminder evidence
- **Subtask description:** Compare cancellations and reminder responses with registration status to identify likely attendance changes or unresolved responses.
- **Subtask boundary:** Use only supplied cancellation and reminder records; do not send messages or treat reminder delivery as a response.
- **Retry limits:** One attempt per evidence version.

### Permitted Subtask 3

- **Subtask name:** Inspect historical attendance evidence
- **Subtask description:** Compare the current event pattern with prior attendance results to assess whether the approved baseline remains appropriate.
- **Subtask boundary:** Use only approved historical evidence; do not replace the approved baseline or make the final forecast.
- **Retry limits:** One attempt per evidence version.

**Decision guidance:** After each subtask, use its findings to select the permitted subtask most likely to resolve the most important remaining uncertainty. Do not follow a fixed sequence. If no permitted subtask can make useful progress, stop and hand the case to a person.

## 5. When to Stop or Hand Off to a Human

- **Stop successfully when:** Every material unresolved signal has a documented disposition, or the evidence summary is sufficient for T9 to produce a supported estimate and range.
- **Hand off early when:** The three-check limit or five-minute limit is reached, evidence conflicts, required information is missing, or the issue requires a decision outside the permitted subtasks.
- **Hand off to:** H0: Coordinator reviews unresolved evidence.

Stop at the first applicable budget limit or handoff condition. While awaiting review, take no further autonomous action.

## 6. Outbound Deliverable

- **Status:** Completed or escalated to human.
- **Result or recommendation:** Evidence sufficient for T9, or undetermined if escalated.
- **Evidence summary:** Findings from the checks performed and their effect on remaining uncertainty.
- **Subtasks performed:** The permitted subtasks completed, including repeated attempts.
- **Unresolved issues:** Remaining uncertainty, conflicts, or missing evidence.
- **Handoff note:** Reason for escalation and the decision H0 must make; write “Not applicable” when completed.
- **Next task or recipient:** T9, or H0 when escalated.
