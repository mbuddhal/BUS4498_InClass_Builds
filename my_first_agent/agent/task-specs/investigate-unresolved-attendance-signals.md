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
- **What it contains:** Approved evidence sources, a maximum of three checks across the entire task, and a five-minute time limit.
- **Source:** Workflow configuration.

## 3. Tool Permissions and Boundaries

- Use only the supplied evidence and the approved checks described below.
- Do not contact registrants, change attendance records, approve or replace a baseline, or produce the final forecast.
- Record the evidence version used, the check performed, the finding, and the effect on each unresolved signal after every check.
- Do not infer a response from reminder delivery, fill gaps with unsupported assumptions, or treat a documented disposition as proof that a material issue is resolved.

## 4. How the Agent Should Reason

The agent must choose its next permitted subtask from the current unresolved signals and intermediate findings. It may skip, repeat, or combine permitted subtasks, but it must not follow a fixed sequence. It may not contact registrants, change attendance records, approve a baseline, or produce the final forecast.

### Material unresolved signals

An unresolved signal is **material** when resolving it could change the expected attendance estimate, the forecast range, the confidence in that estimate, or the decision T9 is expected to make. A signal is also material when it identifies a potentially attendance-impacting record, conflict, or data-quality problem that cannot be supported by the supplied evidence.

A signal is not material when the supplied evidence establishes that it has no attendance impact—for example, a duplicate with a confirmed canonical record—or when it has already been reconciled with sufficient supporting evidence. When materiality cannot be determined from the permitted evidence, treat the signal as material and either investigate it or escalate it.

### Evidence needed for T9

The evidence summary is sufficient for T9 only when, for every material signal, it records:

- the signal and the evidence version reviewed;
- the supported disposition or the remaining uncertainty;
- the evidence supporting that disposition, including relevant timestamps or record relationships;
- the expected effect on attendance, range, or confidence; and
- any limitation that T9 must account for.

A disposition label by itself is not sufficient. If a material signal still requires human judgment, lacks evidence needed to assess its attendance impact, or could change the estimate or range, the case must be escalated even if a disposition has been documented.

### Permitted Subtask 1

- **Subtask name:** Inspect registration evidence
- **Subtask description:** Examine registration status, timestamps, duplicates, and unanswered records to identify evidence that changes expected attendance.
- **Subtask boundary:** Use only the supplied registration records; do not edit them or infer facts not supported by the records.
- **Retry limits:** One attempt per evidence version. Each attempt consumes one check from the global three-check limit.

### Permitted Subtask 2

- **Subtask name:** Inspect cancellation and reminder evidence
- **Subtask description:** Compare cancellations and reminder responses with registration status to identify likely attendance changes or unresolved responses.
- **Subtask boundary:** Use only supplied cancellation and reminder records; do not send messages or treat reminder delivery as a response.
- **Retry limits:** One attempt per evidence version. Each attempt consumes one check from the global three-check limit.

### Permitted Subtask 3

- **Subtask name:** Inspect historical attendance evidence
- **Subtask description:** Compare the current event pattern with prior attendance results to assess whether the approved baseline remains appropriate.
- **Subtask boundary:** Use only approved historical evidence; do not replace the approved baseline or make the final forecast.
- **Retry limits:** One attempt per evidence version. Each attempt consumes one check from the global three-check limit.

### Choosing and counting checks

- The three-check limit is a single global budget for T8. It applies across all three subtasks, including skipped-and-returned-to subtasks, repeated subtasks, retries, combined subtasks, and checks performed after a new evidence version is supplied.
- A check is one execution of a permitted subtask against one identified evidence version. Repeating a subtask against the same evidence version is not allowed under the retry rule. Running it against a new evidence version is a new check and consumes another unit of the global budget.
- A combined operation counts as one check only when it is one bounded execution against one evidence version and the findings are recorded together. If a combined operation uses multiple evidence versions or requires separate executions, count each evidence-version execution as a separate check.
- Maintain a check ledger with the check number, subtask, evidence version, and result. Stop before any additional check once the ledger reaches three.
- After each check, use its findings to select the permitted subtask most likely to resolve the most important remaining material uncertainty. Checks may investigate conflicts or gaps when the supplied evidence or another permitted source can resolve them; do not hand off solely because a signal is initially uncertain.
- If no permitted subtask can make useful progress, stop and hand the case to a person.

## 5. When to Stop or Hand Off to a Human

- **Stop successfully when:** Every material unresolved signal is either resolved with supporting evidence or shown to be immaterial, and the evidence summary is sufficient for T9 to produce a supported estimate and range. A documented disposition without supporting evidence does not satisfy this condition.
- **Hand off after permitted investigation when:** A material conflict remains after the available permitted checks have been used, required information is absent from all supplied and approved sources, or resolving the issue requires human judgment, a policy choice, an external contact, a record change, baseline approval, or another action outside the permitted subtasks.
- **Hand off immediately when:** The five-minute time limit expires, the global three-check limit is reached, or the task encounters a safety or authorization boundary. The agent must not begin another check after a limit is reached.
- **Hand off to:** H0: Coordinator reviews unresolved evidence.

When evidence conflicts or information is missing, first determine whether the permitted checks can reconcile the conflict or locate the missing information in an approved source. Escalate only when those checks cannot resolve the issue within the remaining budget, or when the remaining resolution requires human judgment. While awaiting review, take no further autonomous action.

## 6. Outbound Deliverable

- **Status:** Completed or escalated to human.
- **Result or recommendation:** Evidence sufficient for T9, or undetermined if escalated.
- **Evidence summary:** Findings from the checks performed and their effect on each material and non-material unresolved signal.
- **Subtasks performed:** The permitted subtasks completed, including repeated attempts and the evidence version used for each.
- **Check ledger:** Every check counted toward the three-check global limit, including combined checks and checks on new evidence versions.
- **Unresolved issues:** Remaining uncertainty, conflicts, missing evidence, and whether each issue is material.
- **Handoff note:** Reason for escalation and the decision H0 must make; write “Not applicable” when completed.
- **Next task or recipient:** T9, or H0 when escalated.
