# Calculate Food, Drink, and Swag Quantities Task Specification

## Basic Information

- **Task ID:** T11
- **Task name:** Calculate Food, Drink, and Swag Quantities
- **Task type:** Act
- **Task owner:** CPVC event planning coordinator

## 1. Task Description

Convert buffered planning attendance into category-specific food, drink, and swag quantities using approved per-person, packaging, minimum-order, and constraint rules.

## 2. Inputs

### Input 1

- **Input name:** Buffered planning attendance
- **Contents and format:** Versioned buffered attendance quantity and calculation.
- **Source:** T10: Add Safety Buffer.

### Input 2

- **Input name:** Resource quantity rules
- **Contents and format:** Per-person quantities, packaging or minimum-order rules, and category-specific constraints.
- **Source:** T1: Define Event Planning Brief and approved procurement rules.

- **If a required input is missing or invalid:** Record quantities as pending and hand the case to H1: Coordinator Reviews Forecast and Resource Plan.

## 3. Outputs

### Output 1

- **Output name:** Resource plan for food, drinks, and swag
- **Contents and format:** Quantity by category, rounding rule, assumptions, forecast version, and exceptions.
- **Next task or recipient:** H1: Coordinator Reviews Forecast and Resource Plan.
- **Complete when:** Every category has a calculated quantity or an explicit exception for coordinator review.

## 4. Planned Tools

### Tool 1

- **Tool name:** calculate-resource-quantities
- **Input:** Buffered planning attendance; Resource quantity rules
- **Output:** Resource plan for food, drinks, and swag
- **Implementation Route:** Functions/scripts using approved procurement formulas.
- **Integration approach:** Direct integration.
- **Role in this task:** Calculate and round category quantities and identify rule exceptions.
- **Task timeout:** 10 minutes per forecast version.
- **Maximum retries:** 0
- **Retry only when:** Not applicable — retries are not permitted; use a new version after corrected inputs.
- **On timeout, exhausted retries, or an error that cannot be retried:** Record the resource plan as incomplete and hand it to H1. Do not publish quantities.
