# Compare Forecast with Actual Attendance Task Specification

## Basic Information

- **Task ID:** T19
- **Task name:** Compare Forecast with Actual Attendance
- **Task type:** Verify
- **Task owner:** CPVC forecasting coordinator

## 1. Task Description

Compare the final point estimate, likely range, buffered quantity, and actual attendance, calculate variance, and document material causes for the learning record.

## 2. Inputs

### Input 1

- **Input name:** Final forecast version
- **Contents and format:** Final estimate, range, buffered quantity, resource quantities, assumptions, and version.
- **Source:** T16: Run Final Forecast at Configured Cutoff and T17: Publish Final Resource Plan and Event-Team Handoff.

### Input 2

- **Input name:** Actual attendance record
- **Contents and format:** Deduplicated attendance count, check-in evidence, timestamps, and data-quality notes.
- **Source:** T18: Capture Event Check-In Data.

- **If a required input is missing or invalid:** Record the comparison as pending and hand it to the CPVC forecasting coordinator; do not calculate unsupported variance.

## 3. Outputs

### Output 1

- **Output name:** Forecast-performance record
- **Contents and format:** Point and range variance, buffered-quantity comparison, actual count, material causes, evidence versions, and limitations.
- **Next task or recipient:** T20: Store Results and Update Future Baseline.
- **Complete when:** Every required comparison is calculated or an explicit limitation is recorded.

## 4. Planned Tools

### Tool 1

- **Tool name:** compare-attendance-results
- **Input:** Final forecast version; Actual attendance record
- **Output:** Forecast-performance record
- **Implementation Route:** Functions/scripts and file operations.
- **Integration approach:** Direct integration.
- **Role in this task:** Calculate reproducible variance metrics and preserve material-cause notes.
- **Task timeout:** 15 minutes per event record.
- **Maximum retries:** 0
- **Retry only when:** Not applicable — retries are not permitted; corrected inputs require a new comparison version.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record comparison as incomplete and hand it to the CPVC forecasting coordinator. Do not update the baseline.
