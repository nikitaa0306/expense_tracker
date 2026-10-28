# Prompt templates

Replace the bracketed placeholders with details from your task. Include relevant file paths, commands, and expected behavior when available.

## New feature

```text
Implement [feature] in [project or area].

Context:
[Describe the existing behavior, users, and relevant files or components.]

Goal:
[Describe what the feature should do and why it is needed.]

Constraints:
- Follow the existing architecture, conventions, and dependencies.
- Keep changes limited to this feature and directly related fixes.
- [Add compatibility, accessibility, performance, or product constraints.]

Acceptance criteria:
- [Write an observable behavior that can be verified by a test.]
- [Write another testable behavior, including relevant edge cases.]
- Add or update tests to verify each criterion.

Examples:
- Given [starting state], when [user action], then [observable result].
- Given [invalid or edge-case input], when [user action], then [observable result].
```

## Bug fix

```text
Fix [brief description of bug] in [project or area].

Context:
- Relevant files or components: [paths or names]
- Current behavior: [what happens]
- Expected behavior: [what should happen]
- Reproduction steps: [minimal steps or input]

Goal:
Identify and fix the root cause while preserving intended behavior.

Constraints:
- Make a focused change; do not modify unrelated behavior.
- Do not hide errors or replace them with success-shaped fallbacks.
- [Add compatibility or implementation constraints.]

Acceptance criteria:
- A test reproduces the old failure and passes with the fix.
- [Add testable requirements for expected behavior and regressions.]

Examples:
- Given [precondition], when [reproduction action], then [expected result].
```

## Refactor

```text
Refactor [component, module, or workflow] in [project].

Context:
[Describe its current responsibilities, dependencies, and pain points.]

Goal:
Improve [clarity, reuse, separation of concerns, or another quality] without changing externally observable behavior.

Constraints:
- Preserve public APIs and user-visible behavior unless explicitly stated.
- Follow established project patterns and avoid unnecessary dependencies.
- Keep the change scoped to [files or boundary].

Acceptance criteria:
- Existing tests for the refactored behavior pass.
- [Add testable criteria for preserved behavior, interfaces, or performance.]
- [Add any required checks, such as lint or build.]

Examples:
- Before: [existing usage or behavior]
- After: [same observable result using the refactored structure]
```

## Generate tests

```text
Write tests for [feature, component, or module].

Context:
- Code under test: [file paths or symbols]
- Test framework and existing test conventions: [details]
- Current coverage or known gaps: [details]

Goal:
Add focused tests that verify behavior, validation, and relevant edge cases.

Constraints:
- Do not change production code unless a test reveals a concrete defect; report that separately.
- Prefer observable outcomes over implementation details.
- Keep tests deterministic and independent of external services unless explicitly required.

Acceptance criteria:
- Tests cover [required behavior].
- Tests cover [invalid input and boundary cases].
- The focused test command [command] passes.

Examples:
- Given [input or state], when [action], then [assertion].
```

## Review diff

```text
Review the current diff for [branch, feature, or change].

Context:
[Describe the intended behavior, important constraints, and relevant areas.]

Goal:
Find actionable correctness, regression, security, or maintainability issues introduced by the diff.

Constraints:
- Review only evidence in the diff and directly relevant context.
- Do not make code changes.
- Report only actionable findings; distinguish confirmed issues from uncertainty.

Acceptance criteria:
- Each finding identifies the file and line, explains the failure scenario, and states its impact.
- Findings are ordered by severity and include confidence.
- If no issues are found, state that explicitly and mention any important validation gaps.

Examples:
- [Severity] [file:line]: [condition] causes [observable failure or impact].
```

## Commit message

```text
Write a commit message for the staged diff.

Context:
- Change purpose: [brief summary]
- Relevant issue or ticket: [identifier, or none]
- Repository commit convention: [format, or infer from recent history]

Goal:
Produce a concise, accurate commit message that describes the change rather than implementation minutiae.

Constraints:
- Do not claim behavior or tests that are not present in the diff.
- Follow the repository's existing commit format.
- Include a body only when it adds useful context.

Acceptance criteria:
- The subject uses the required format and is no longer than [limit] characters.
- The message accurately describes the diff's primary user-visible or technical change.
- Any required issue reference or trailer is included.

Examples:
- [type(scope): summary]
- [Optional body explaining why the change was made]
```

# Five-part prompt: Add an expense

## Context

This is a React expense tracker. The add-expense form is a separate component named `ExpenseForm`, and the parent app displays submitted expenses. An expense has a title, an amount, and one category from `Food`, `Travel`, `Bills`, or `Other`.

## Goal

Implement an accessible add-expense flow. Let the user enter a title, amount, and category, submit a valid expense, and see it added to the expense list.

## Constraints

- Keep the form in a separate `ExpenseForm` component and submit data to its parent through a callback.
- Use the existing React and CSS setup; do not add dependencies.
- Trim whitespace from titles before submission.
- Reject blank or whitespace-only titles and amounts that are missing, non-numeric, zero, or negative.
- On invalid submission, do not add an expense; display an associated, accessible error message.
- On valid submission, clear the form and reset the category to `Food`.
- Keep the layout usable on narrow screens.

## Acceptance criteria

1. Rendering the form exposes labeled title and amount inputs, a category selector, and an add-expense submit button.
2. The category selector contains exactly `Food`, `Travel`, `Bills`, and `Other`, and initially selects `Food`.
3. Submitting title `  Lunch  `, amount `12.5`, and category `Food` calls the parent callback exactly once with `{ title: "Lunch", amount: 12.5, category: "Food" }`.
4. Submitting a title that is empty or contains only whitespace does not call the parent callback and renders a visible validation error.
5. Submitting a missing or non-numeric amount does not call the parent callback and renders a visible validation error.
6. Submitting amount `0` or any negative amount does not call the parent callback and renders a visible validation error.
7. After a valid submission, the title and amount inputs are empty, and the category selector is set to `Food`.
8. Submitting a valid expense through the app causes that expense's title, category, and amount to appear in the rendered expense list, and increments the displayed expense count by one.
9. Each validation error is programmatically associated with the relevant input and announced as an alert.

## Examples

- Given a blank form, when the user enters `Transit pass`, `25`, and `Travel` and submits, then the parent receives `{ title: "Transit pass", amount: 25, category: "Travel" }`.
- Given title `   ` and amount `25`, when the user submits, then no expense is added and the title validation error is shown.
- Given title `Utilities` and amount `-8`, when the user submits, then no expense is added and the amount validation error is shown.
