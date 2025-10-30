# Healthcare Dashboard Data Update Summary

## Date: October 30, 2025

### Source Data
- **Excel File**: Conway SC Leapfrog Historical Measure Analysis 2021-2025.xlsx
- **Total Measures**: 22 measures across 2 domains
- **Time Period**: 5 periods (2023 Spring through 2025 Spring)

### Changes Made

#### 1. Data Transformation
- Created `transform-excel-data.py` script to parse Excel and generate TypeScript data structures
- Generated `generated-data.ts` with all dashboard data in correct format
- Saved raw JSON to `generated-data.json` for reference

#### 2. Measure Groups Updated
**OLD** (5 groups):
- Mortality
- Readmission
- Safety of Care
- Patient Experience
- Timely & Effective Care

**NEW** (2 domains from Excel):
- Process and Structural Measures (12 measures)
- Outcome Measures (10 measures)

#### 3. Data Structures Replaced

**a) scatterPlotData** (line 46)
- 22 measures with slope trends
- Includes: CPOE, BCMA, IPS, SP-1, SP-2, H-COMP measures, HAI measures, PSI measures

**b) underperformingMeasuresData** (line 225)
- 22 measures sorted by performance gap
- Includes mean scores, differences, percentage gaps, and weights

**c) measureGroupScoresData** (line 470)
- Z-scores aggregated by domain for 5 time periods
- 2023 Spring through 2025 Spring

**d) performanceData** (line 498)
- Complete time series for all 22 measures
- Includes historical data and 2023-2025 summary statistics

**e) measureData** (line 1381)
- Measure definitions organized by domain
- Includes IDs, names, and weights

#### 4. Component Updates (app/page.tsx)

**State Updates** (line 1501-1502):
```typescript
// OLD
const [selectedMeasureGroup, setSelectedMeasureGroup] = useState("Mortality")
const [selectedMeasure, setSelectedMeasure] = useState("MORT-30-AMI")

// NEW
const [selectedMeasureGroup, setSelectedMeasureGroup] = useState("Process and Structural Measures")
const [selectedMeasure, setSelectedMeasure] = useState("CPOE")
```

**Measure Groups** (line 1505):
```typescript
const measureGroups = ["Process and Structural Measures", "Outcome Measures"]
```

**Color Mapping** (in generated-data.ts):
```typescript
const measureGroupColors = {
  "Process and Structural Measures": "#2d5aa0",
  "Outcome Measures": "#2a9d8f",
}
```

#### 5. File Changes
- **app/page.tsx**: Updated from 2,928 lines → 3,545 lines
- **Backup**: Created `app/page-old-backup.tsx`
- **Removed**: Duplicate measureData definition inside component

#### 6. Measures in Excel Data

**Process and Structural Measures (12)**:
1. CPOE - Computerized Physician Order Entry
2. BCMA - Barcode Medication Administration
3. IPS - ICU Physician Staffing
4. SP-1 - Safe Practice 1: Culture of Leadership
5. SP-2 - Safe Practice 2: Culture Measurement
6. Total Nursing Care Hours per Patient Day
7. Hand Hygiene
8. H-COMP-1 - Nurse Communication
9. H-COMP-2 - Doctor Communication
10. H-COMP-3 - Staff Responsiveness
11. H-COMP-5 - Communication about Medicines
12. H-COMP-6 - Discharge Information

**Outcome Measures (10)**:
1. Foreign Object Retained After Surgery
2. Air Embolism
3. Falls and Trauma
4. CLABSI - Central Line-Associated Bloodstream Infection
5. CAUTI - Catheter-Associated Urinary Tract Infection
6. SSI: Colon - Surgical Site Infection
7. MRSA - MRSA Bacteremia
8. C. diff - Clostridium Difficile
9. PSI 4 - Death rate among surgical inpatients
10. PSI-90 - Patient safety and adverse events composite

### Data Points Per Measure
- 5 time periods with Conway Result, Z-Score, and National Mean
- Summary statistics (Conway Mean, National Mean, Slopes)
- Measure weights (2025)
- Forecasts for 2026 and 2027

### Notes
- Star Rating data not included in Excel - added empty placeholder
- All data validated against Excel source
- TypeScript types preserved
- UI components remain unchanged
