# QueryAI — Architectural & Product Decisions

## Why this product?
QueryAI solves the fundamental barrier between raw data and actionable clarity: **friction**. 

Traditional analytics force teams into one of two painful paths:
1. **For non-technical business users**: Waiting days in BI ticket queues or manually fighting Excel pivot tables.
2. **For technical data analysts**: Answering repetitive ad-hoc SQL questions and formatting charts instead of high-value modeling.

QueryAI transforms this by allowing users to **"Ask your data anything."** A user simply drops in a dataset and asks natural-language questions. QueryAI handles the column correlation, aggregation, and visualization automatically, delivering plain-English answers, animated charts, and decision-ready key insights in seconds.

---

## Upgrade Decisions & Functional Architecture

1. **Client-Side CSV Upload & Inspection Engine (`src/utils/csvParser.js`)**:
   - Implemented an in-browser CSV parsing engine that extracts row count, column count, detected data types (Numeric, Text, Date), missing values percentage, and duplicate rows count.
   - Computes a dynamic **Dataset Health Score (0-100%)** and actionable recommendation string.

2. **Dataset Overview & Data Health Panel (`src/components/DatasetOverview.jsx` & `src/components/DataHealth.jsx`)**:
   - Displays real-time inspection metrics formatted to match QueryAI's existing dark theme design language.
   - Clearly labels default sample data as **Demo Dataset** and uploaded files as **Uploaded Dataset**.

3. **Natural-Language Query Engine & Error Fallback**:
   - Local engine recognizes query patterns for highest/lowest, totals/sums, averages, counts, trend over time, and category breakdowns.
   - Provides a friendly fallback guidance message for uninterpretable queries: *"I couldn't confidently interpret that question. Try asking about trends, comparisons, averages, totals, or top-performing categories."*

4. **Chart / Grid / SQL Views & ✨ Explain This Chart (`src/components/ChartExplanation.jsx`)**:
   - **Chart**: Renders interactive bar, line, pie, or metric visualization.
   - **Grid**: Shows underlying query result table with 1-click **Export CSV Grid**.
   - **SQL**: Displays generated SQL equivalent with 1-click **Copy SQL** functionality.
   - **✨ Explain This Chart**: Toggles a 3-part breakdown (*What you're seeing*, *What stands out*, *Explore next*).

5. **Suggested Follow-Up Questions & Session History (`src/components/AnalysisHistory.jsx`)**:
   - Dynamically generates 2–4 clickable follow-up questions after every analysis.
   - Session history panel tracks past queries and restores previous states on click.

6. **Dataset Filters & Automatic Dashboard Generator (`src/components/Filters.jsx` & `src/components/DashboardGenerator.jsx`)**:
   - Column-based dropdown filters dynamically recalculate health, row subsets, and charts.
   - **Generate Dashboard** action builds a multi-widget dashboard tailored to the active dataset.

---

## Trade-offs & Future Scope

* **In-Browser Execution**: All processing runs client-side in JavaScript without external backend APIs or keys.
* **What would be improved with another week**:
  - **In-Browser DuckDB-Wasm Integration**: Compile DuckDB to WebAssembly for complex SQL multi-table joins.
  - **Custom Chart Export**: Render charts to high-resolution PNG/SVG images.

---

## AI Tool Usage Disclosure

* **AI Assistance**: AI tools were utilized to accelerate component scaffolding and logic assembly.
* **Human Oversight & Refinement**: Every component architecture, visual layout, responsive breakpoint (390px mobile and 1440px desktop), color contrast audit, micro-interaction state logic, and documentation deliverable was personally reviewed, engineered, and polished.
