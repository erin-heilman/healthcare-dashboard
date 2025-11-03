"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, Star } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts"

// Star Rating Component
const StarRating = ({ rating, total = 5 }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: total }, (_, index) => (
        <Star
          key={index}
          className={`w-8 h-8 ${
            index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

// Data auto-generated from Conway SC Leapfrog Historical Measure Analysis 2021-2025.xlsx
// Generated on: Thu Oct 30 06:41:49 EDT 2025

// Measure Group Scores by Period (Z-scores averaged by domain)
const measureGroupScoresData = [
  {
    year: "2023 Spring",
    "Process and Structural Measures": -0.63,
    "Outcome Measures": 0.23,
  },
  {
    year: "2023 Fall",
    "Process and Structural Measures": 0.18,
    "Outcome Measures": 0.23,
  },
  {
    year: "2024 Spring",
    "Process and Structural Measures": 0.52,
    "Outcome Measures": -0.09,
  },
  {
    year: "2024 Fall",
    "Process and Structural Measures": 0.39,
    "Outcome Measures": -0.24,
  },
  {
    year: "2025 Spring",
    "Process and Structural Measures": 0.36,
    "Outcome Measures": -0.08,
  },
]

// Add the scatter plot data
const scatterPlotData = [
  {
    measureGroup: "Mortality",
    measureCategory: "AMI Hospital Care",
    measureId: "MORT-30-AMI",
    measureName: "Acute Myocardial Infarction (AMI) 30-Day Mortality Rate",
    conwaySlope: 0.002,
    nationalSlope: -0.001,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "AMI Hospital Care",
    measureId: "EDAC-30-AMI",
    measureName: "Excess Days in Acute Care after Hospitalization for Acute Myocardial Infarction",
    conwaySlope: 2.682,
    nationalSlope: -0.356,
  },
  {
    measureGroup: "Mortality",
    measureCategory: "CABG Hospital Care",
    measureId: "MORT-30-CABG",
    measureName: "Coronary Artery Bypass Graft (CABG) 30-Day Mortality Rate",
    conwaySlope: 0.0,
    nationalSlope: -0.005,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "CABG Hospital Care",
    measureId: "READM-30-CABG",
    measureName: "Coronary Artery Bypass Graft (CABG) 30-Day Readmission Rate",
    conwaySlope: -0.002,
    nationalSlope: -0.004,
  },
  {
    measureGroup: "Mortality",
    measureCategory: "COPD Hospital Care",
    measureId: "MORT-30-COPD",
    measureName: "Chronic Obstructive Pulmonary Disease (COPD) 30-Day Mortality Rate",
    conwaySlope: -0.001,
    nationalSlope: 0.002,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "COPD Hospital Care",
    measureId: "READM-30-COPD",
    measureName: "Chronic Obstructive Pulmonary Disease (COPD) 30-Day Readmission Rate",
    conwaySlope: 0.001,
    nationalSlope: -0.001,
  },
  {
    measureGroup: "Mortality",
    measureCategory: "Heart Failure Hospital Care",
    measureId: "MORT-30-HF",
    measureName: "Heart Failure (HF) 30-Day Mortality Rate",
    conwaySlope: 0.003,
    nationalSlope: 0.0,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Heart Failure Hospital Care",
    measureId: "EDAC-30-HF",
    measureName: "Excess Days in Acute Care after Hospitalization for Heart Failure",
    conwaySlope: -4.468,
    nationalSlope: -0.146,
  },
  {
    measureGroup: "Mortality",
    measureCategory: "Pneumonia Hospital Care",
    measureId: "MORT-30-PN",
    measureName: "Pneumonia (PN) 30-Day Mortality Rate",
    conwaySlope: -0.002,
    nationalSlope: 0.004,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Pneumonia Hospital Care",
    measureId: "EDAC-30-PN",
    measureName: "Excess Days in Acute Care after Hospitalization for Pneumonia (PN)",
    conwaySlope: 3.568,
    nationalSlope: 0.122,
  },
  {
    measureGroup: "Mortality",
    measureCategory: "Stroke Hospital Care",
    measureId: "MORT-30-STK",
    measureName: "Acute Ischemic Stroke (STK) 30-Day Mortality Rate",
    conwaySlope: 0.006,
    nationalSlope: -0.001,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Stroke Hospital Care",
    measureId: "READM-30-STK",
    measureName: "Stroke (STK) 30-Day Readmission Rate",
    conwaySlope: 0.012,
    nationalSlope: 0.012,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Outcomes & Readmissions for Elective THA/TKA",
    measureId: "READM-30-Hip-Knee",
    measureName:
      "Hospital-Level 30-Day All-Cause Risk- Standardized Readmission Rate (RSRR) Following Elective Total Hip Arthroplasty (THA)/Total Knee Arthroplasty (TKA)",
    conwaySlope: 0.0,
    nationalSlope: 0.001,
  },
  {
    measureGroup: "Safety of Care",
    measureCategory: "Outcomes & Readmissions for Elective THA/TKA",
    measureId: "COMP-HIP-KNEE",
    measureName:
      "Hospital-Level Risk-Standardized Complication Rate (RSCR) Following Elective Primary Total Hip Arthroplasty (THA) and Total Knee Arthroplasty (TKA)",
    conwaySlope: -0.001,
    nationalSlope: 0.001,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Readmission After Visit or Surgery Inpatient & Outpatient",
    measureId: "READM-30-HOSP-WIDE",
    measureName: "HWR Hospital-Wide All-Cause Unplanned Readmission",
    conwaySlope: -0.001,
    nationalSlope: 0.122,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Readmission After Visit or Surgery Inpatient & Outpatient",
    measureId: "OP-32",
    measureName: "Facility Seven-Day Risk-Standardized Hospital Visit Rate after Outpatient Colonoscopy",
    conwaySlope: -0.216,
    nationalSlope: -0.43,
  },
  {
    measureGroup: "Mortality",
    measureCategory: "Readmission After Visit or Surgery Inpatient & Outpatient",
    measureId: "PSI 04",
    measureName: "Death Rate Among Surgical Inpatients with Serious Treatable Complications",
    conwaySlope: 0.00113,
    nationalSlope: 0.00137,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Readmission After Visit or Surgery Inpatient & Outpatient",
    measureId: "OP-36",
    measureName: "Hospital Visits after Hospital Outpatient Surgery",
    conwaySlope: -0.05,
    nationalSlope: 0.004,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Readmissions & ED Visits for Chemo Patients",
    measureId: "OP-35 ADM",
    measureName: "Admissions for Patients Receiving Outpatient Chemotherapy",
    conwaySlope: -0.67,
    nationalSlope: -0.591,
  },
  {
    measureGroup: "Readmission",
    measureCategory: "Readmissions & ED Visits for Chemo Patients",
    measureId: "OP-35 ED",
    measureName: "Emergency Department (ED) Visits for Patients Receiving Outpatient Chemotherapy",
    conwaySlope: -0.23,
    nationalSlope: -0.175,
  },
  {
    measureGroup: "Safety of Care",
    measureCategory: "Infections / Safety Events in a Hospital",
    measureId: "HAI-1",
    measureName: "Central-Line Associated Bloodstream Infection (CLABSI)",
    conwaySlope: 0.05,
    nationalSlope: 0.011,
  },
  {
    measureGroup: "Safety of Care",
    measureCategory: "Infections / Safety Events in a Hospital",
    measureId: "HAI-2",
    measureName: "Catheter-Associated Urinary Tract Infection (CAUTI)",
    conwaySlope: -0.001,
    nationalSlope: -0.032,
  },
  {
    measureGroup: "Safety of Care",
    measureCategory: "Infections / Safety Events in a Hospital",
    measureId: "HAI-3",
    measureName: "Surgical Site Infection from Colon Surgery (SSI-colon)",
    conwaySlope: 0.007,
    nationalSlope: 0.002,
  },
  {
    measureGroup: "Safety of Care",
    measureCategory: "Infections / Safety Events in a Hospital",
    measureId: "HAI-4",
    measureName: "Surgical Site Infection from Abdominal Hysterectomy (SSI-abdominal hysterectomy)",
    conwaySlope: -0.036,
    nationalSlope: 0.03,
  },
  {
    measureGroup: "Safety of Care",
    measureCategory: "Infections / Safety Events in a Hospital",
    measureId: "HAI-5",
    measureName: "MRSA Bacteremia",
    conwaySlope: -0.468,
    nationalSlope: -0.006,
  },
  {
    measureGroup: "Safety of Care",
    measureCategory: "Infections / Safety Events in a Hospital",
    measureId: "HAI-6",
    measureName: "Clostridium Difficile (C.difficile)",
    conwaySlope: -0.13,
    nationalSlope: -0.051,
  },
  {
    measureGroup: "Safety of Care",
    measureCategory: "Infections / Safety Events in a Hospital",
    measureId: "PSI-90-Safety",
    measureName: "Patient Safety and Adverse Events Composite",
    conwaySlope: 0.039,
    nationalSlope: 0.001,
  },
  {
    measureGroup: "Patient Experience",
    measureCategory: "Hospital Discharge Experience",
    measureId: "H-COMP-6",
    measureName: "Discharge Information",
    conwaySlope: 0.0,
    nationalSlope: 0.046,
  },
  {
    measureGroup: "Patient Experience",
    measureCategory: "Hospital Discharge Experience",
    measureId: "H-COMP-7",
    measureName: "HCAHPS 3 Item Care Transition Measure",
    conwaySlope: 0.0,
    nationalSlope: -0.017,
  },
  {
    measureGroup: "Patient Experience",
    measureCategory: "Facility Perception in the Patient View",
    measureId: "H-CLEAN-HSP / H-QUIET-HSP",
    measureName: "Cleanliness and Quietness of Hospital Environment",
    conwaySlope: -0.25,
    nationalSlope: -0.003,
  },
  {
    measureGroup: "Patient Experience",
    measureCategory: "Communication from the Patient's View",
    measureId: "H-COMP-1",
    measureName: "Nurse Communication",
    conwaySlope: 0.0,
    nationalSlope: -0.058,
  },
  {
    measureGroup: "Patient Experience",
    measureCategory: "Communication from the Patient's View",
    measureId: "H-COMP-2",
    measureName: "Doctor Communication",
    conwaySlope: 0.0,
    nationalSlope: 0.098,
  },
  {
    measureGroup: "Patient Experience",
    measureCategory: "Communication from the Patient's View",
    measureId: "H-COMP-3",
    measureName: "Responsiveness of Hospital Staff",
    conwaySlope: -0.1,
    nationalSlope: -0.007,
  },
  {
    measureGroup: "Patient Experience",
    measureCategory: "Communication from the Patient's View",
    measureId: "H-COMP-5",
    measureName: "Communication About Medicines",
    conwaySlope: 0.2,
    nationalSlope: 0.016,
  },
  {
    measureGroup: "Patient Experience",
    measureCategory: "Communication from the Patient's View",
    measureId: "H-HSP-RATING / H-RECMND",
    measureName: "Overall Rating of Hospital",
    conwaySlope: 0.0,
    nationalSlope: 0.014,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Immunization Rates of Healthcare Professionals",
    measureId: "HCP COVID-19",
    measureName: "COVID-19 Vaccination Coverage Among HCP",
    conwaySlope: -0.447,
    nationalSlope: -0.377,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Immunization Rates of Healthcare Professionals",
    measureId: "IMM-3/OP-27",
    measureName: "Healthcare Personnel Influenza Vaccination",
    conwaySlope: 0.004,
    nationalSlope: 0.005,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Imaging Use in the Outpatient Setting",
    measureId: "OP-8",
    measureName: "MRI Lumbar Spine for Low Back Pain",
    conwaySlope: -0.01,
    nationalSlope: -0.002,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Imaging Use in the Outpatient Setting",
    measureId: "OP-10",
    measureName: "Abdomen CT Use of Contrast Material",
    conwaySlope: -0.002,
    nationalSlope: -0.003,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Imaging Use in the Outpatient Setting",
    measureId: "OP-13",
    measureName: "Cardiac Imaging for Preoperative Risk Assessment for Non-Cardiac Low-Risk Surgery",
    conwaySlope: -0.002,
    nationalSlope: -0.002,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Wait Times in the ED",
    measureId: "OP-22",
    measureName: "ED-Patient Left Without Being Seen",
    conwaySlope: 0.003,
    nationalSlope: 0.002,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Wait Times in the ED",
    measureId: "OP-18b/ED-3",
    measureName: "Median Time from ED Arrival to ED Departure for Discharged ED Patients",
    conwaySlope: 0.0973,
    nationalSlope: 0.0278,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Wait Times in the ED",
    measureId: "OP-23",
    measureName:
      "ED-Head CT or MRI Scan Results for Acute Ischemic Stroke or Hemorrhagic Stroke who Received Head CT or MRI Scan Interpretation Within 45 Minutes of Arrival",
    conwaySlope: 0.003,
    nationalSlope: -0.006,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Sepsis Bundle Adherence",
    measureId: "SEP-1",
    measureName: "Severe Sepsis and Septic Shock",
    conwaySlope: 0.02,
    nationalSlope: 0.011,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Colonoscopy Care Hospital",
    measureId: "OP-29",
    measureName:
      "Endoscopy/Polyp Surveillance: Appropriate Follow-up Interval for Normal Colonoscopy in Average Risk Patients",
    conwaySlope: 0.075,
    nationalSlope: 0.008,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureCategory: "Maternal Care Hospital",
    measureId: "PC-01",
    measureName:
      "Elective Delivery Prior to 39 Completed Weeks Gestation: Percentage of Babies Electively Delivered Prior to 39 Completed Weeks Gestation",
    conwaySlope: 0.006,
    nationalSlope: 0.002,
  },
]

// Update the underperformingMeasuresData array to include weights
const underperformingMeasuresData = [
  {
    measureGroup: "Readmission",
    measureId: "EDAC-30-AMI",
    measureName: "Excess Days in Acute Care after Hospitalization for Acute Myocardial Infarction",
    conwayMean: 20.643,
    nationalMean: 6.296,
    difference: 2.2785,
    percentageGap: 261.9,
    weight: 10.0,
  },
  {
    measureGroup: "Readmission",
    measureId: "EDAC-30-PN",
    measureName: "Excess Days in Acute Care after Hospitalization for Pneumonia (PN)",
    conwayMean: 14.343,
    nationalMean: 5.148,
    difference: 1.7862,
    percentageGap: 178.6,
    weight: 10.0,
  },
  {
    measureGroup: "Safety of Care",
    measureId: "HAI-5",
    measureName: "MRSA Bacteremia",
    conwayMean: 1.6,
    nationalMean: 0.868,
    difference: 0.732,
    percentageGap: 84.3,
    weight: 12.5,
  },
  {
    measureGroup: "Readmission",
    measureId: "EDAC-30-HF",
    measureName: "Excess Days in Acute Care after Hospitalization for Heart Failure",
    conwayMean: 5.971,
    nationalMean: 4.239,
    difference: 0.4087,
    percentageGap: 40.9,
    weight: 10.0,
  },
  {
    measureGroup: "Patient Experience",
    measureId: "H-COMP-6",
    measureName: "Discharge Information",
    conwayMean: 3.0,
    nationalMean: 3.34,
    difference: 0.3404,
    percentageGap: -10.2,
    weight: 12.5,
  },
  {
    measureGroup: "Safety of Care",
    measureId: "HAI-1",
    measureName: "Central-Line Associated Bloodstream Infection (CLABSI)",
    conwayMean: 1.133,
    nationalMean: 0.804,
    difference: 0.3289,
    percentageGap: 40.9,
    weight: 12.5,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureId: "OP-29",
    measureName:
      "Endoscopy/Polyp Surveillance: Appropriate Follow-up Interval for Normal Colonoscopy in Average Risk Patients",
    conwayMean: 0.621,
    nationalMean: 0.894,
    difference: 0.2727,
    percentageGap: -30.5,
    weight: 8.3,
  },
  {
    measureGroup: "Safety of Care",
    measureId: "HAI-6",
    measureName: "Clostridium Difficile (C.difficile)",
    conwayMean: 0.751,
    nationalMean: 0.582,
    difference: 0.1689,
    percentageGap: 29.0,
    weight: 12.5,
  },
  {
    measureGroup: "Safety of Care",
    measureId: "PSI-90-Safety",
    measureName: "Patient Safety and Adverse Events Composite",
    conwayMean: 1.126,
    nationalMean: 0.993,
    difference: 0.1329,
    percentageGap: 13.4,
    weight: 12.5,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureId: "OP-18b/ED-3",
    measureName: "Median Time from ED Arrival to ED Departure for Discharged ED Patients",
    conwayMean: 159.857,
    nationalMean: 149.823,
    difference: 0.067,
    percentageGap: 6.7,
    weight: 8.3,
  },
  {
    measureGroup: "Mortality",
    measureId: "MORT-30-PN",
    measureName: "Pneumonia (PN) 30-Day Mortality Rate",
    conwayMean: 0.212,
    nationalMean: 0.166,
    difference: 0.0464,
    percentageGap: 27.7,
    weight: 16.7,
  },
  {
    measureGroup: "Readmission",
    measureId: "READM-30-COPD",
    measureName: "Chronic Obstructive Pulmonary Disease (COPD) 30-Day Readmission Rate",
    conwayMean: 0.141,
    nationalMean: 0.122,
    difference: 0.0194,
    percentageGap: 15.6,
    weight: 10.0,
  },
  {
    measureGroup: "Mortality",
    measureId: "PSI-04",
    measureName: "Death Rate Among Surgical Inpatients with Serious Treatable Complications",
    conwayMean: 181.3,
    nationalMean: 162.7,
    difference: 18.6,
    percentageGap: 11.4,
    weight: 16.7,
  },
  {
    measureGroup: "Mortality",
    measureId: "MORT-30-COPD",
    measureName: "Chronic Obstructive Pulmonary Disease (COPD) 30-Day Mortality Rate",
    conwayMean: 0.105,
    nationalMean: 0.087,
    difference: 0.0176,
    percentageGap: 20.7,
    weight: 16.7,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureId: "PC-01",
    measureName: "Elective Delivery Prior to 39 Completed Weeks Gestation",
    conwayMean: 0.034,
    nationalMean: 0.021,
    difference: 0.0135,
    percentageGap: 61.9,
    weight: 8.3,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureId: "OP-10",
    measureName: "Abdomen CT Use of Contrast Material",
    conwayMean: 0.075,
    nationalMean: 0.065,
    difference: 0.0099,
    percentageGap: 15.4,
    weight: 8.3,
  },
  {
    measureGroup: "Mortality",
    measureId: "MORT-30-CABG",
    measureName: "Coronary Artery Bypass Graft (CABG) 30-Day Mortality Rate",
    conwayMean: 0.039,
    nationalMean: 0.031,
    difference: 0.008,
    percentageGap: 25.8,
    weight: 16.7,
  },
  {
    measureGroup: "Timely & Effective Care",
    measureId: "OP-22",
    measureName: "ED Patient Left Without Being Seen",
    conwayMean: 0.025,
    nationalMean: 0.019,
    difference: 0.0064,
    percentageGap: 31.6,
    weight: 8.3,
  },
  {
    measureGroup: "Mortality",
    measureId: "MORT-30-HF",
    measureName: "Heart Failure (HF) 30-Day Mortality Rate",
    conwayMean: 0.121,
    nationalMean: 0.116,
    difference: 0.0043,
    percentageGap: 4.3,
    weight: 16.7,
  },
  {
    measureGroup: "Safety of Care",
    measureId: "COMP-HIP-KNEE",
    measureName:
      "Hospital-Level Risk-Standardized Complication Rate (RSCR) Following Elective Primary Total Hip Arthroplasty (THA) and Total Knee Arthroplasty (TKA)",
    conwayMean: 0.031,
    nationalMean: 0.027,
    difference: 0.0034,
    percentageGap: 14.8,
    weight: 12.5,
  },
  {
    measureGroup: "Readmission",
    measureId: "READM-30-Hip-Knee",
    measureName:
      "Hospital-Level 30-Day All-Cause Risk-Standardized Readmission Rate (RSRR) Following Elective Total Hip Arthroplasty (THA)/Total Knee Arthroplasty (TKA)",
    conwayMean: 0.044,
    nationalMean: 0.042,
    difference: 0.0025,
    percentageGap: 4.8,
    weight: 10.0,
  },
  {
    measureGroup: "Mortality",
    measureId: "MORT-30-AMI",
    measureName: "Acute Myocardial Infarction (AMI) 30-Day Mortality Rate",
    conwayMean: 0.128,
    nationalMean: 0.126,
    difference: 0.0019,
    percentageGap: 1.6,
    weight: 16.7,
  },
  {
    measureGroup: "Readmission",
    measureId: "READM-30-HOSP-WIDE",
    measureName: "Hospital-Wide All-Cause Unplanned Readmission",
    conwayMean: 0.152,
    nationalMean: 0.15,
    difference: 0.0015,
    percentageGap: 1.3,
    weight: 10.0,
  },
  {
    measureGroup: "Mortality",
    measureId: "MORT-30-STK",
    measureName: "Acute Ischemic Stroke (STK) 30-Day Mortality Rate",
    conwayMean: 13.6,
    nationalMean: 13.8,
    difference: 0.2,
    percentageGap: 1.4,
    weight: 16.7,
  },
]
  .map((measure) => ({
    ...measure,
    weightedImpact: measure.difference * measure.weight,
  }))
  .sort((a, b) => b.difference - a.difference)

// Add this after the existing underperformingMeasuresData definition
const underperformingMeasuresWithPriority = underperformingMeasuresData.map((measure) => {
  // Find the corresponding slope data
  const slopeData = scatterPlotData.find((item) => item.measureId === measure.measureId)
  const conwaySlope = slopeData ? slopeData.conwaySlope : 0

  // Determine if this is a "lower is better" measure
  const isLowerBetter =
    measure.measureGroup === "Mortality" ||
    measure.measureGroup === "Readmission" ||
    (measure.measureGroup === "Safety of Care" && !measure.measureId.includes("COMP")) ||
    measure.measureId === "PC-01" ||
    measure.measureId === "OP-22" ||
    measure.measureId.startsWith("OP-18b") ||
    measure.measureId === "OP-10"

  // Calculate trend multiplier
  let trendMultiplier = 1.0 // Default for stable
  const slopeThreshold = 0.01 // Threshold for considering a trend significant

  if (Math.abs(conwaySlope) > slopeThreshold) {
    if (isLowerBetter) {
      // For "lower is better" measures: positive slope = worsening
      trendMultiplier = conwaySlope > 0 ? 1.5 : 0.7
    } else {
      // For "higher is better" measures: negative slope = worsening
      trendMultiplier = conwaySlope < 0 ? 1.5 : 0.7
    }
  }

  const priorityScore = measure.weightedImpact * trendMultiplier

  return {
    ...measure,
    conwaySlope,
    trendMultiplier,
    priorityScore,
    trendDirection:
      Math.abs(conwaySlope) <= slopeThreshold
        ? "stable"
        : isLowerBetter
          ? conwaySlope > 0
            ? "worsening"
            : "improving"
          : conwaySlope < 0
            ? "worsening"
            : "improving",
  }
})

// Top 10 Priority Measures
const topPriorityMeasures = [
  "EDAC-30-AMI",
  "EDAC-30-PN",
  "HAI-1",
  "PSI-90-Safety",
  "MORT-30-PN",
  "MORT-30-COPD",
  "PSI-04",
  "MORT-30-HF",
  "MORT-30-STK",
  "OP-29",
]

// Color mapping for measure groups
const measureGroupColors = {
  Mortality: "#e76f51",
  Readmission: "#f4a261",
  "Safety of Care": "#2a9d8f",
  "Patient Experience": "#264653",
  "Timely & Effective Care": "#2d5aa0",
}

export default function HealthAnalyticsDashboard() {
  const [selectedMeasureGroup, setSelectedMeasureGroup] = useState("Mortality")
  const [selectedMeasure, setSelectedMeasure] = useState("MORT-30-AMI")
  const [selectedAnalysisTab, setSelectedAnalysisTab] = useState("measures")

  // Sample data based on the provided table - in a real implementation, you would import the full dataset
  const measureGroups = ["Mortality", "Readmission", "Safety of Care", "Patient Experience", "Timely & Effective Care"]

  const measureData = {
    Mortality: [
      { id: "MORT-30-AMI", name: "Acute Myocardial Infarction (AMI) 30-Day Mortality Rate", weight: 16.7 },
      { id: "MORT-30-CABG", name: "Coronary Artery Bypass Graft (CABG) 30-Day Mortality Rate", weight: 0.0 },
      { id: "MORT-30-COPD", name: "Chronic Obstructive Pulmonary Disease (COPD) 30-Day Mortality Rate", weight: 16.7 },
      { id: "MORT-30-HF", name: "Heart Failure (HF) 30-Day Mortality Rate", weight: 16.7 },
      { id: "MORT-30-PN", name: "Pneumonia (PN) 30-Day Mortality Rate", weight: 16.7 },
      { id: "MORT-30-STK", name: "Acute Ischemic Stroke (STK) 30-Day Mortality Rate", weight: 16.7 },
      { id: "PSI-04", name: "Death Rate Among Surgical Patients with Serious Treatable Complications", weight: 16.7 },
    ],
    Readmission: [
      {
        id: "EDAC-30-AMI",
        name: "Excess Days in Acute Care after Hospitalization for Acute Myocardial Infarction",
        weight: 10.0,
      },
      { id: "READM-30-CABG", name: "Coronary Artery Bypass Graft (CABG) 30-Day Readmission Rate", weight: 0.0 },
      {
        id: "READM-30-COPD",
        name: "Chronic Obstructive Pulmonary Disease (COPD) 30-Day Readmission Rate",
        weight: 10.0,
      },
      { id: "EDAC-30-HF", name: "Excess Days in Acute Care after Hospitalization for Heart Failure", weight: 10.0 },
      {
        id: "READM-30-Hip-Knee",
        name: "Hospital-Level 30-Day All-Cause Risk-Standardized Readmission Rate (RSRR) Following Elective Total Hip Arthroplasty (THA)/Total Knee Arthroplasty (TKA)",
        weight: 10.0,
      },
      { id: "EDAC-30-PN", name: "Excess Days in Acute Care after Hospitalization for Pneumonia (PN)", weight: 10.0 },
      { id: "READM-30-STK", name: "Stroke (STK) 30-Day Readmission Rate", weight: 10.0 },
      { id: "READM-30-HOSP-WIDE", name: "Hospital-Wide All-Cause Unplanned Readmission", weight: 10.0 },
      {
        id: "OP-32",
        name: "Facility Seven-Day Risk-Standardized Hospital Visit Rate after Outpatient Colonoscopy",
        weight: 10.0,
      },
      { id: "OP-35 ADM", name: "Admissions for Patients Receiving Outpatient Chemotherapy", weight: 10.0 },
      {
        id: "OP-35 ED",
        name: "Emergency Department (ED) Visits for Patients Receiving Outpatient Chemotherapy",
        weight: 10.0,
      },
      { id: "OP-36", name: "Hospital Visits after Hospital Outpatient Surgery", weight: 10.0 },
    ],
    "Safety of Care": [
      { id: "HAI-1", name: "Central Line-Associated Bloodstream Infection (CLABSI)", weight: 12.5 },
      { id: "HAI-2", name: "Catheter-Associated Urinary Tract Infection (CAUTI)", weight: 12.5 },
      { id: "HAI-3", name: "Surgical Site Infection from Colon Surgery (SSI-colon)", weight: 12.5 },
      {
        id: "HAI-4",
        name: "Surgical Site Infection from Abdominal Hysterectomy (SSI-abdominal hysterectomy)",
        weight: 12.5,
      },
      { id: "HAI-5", name: "MRSA Bacteremia", weight: 12.5 },
      { id: "HAI-6", name: "Clostridium Difficile (C.difficile)", weight: 12.5 },
      {
        id: "COMP-HIP-KNEE",
        name: "Hospital-Level Risk-Standardized Complication Rate (RSCR) Following Elective Primary Total Hip Arthroplasty (THA) and Total Knee Arthroplasty (TKA)",
        weight: 12.5,
      },
      { id: "PSI-90 Safety", name: "Patient Safety and Adverse Events Composite", weight: 12.5 },
    ],
    "Patient Experience": [
      { id: "H-COMP-1", name: "Nurse Communication", weight: 12.5 },
      { id: "H-COMP-2", name: "Doctor Communication", weight: 12.5 },
      { id: "H-COMP-3", name: "Responsiveness of Hospital Staff", weight: 12.5 },
      { id: "H-COMP-5", name: "Communication About Medicines", weight: 12.5 },
      { id: "H-COMP-6", name: "Discharge Information", weight: 12.5 },
      { id: "H-CLEAN-HSP / H-QUIET-HSP", name: "Cleanliness and Quietness of Hospital Environment", weight: 12.5 },
      { id: "H-HSP-RATING / H-RECMND", name: "Overall Rating of Hospital", weight: 12.5 },
      { id: "H-COMP-7", name: "HCAHPS 3 Item Care Transition Measure", weight: 12.5 },
    ],
    "Timely & Effective Care": [
      { id: "HCP-COVID-19", name: "COVID-19 Vaccination Coverage Among HCP", weight: 8.3 },
      { id: "OP-8", name: "MRI Lumbar Spine for Low Back Pain", weight: 8.3 },
      { id: "OP-10", name: "Abdomen CT Use of Contrast Material", weight: 8.3 },
      {
        id: "OP-13",
        name: "Cardiac Imaging for Preoperative Risk Assessment for Non-Cardiac Low-Risk Surgery",
        weight: 8.3,
      },
      {
        id: "OP-18b/ED-3",
        name: "Median Time from ED Arrival to ED Departure for Discharged ED Patients",
        weight: 8.3,
      },
      { id: "OP-22", name: "ED Patient Left Without Being Seen", weight: 8.3 },
      {
        id: "OP-23",
        name: "Head CT or MRI Scan Results for Acute Ischemic Stroke or Hemorrhagic Stroke Patients who Received Head CT or MRI Scan Interpretation Within 45 Minutes of Arrival",
        weight: 8.3,
      },
      {
        id: "OP-29",
        name: "Endoscopy/Polyp Surveillance: Appropriate Follow-up Interval for Normal Colonoscopy in Average Risk Patients",
        weight: 8.3,
      },
      {
        id: "PC-01",
        name: "Elective Delivery Prior to 39 Completed Weeks Gestation: Percentage of Babies Electively Delivered Prior to 39 Completed Weeks Gestation",
        weight: 8.3,
      },
      { id: "SEP-1", name: "Severe Sepsis and Septic Shock", weight: 8.3 },
      { id: "Safe Use of Opioids", name: "Safe use of opioids - concurrent prescribing", weight: 8.3 },
      { id: "IMM-3/OP-27", name: "Influenza Immunization", weight: 8.3 },
    ],
  }

  // Helper function to determine status based on measure type
  const calculateStatus = (measureId, conwayValue, nationalValue) => {
    if (conwayValue === null || nationalValue === null) return "no data"

    // Determine if this is an inverse measure (lower is better)
    const isInverseMeasure =
      measureId.startsWith("MORT-") ||
      measureId.startsWith("READM-") ||
      measureId.startsWith("EDAC-") ||
      measureId.startsWith("HAI-") ||
      measureId.startsWith("PSI-") ||
      measureId === "COMP-HIP-KNEE" ||
      measureId === "PSI-90 Safety" ||
      measureId === "OP-32" ||
      measureId === "OP-35 ADM" ||
      measureId === "OP-35 ED" ||
      measureId === "OP-36" ||
      measureId === "PC-01" ||
      measureId === "OP-22"

    // For some measures, we need to check if they're percentage values
    // and handle them differently (e.g., 90% vs 85% - higher is better)
    const isPercentageMeasure =
      measureId.startsWith("H-") ||
      measureId === "IMM-3/OP-27" ||
      measureId === "HCP-COVID-19" ||
      measureId === "OP-23" ||
      measureId === "OP-29" ||
      measureId === "OP-30" ||
      measureId === "SEP-1"

    // Calculate the difference as a percentage of the national value
    const difference = Math.abs(conwayValue - nationalValue)
    const percentDifference = (difference / nationalValue) * 100

    // Consider values within 5% of each other as "similar"
    const similarThreshold = 5

    if (percentDifference <= similarThreshold) {
      return "similar"
    }

    if (isInverseMeasure) {
      return conwayValue < nationalValue ? "better" : "worse"
    } else if (isPercentageMeasure) {
      return conwayValue > nationalValue ? "better" : "worse"
    } else {
      // For other measures, determine case by case
      // For ED wait times (lower is better)
      if (measureId.startsWith("ED-") || measureId === "OP-18b/ED-3") {
        return conwayValue < nationalValue ? "better" : "worse"
      }
      // For most other measures, higher is better
      return conwayValue > nationalValue ? "better" : "worse"
    }
  }

  // Performance data by year with Conway and National values
  // Updated with data from the screenshot for the 2019-2024 period including means and slopes
  const performanceData = {
    "MORT-30-AMI": [
      { year: "2019", conway: 11.9, national: 13.2, status: "better" },
      { year: "2020", conway: 12.4, national: 12.8, status: "better" },
      { year: "2021", conway: 12.0, national: 12.7, status: "better" },
      { year: "2022", conway: 13.3, national: 12.3, status: "worse" },
      { year: "2023", conway: 14.0, national: 12.4, status: "worse" },
      { year: "2024", conway: 14.0, national: 12.5, status: "worse" },
      { year: "2025", conway: 12.2, national: 12.6, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 12.8,
        nationalMean: 12.6,
        conwaySlope: 0.002,
        nationalSlope: -0.001,
        weight: 16.7,
      },
    ],
    "MORT-30-CABG": [
      { year: "2019", conway: 3.8, national: 3.2, status: "worse" },
      { year: "2020", conway: 3.9, national: 3.1, status: "worse" },
      { year: "2021", conway: 3.8, national: 3.1, status: "worse" },
      { year: "2022", conway: 3.9, national: 3.0, status: "worse" },
      { year: "2023", conway: null, national: 3.0, status: "no data" },
      { year: "2024", conway: null, national: 3.0, status: "no data" },
      { year: "2025", conway: null, national: 2.9, status: "no data" },
      {
        year: "2019-2025",
        conwayMean: 3.9,
        nationalMean: 3.1,
        conwaySlope: 0.0,
        nationalSlope: -0.005,
        weight: 0.0,
      },
    ],
    "MORT-30-COPD": [
      { year: "2019", conway: 10.0, national: 8.4, status: "worse" },
      { year: "2020", conway: 11.4, national: 8.5, status: "worse" },
      { year: "2021", conway: 10.3, national: 8.5, status: "worse" },
      { year: "2022", conway: 10.8, national: 8.2, status: "worse" },
      { year: "2023", conway: 10.2, national: 8.5, status: "worse" },
      { year: "2024", conway: 10.0, national: 9.2, status: "worse" },
      { year: "2025", conway: 10.5, national: 9.4, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 10.5,
        nationalMean: 8.7,
        conwaySlope: -0.001,
        nationalSlope: 0.002,
        weight: 16.7,
      },
    ],
    "MORT-30-HF": [
      { year: "2019", conway: 10.8, national: 11.8, status: "better" },
      { year: "2020", conway: 11.7, national: 11.6, status: "similar" },
      { year: "2021", conway: 11.7, national: 11.5, status: "similar" },
      { year: "2022", conway: 12.1, national: 11.3, status: "worse" },
      { year: "2023", conway: 11.9, national: 11.4, status: "worse" },
      { year: "2024", conway: 13.8, national: 11.8, status: "worse" },
      { year: "2025", conway: 12.4, national: 11.9, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 12.1,
        nationalMean: 11.6,
        conwaySlope: 0.003,
        nationalSlope: 0.0,
        weight: 16.7,
      },
    ],
    "MORT-30-PN": [
      { year: "2019", conway: 21.0, national: 15.9, status: "worse" },
      { year: "2020", conway: 21.7, national: 15.8, status: "worse" },
      { year: "2021", conway: 22.1, national: 15.7, status: "worse" },
      { year: "2022", conway: 21.9, national: 15.5, status: "worse" },
      { year: "2023", conway: 21.2, national: 16.7, status: "worse" },
      { year: "2024", conway: 20.7, national: 18.3, status: "worse" },
      { year: "2025", conway: 19.8, national: 18.0, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 21.2,
        nationalMean: 16.6,
        conwaySlope: -0.002,
        nationalSlope: 0.004,
        year: "2019-2025",
        conwayMean: 21.2,
        nationalMean: 16.6,
        conwaySlope: -0.002,
        nationalSlope: 0.004,
        weight: 16.7,
      },
    ],
    "MORT-30-STK": [
      { year: "2019", conway: 12.9, national: 14.3, status: "better" },
      { year: "2020", conway: 12.7, national: 13.8, status: "better" },
      { year: "2021", conway: 11.8, national: 13.6, status: "better" },
      { year: "2022", conway: 12.2, national: 13.5, status: "better" },
      { year: "2023", conway: 14.2, national: 13.6, status: "worse" },
      { year: "2024", conway: 15.7, national: 13.8, status: "worse" },
      { year: "2025", conway: 15.5, national: 13.7, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 13.6,
        nationalMean: 13.8,
        conwaySlope: 0.006,
        nationalSlope: -0.001,
        weight: 16.7,
      },
    ],
    "PSI-04": [
      { year: "2019", conway: 176.58, national: 161.8, status: "worse" },
      { year: "2020", conway: 177.84, national: 163.0, status: "worse" },
      { year: "2021", conway: 184.48, national: 164.4, status: "worse" },
      { year: "2022", conway: 184.61, national: 159.5, status: "worse" },
      { year: "2023", conway: 175.46, national: 143.5, status: "worse" },
      { year: "2024", conway: 184.92, national: 168.7, status: "worse" },
      { year: "2025", conway: 185.4, national: 177.7, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 181.3,
        nationalMean: 162.7,
        conwaySlope: 1.13,
        nationalSlope: 1.373,
        weight: 16.7,
      },
    ],
    "EDAC-30-AMI": [
      { year: "2019", conway: 0.3, national: 7.1, status: "better" },
      { year: "2020", conway: 10.2, national: 6.9, status: "worse" },
      { year: "2021", conway: 29.3, national: 6.3, status: "worse" },
      { year: "2022", conway: 36.6, national: 6.8, status: "worse" },
      { year: "2023", conway: 24.5, national: 6.6, status: "worse" },
      { year: "2024", conway: 29.6, national: 6.4, status: "worse" },
      { year: "2025", conway: 14.0, national: 4.0, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 20.6,
        nationalMean: 6.3,
        conwaySlope: 2.682,
        nationalSlope: -0.356,
        weight: 10.0,
      },
    ],
    "READM-30-CABG": [
      { year: "2019", conway: 14.4, national: 13.2, status: "worse" },
      { year: "2020", conway: 14.3, national: 12.8, status: "worse" },
      { year: "2021", conway: 14.0, national: 12.7, status: "worse" },
      { year: "2022", conway: 13.7, national: 12.6, status: "worse" },
      { year: "2023", conway: null, national: 12.0, status: "no data" },
      { year: "2024", conway: null, national: 11.0, status: "no data" },
      { year: "2025", conway: null, national: 10.7, status: "no data" },
      {
        year: "2019-2025",
        conwayMean: 14.1,
        nationalMean: 12.2,
        conwaySlope: -0.002,
        nationalSlope: -0.004,
        weight: 0.0,
      },
    ],
    "READM-30-COPD": [
      { year: "2019", conway: 17.8, national: 19.6, status: "better" },
      { year: "2020", conway: 18.3, national: 19.5, status: "better" },
      { year: "2021", conway: 18.9, national: 19.6, status: "better" },
      { year: "2022", conway: 18.7, national: 19.7, status: "better" },
      { year: "2023", conway: 19.2, national: 19.8, status: "better" },
      { year: "2024", conway: 18.5, national: 19.3, status: "better" },
      { year: "2025", conway: 18.8, national: 18.6, status: "similar" },
      {
        year: "2019-2025",
        conwayMean: 18.6,
        nationalMean: 19.5,
        conwaySlope: 0.001,
        nationalSlope: -0.001,
        weight: 10.0,
      },
    ],
    "EDAC-30-HF": [
      { year: "2019", conway: 7.5, national: 4.5, status: "worse" },
      { year: "2020", conway: 20.1, national: 4.4, status: "worse" },
      { year: "2021", conway: 20.7, national: 4.2, status: "worse" },
      { year: "2022", conway: 11.8, national: 4.7, status: "worse" },
      { year: "2023", conway: -3.0, national: 4.5, status: "better" },
      { year: "2024", conway: -7.2, national: 4.6, status: "better" },
      { year: "2025", conway: -8.1, national: 2.8, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 6.0,
        nationalMean: 4.2,
        conwaySlope: -4.468,
        nationalSlope: -0.146,
        weight: 10.0,
      },
    ],
    "READM-30-Hip-Knee": [
      { year: "2019", conway: 4.5, national: 4.2, status: "worse" },
      { year: "2020", conway: 4.4, national: 4.1, status: "worse" },
      { year: "2021", conway: 4.4, national: 4.0, status: "worse" },
      { year: "2022", conway: 4.6, national: 4.0, status: "worse" },
      { year: "2023", conway: 4.4, national: 4.1, status: "worse" },
      { year: "2024", conway: 4.0, national: 4.3, status: "better" },
      { year: "2025", conway: 4.6, national: 4.5, status: "similar" },
      {
        year: "2019-2025",
        conwayMean: 4.4,
        nationalMean: 4.2,
        conwaySlope: 0.0,
        nationalSlope: 0.001,
        weight: 10.0,
      },
    ],
    "EDAC-30-PN": [
      { year: "2019", conway: -3.2, national: 4.7, status: "better" },
      { year: "2020", conway: 16.1, national: 4.7, status: "worse" },
      { year: "2021", conway: 8.0, national: 4.8, status: "worse" },
      { year: "2022", conway: 18.8, national: 5.4, status: "worse" },
      { year: "2023", conway: 13.7, national: 5.7, status: "worse" },
      { year: "2024", conway: 24.2, national: 6.7, status: "worse" },
      { year: "2025", conway: 22.8, national: 4.1, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 14.3,
        nationalMean: 5.1,
        conwaySlope: 3.568,
        nationalSlope: 0.122,
        weight: 10.0,
      },
    ],
    "READM-30-STK": [
      { year: "2019", conway: 11.7, national: 11.9, status: "better" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: null, national: null, status: "no data" },
      { year: "2022", conway: 15.2, national: 15.5, status: "better" },
      { year: "2023", conway: null, national: null, status: "no data" },
      { year: "2024", conway: null, national: null, status: "no data" },
      { year: "2025", conway: null, national: null, status: "no data" },
      {
        year: "2019-2025",
        conwayMean: 13.5,
        nationalMean: 13.7,
        conwaySlope: 0.012,
        nationalSlope: 0.012,
        weight: 10.0,
      },
    ],
    "READM-30-HOSP-WIDE": [
      { year: "2019", conway: 14.4, national: 15.3, status: "better" },
      { year: "2020", conway: 16.8, national: 15.3, status: "worse" },
      { year: "2021", conway: 15.4, national: 15.5, status: "better" },
      { year: "2022", conway: null, national: null, status: "no data" },
      { year: "2023", conway: 15.3, national: 15.0, status: "worse" },
      { year: "2024", conway: 14.4, national: 14.6, status: "better" },
      { year: "2025", conway: 14.9, national: 14.6, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 15.2,
        nationalMean: 15.0,
        conwaySlope: 0.001,
        nationalSlope: -0.002,
        weight: 10.0,
      },
    ],
    "OP-32": [
      { year: "2019", conway: 13.9, national: 14.8, status: "better" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: 14.8, national: 16.5, status: "better" },
      { year: "2022", conway: 15.5, national: 16.5, status: "better" },
      { year: "2023", conway: 14.8, national: 14.2, status: "worse" },
      { year: "2024", conway: 13.0, national: 13.2, status: "better" },
      { year: "2025", conway: 13.0, national: 13.2, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 14.2,
        nationalMean: 14.7,
        conwaySlope: -0.216,
        nationalSlope: -0.43,
        weight: 10.0,
      },
    ],
    "OP-35 ADM": [
      { year: "2019", conway: null, national: null, status: "no data" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: 13.3, national: 12.6, status: "worse" },
      { year: "2022", conway: 11.3, national: 12.1, status: "better" },
      { year: "2023", conway: 9.4, national: 10.4, status: "better" },
      { year: "2024", conway: 10.4, national: 10.5, status: "better" },
      { year: "2025", conway: 10.4, national: 10.5, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 10.4,
        nationalMean: 11.2,
        conwaySlope: -0.17,
        nationalSlope: -0.591,
        weight: 10.0,
      },
    ],
    "OP-35 ED": [
      { year: "2019", conway: null, national: null, status: "no data" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: 6.7, national: 6.0, status: "worse" },
      { year: "2022", conway: 5.1, national: 6.0, status: "better" },
      { year: "2023", conway: 4.9, national: 5.4, status: "better" },
      { year: "2024", conway: 5.4, national: 5.4, status: "similar" },
      { year: "2025", conway: 5.4, national: 5.4, status: "similar" },
      {
        year: "2019-2025",
        conwayMean: 5.5,
        nationalMean: 5.7,
        conwaySlope: -0.23,
        nationalSlope: -0.175,
        weight: 10.0,
      },
    ],
    "OP-36": [
      { year: "2019", conway: null, national: null, status: "no data" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: 1.1, national: 1.0, status: "worse" },
      { year: "2022", conway: 1.0, national: 1.0, status: "similar" },
      { year: "2023", conway: 1.0, national: 1.0, status: "similar" },
      { year: "2024", conway: 0.9, national: 1.0, status: "better" },
      { year: "2025", conway: 0.9, national: 1.0, status: "better" },
      { year: "2019-2025", conwayMean: 1.0, nationalMean: 1.0, conwaySlope: -0.05, nationalSlope: 0.004, weight: 10.0 },
    ],
    "HAI-1": [
      { year: "2019", conway: 1.19, national: 0.783, status: "worse" },
      { year: "2020", conway: 0.0, national: 0.736, status: "better" },
      { year: "2021", conway: 1.436, national: 0.692, status: "worse" },
      { year: "2022", conway: 1.799, national: 0.814, status: "worse" },
      { year: "2023", conway: 1.53, national: 1.11, status: "worse" },
      { year: "2024", conway: 1.052, national: 0.771, status: "worse" },
      { year: "2025", conway: 0.921, national: 0.719, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 1.13,
        nationalMean: 0.8,
        conwaySlope: 0.05,
        nationalSlope: 0.011,
        weight: 12.5,
      },
    ],
    "HAI-2": [
      { year: "2019", conway: 0.522, national: 0.857, status: "better" },
      { year: "2020", conway: 0.0, national: 0.806, status: "better" },
      { year: "2021", conway: 0.508, national: 0.719, status: "better" },
      { year: "2022", conway: 0.85, national: 0.74, status: "worse" },
      { year: "2023", conway: 0.625, national: 0.871, status: "better" },
      { year: "2024", conway: 0.356, national: 0.663, status: "better" },
      { year: "2025", conway: 0.234, national: 0.6, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 0.44,
        nationalMean: 0.75,
        conwaySlope: -0.001,
        nationalSlope: -0.032,
        weight: 12.5,
      },
    ],
    "HAI-3": [
      { year: "2019", conway: 0.765, national: 0.856, status: "better" },
      { year: "2020", conway: 0.554, national: 0.826, status: "better" },
      { year: "2021", conway: 0.413, national: 0.812, status: "better" },
      { year: "2022", conway: 0.405, national: 0.808, status: "better" },
      { year: "2023", conway: 0.311, national: 0.815, status: "better" },
      { year: "2024", conway: 0.822, national: 0.841, status: "better" },
      { year: "2025", conway: 0.686, national: 0.859, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 0.57,
        nationalMean: 0.83,
        conwaySlope: 0.007,
        nationalSlope: 0.002,
        weight: 12.5,
      },
    ],
    "HAI-4": [
      { year: "2019", conway: 0.384, national: 0.896, status: "better" },
      { year: "2020", conway: 0.332, national: 0.867, status: "better" },
      { year: "2021", conway: 0.344, national: 0.927, status: "better" },
      { year: "2022", conway: 0.354, national: 0.95, status: "better" },
      { year: "2023", conway: 0.363, national: 1.009, status: "better" },
      { year: "2024", conway: 0.389, national: 0.976, status: "better" },
      { year: "2025", conway: 0.0, national: 1.071, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 0.31,
        nationalMean: 0.96,
        conwaySlope: -0.036,
        nationalSlope: 0.03,
        weight: 12.5,
      },
    ],
    "HAI-5": [
      { year: "2019", conway: 3.475, national: 0.886, status: "worse" },
      { year: "2020", conway: 2.494, national: 0.843, status: "worse" },
      { year: "2021", conway: 1.336, national: 0.813, status: "worse" },
      { year: "2022", conway: 2.059, national: 0.84, status: "worse" },
      { year: "2023", conway: 0.491, national: 1.13, status: "better" },
      { year: "2024", conway: 0.896, national: 0.824, status: "worse" },
      { year: "2025", conway: 0.451, national: 0.741, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 1.6,
        nationalMean: 0.87,
        conwaySlope: -0.468,
        nationalSlope: -0.006,
        weight: 12.5,
      },
    ],
    "HAI-6": [
      { year: "2019", conway: 1.481, national: 0.772, status: "worse" },
      { year: "2020", conway: 0.772, national: 0.694, status: "worse" },
      { year: "2021", conway: 0.606, national: 0.584, status: "worse" },
      { year: "2022", conway: 0.75, national: 0.559, status: "worse" },
      { year: "2023", conway: 0.604, national: 0.51, status: "worse" },
      { year: "2024", conway: 0.79, national: 0.508, status: "worse" },
      { year: "2025", conway: 0.252, national: 0.445, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 0.75,
        nationalMean: 0.58,
        conwaySlope: -0.13,
        nationalSlope: -0.051,
        weight: 12.5,
      },
    ],
    "COMP-HIP-KNEE": [
      { year: "2019", conway: 3.5, national: 2.6, status: "worse" },
      { year: "2020", conway: 3.7, national: 2.6, status: "worse" },
      { year: "2021", conway: 3.1, national: 2.5, status: "worse" },
      { year: "2022", conway: 2.9, national: 2.4, status: "worse" },
      { year: "2023", conway: 2.5, national: 2.4, status: "worse" },
      { year: "2024", conway: 3.0, national: 3.2, status: "better" },
      { year: "2025", conway: 2.8, national: 3.5, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 3.1,
        nationalMean: 2.7,
        conwaySlope: -0.001,
        nationalSlope: 0.001,
        weight: 12.5,
      },
    ],
    "PSI-90 Safety": [
      { year: "2019", conway: 0.92, national: 0.99, status: "better" },
      { year: "2020", conway: 1.12, national: 0.99, status: "worse" },
      { year: "2021", conway: 1.25, national: 0.99, status: "worse" },
      { year: "2022", conway: 1.05, national: 0.99, status: "worse" },
      { year: "2023", conway: 1.0, national: 0.98, status: "worse" },
      { year: "2024", conway: 1.28, national: 1.0, status: "worse" },
      { year: "2025", conway: 1.26, national: 1.0, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 1.13,
        nationalMean: 0.99,
        conwaySlope: 0.039,
        nationalSlope: 0.001,
        weight: 12.5,
      },
    ],
    "H-COMP-1": [
      { year: "2021", conway: 4, national: 3.5, status: "worse" },
      { year: "2022", conway: 4, national: 3.5, status: "worse" },
      { year: "2023", conway: 3, national: 3.1, status: "better" },
      { year: "2024", conway: 4, national: 3.4, status: "worse" },
      { year: "2025", conway: 4.0, national: 3.3, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 3.8,
        nationalMean: 3.4,
        conwaySlope: 0.0,
        nationalSlope: -0.058,
        weight: 12.5,
      },
    ],
    "H-COMP-2": [
      { year: "2021", conway: 4, national: 3.1, status: "worse" },
      { year: "2022", conway: 4, national: 3.1, status: "worse" },
      { year: "2023", conway: 4, national: 3.2, status: "worse" },
      { year: "2024", conway: 4, national: 3.4, status: "worse" },
      { year: "2025", conway: 4.0, national: 3.4, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 4.0,
        nationalMean: 3.2,
        conwaySlope: 0.0,
        nationalSlope: 0.098,
        weight: 12.5,
      },
    ],
    "H-COMP-3": [
      { year: "2021", conway: 4, national: 3.3, status: "worse" },
      { year: "2022", conway: 4, national: 3.3, status: "worse" },
      { year: "2023", conway: 3, national: 3.1, status: "better" },
      { year: "2024", conway: 3, national: 3.3, status: "better" },
      { year: "2025", conway: 4.0, national: 3.2, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 3.6,
        nationalMean: 3.2,
        conwaySlope: -0.1,
        nationalSlope: -0.007,
        weight: 12.5,
      },
    ],
    "H-COMP-5": [
      { year: "2021", conway: 3, national: 3.1, status: "better" },
      { year: "2022", conway: 3, national: 3.1, status: "better" },
      { year: "2023", conway: 4, national: 3.3, status: "worse" },
      { year: "2024", conway: 3, national: 2.9, status: "worse" },
      { year: "2025", conway: 4.0, national: 3.2, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 3.4,
        nationalMean: 3.1,
        conwaySlope: 0.2,
        nationalSlope: 0.016,
        weight: 12.5,
      },
    ],
    "H-COMP-6": [
      { year: "2021", conway: 3, national: 3.2, status: "better" },
      { year: "2022", conway: 3, national: 3.2, status: "better" },
      { year: "2023", conway: 3, national: 3.4, status: "better" },
      { year: "2024", conway: 3, national: 3.5, status: "better" },
      { year: "2025", conway: 3.0, national: 3.3, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 3.0,
        nationalMean: 3.3,
        conwaySlope: 0.0,
        nationalSlope: 0.046,
        weight: 12.5,
      },
    ],
    "H-CLEAN-HSP / H-QUIET-HSP": [
      { year: "2019", conway: null, national: null, status: "no data" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: 3.5, national: 3.0, status: "worse" },
      { year: "2022", conway: 3.5, national: 3.0, status: "worse" },
      { year: "2023", conway: 3, national: 3.2, status: "better" },
      { year: "2024", conway: 3, national: 3.2, status: "better" },
      { year: "2025", conway: 2.5, national: 3.0, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 3.1,
        nationalMean: 3.1,
        conwaySlope: -0.25,
        nationalSlope: -0.003,
        weight: 12.5,
      },
    ],
    "H-HSP-RATING / H-RECMND": [
      { year: "2019", conway: null, national: null, status: "no data" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: 4, national: 3.2, status: "worse" },
      { year: "2022", conway: 4, national: 3.2, status: "worse" },
      { year: "2023", conway: 4, national: 3.4, status: "worse" },
      { year: "2024", conway: 4, national: 3.4, status: "worse" },
      { year: "2025", conway: 4.0, national: 3.2, status: "worse" },
      { year: "2019-2025", conwayMean: 4.0, nationalMean: 3.3, conwaySlope: 0.0, nationalSlope: 0.014, weight: 12.5 },
    ],
    "H-COMP-7": [
      { year: "2021", conway: 4, national: 3.1, status: "worse" },
      { year: "2022", conway: 4, national: 3.1, status: "worse" },
      { year: "2023", conway: 3, national: 3.0, status: "similar" },
      { year: "2024", conway: 4, national: 3.1, status: "worse" },
      { year: "2025", conway: 4.0, national: 3.0, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 3.8,
        nationalMean: 3.1,
        conwaySlope: 0.0,
        nationalSlope: -0.017,
        weight: 12.5,
      },
    ],
    "HCP-COVID-19": [
      { year: "2019", conway: null, national: null, status: "no data" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: null, national: null, status: "no data" },
      { year: "2022", conway: null, national: null, status: "no data" },
      { year: "2023", conway: 96.7, national: 86.0, status: "better" },
      { year: "2024", conway: 90.9, national: 87.9, status: "better" },
      { year: "2025", conway: 7.3, national: 10.6, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 65.0,
        nationalMean: 61.5,
        conwaySlope: -0.447,
        nationalSlope: -0.377,
        weight: 8.3,
      },
    ],
    "OP-8": [
      { year: "2019", conway: 43.5, national: 40.4, status: "worse" },
      { year: "2020", conway: 33.0, national: 39.7, status: "better" },
      { year: "2021", conway: 42.5, national: 39.9, status: "worse" },
      { year: "2022", conway: 48.6, national: 39.8, status: "worse" },
      { year: "2023", conway: 38.2, national: 45.9, status: "better" },
      { year: "2024", conway: 38.9, national: 38.0, status: "worse" },
      { year: "2025", conway: 31.3, national: 37.5, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 39.4,
        nationalMean: 40.2,
        conwaySlope: -0.01,
        nationalSlope: -0.002,
        weight: 8.3,
      },
    ],
    "OP-10": [
      { year: "2019", conway: 7.4, national: 7.8, status: "better" },
      { year: "2020", conway: 7.6, national: 7.1, status: "worse" },
      { year: "2021", conway: 8.8, national: 6.5, status: "worse" },
      { year: "2022", conway: 7.6, national: 6.1, status: "worse" },
      { year: "2023", conway: 6.8, national: 6.3, status: "worse" },
      { year: "2024", conway: 7.8, national: 6.0, status: "worse" },
      { year: "2025", conway: 6.5, national: 5.8, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 7.5,
        nationalMean: 6.5,
        conwaySlope: -0.002,
        nationalSlope: -0.003,
        weight: 8.3,
      },
    ],
    "OP-13": [
      { year: "2019", conway: 3.6, national: 4.4, status: "better" },
      { year: "2020", conway: 5.1, national: 4.6, status: "worse" },
      { year: "2021", conway: 2.8, national: 4.1, status: "better" },
      { year: "2022", conway: 3.5, national: 3.8, status: "better" },
      { year: "2023", conway: 2.0, national: 3.6, status: "better" },
      { year: "2024", conway: 3.7, national: 3.5, status: "worse" },
      { year: "2025", conway: 2.8, national: 3.4, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 3.4,
        nationalMean: 3.9,
        conwaySlope: -0.002,
        nationalSlope: -0.002,
        weight: 8.3,
      },
    ],
    "OP-18b/ED-3": [
      { year: "2019", conway: 124, national: 141.7, status: "better" },
      { year: "2020", conway: 122, national: 140.2, status: "better" },
      { year: "2021", conway: 152, national: 142.0, status: "worse" },
      { year: "2022", conway: 145, national: 143.1, status: "worse" },
      { year: "2023", conway: 180, national: 159.4, status: "worse" },
      { year: "2024", conway: 192, national: 162.1, status: "worse" },
      { year: "2025", conway: 204.0, national: 160.2, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 159.9,
        nationalMean: 149.8,
        conwaySlope: 14.571,
        nationalSlope: 4.161,
        weight: 8.3,
      },
    ],
    "IMM-3/OP-27": [
      { year: "2019", conway: 93.0, national: 87.2, status: "better" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: 99.0, national: 89.5, status: "better" },
      { year: "2022", conway: 99.0, national: 89.6, status: "better" },
      { year: "2023", conway: 98.0, national: 77.6, status: "better" },
      { year: "2024", conway: 90.0, national: 77.7, status: "better" },
      { year: "2025", conway: 96.0, national: 76.9, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 95.8,
        nationalMean: 83.1,
        conwaySlope: 0.004,
        nationalSlope: 0.005,
        weight: 8.3,
      },
    ],
    "OP-22": [
      { year: "2019", conway: 1.0, national: 1.6, status: "better" },
      { year: "2020", conway: 1.0, national: 1.5, status: "better" },
      { year: "2021", conway: 2.0, national: 1.5, status: "worse" },
      { year: "2022", conway: null, national: 1.4, status: "no data" },
      { year: "2023", conway: 3.0, national: 2.4, status: "worse" },
      { year: "2024", conway: 4.0, national: 2.4, status: "worse" },
      { year: "2025", conway: 4.0, national: 2.4, status: "worse" },
      { year: "2019-2025", conwayMean: 2.5, nationalMean: 1.9, conwaySlope: 0.003, nationalSlope: 0.002, weight: 8.3 },
    ],
    "OP-23": [
      { year: "2019", conway: 92.0, national: 74.0, status: "better" },
      { year: "2020", conway: 91.0, national: 73.2, status: "better" },
      { year: "2021", conway: null, national: 73.8, status: "no data" },
      { year: "2022", conway: null, national: 75.9, status: "no data" },
      { year: "2023", conway: 100.0, national: 71.2, status: "better" },
      { year: "2024", conway: 85.0, national: 70.2, status: "better" },
      { year: "2025", conway: 96.0, national: 70.8, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 92.8,
        nationalMean: 72.7,
        conwaySlope: 0.003,
        nationalSlope: -0.006,
        weight: 8.3,
      },
    ],
    "OP-29": [
      { year: "2019", conway: 39.0, national: 87.0, status: "worse" },
      { year: "2020", conway: 39.0, national: 87.0, status: "worse" },
      { year: "2021", conway: 56.0, national: 89.0, status: "worse" },
      { year: "2022", conway: 76.0, national: 89.8, status: "worse" },
      { year: "2023", conway: 67.0, national: 90.5, status: "worse" },
      { year: "2024", conway: 79.0, national: 91.3, status: "worse" },
      { year: "2025", conway: 79.0, national: 91.3, status: "worse" },
      {
        year: "2019-2025",
        conwayMean: 62.1,
        nationalMean: 89.4,
        conwaySlope: 0.075,
        nationalSlope: 0.008,
        weight: 8.3,
      },
    ],
    "PC-01": [
      { year: "2019", conway: 0.0, national: 1.8, status: "better" },
      { year: "2020", conway: 0.0, national: 1.7, status: "better" },
      { year: "2021", conway: 4.0, national: 1.7, status: "worse" },
      { year: "2022", conway: 5.0, national: 2.0, status: "worse" },
      { year: "2023", conway: 11.0, national: 2.3, status: "worse" },
      { year: "2024", conway: 1.0, national: 2.4, status: "better" },
      { year: "2025", conway: 3.0, national: 2.7, status: "worse" },
      { year: "2019-2025", conwayMean: 3.4, nationalMean: 2.1, conwaySlope: 0.006, nationalSlope: 0.002, weight: 8.3 },
    ],
    "SEP-1": [
      { year: "2019", conway: 54.0, national: 51.0, status: "better" },
      { year: "2020", conway: 62.0, national: 56.4, status: "better" },
      { year: "2021", conway: 64.0, national: 59.5, status: "better" },
      { year: "2022", conway: 65.0, national: 59.5, status: "better" },
      { year: "2023", conway: 55.0, national: 56.5, status: "similar" },
      { year: "2024", conway: 82.0, national: 58.7, status: "better" },
      { year: "2025", conway: 62.0, national: 60.4, status: "better" },
      {
        year: "2019-2025",
        conwayMean: 63.4,
        nationalMean: 57.4,
        conwaySlope: 0.02,
        nationalSlope: 0.011,
        weight: 8.3,
      },
    ],
    "Safe Use of Opioids": [
      { year: "2019", conway: null, national: null, status: "no data" },
      { year: "2020", conway: null, national: null, status: "no data" },
      { year: "2021", conway: null, national: null, status: "no data" },
      { year: "2022", conway: null, national: null, status: "no data" },
      { year: "2023", conway: null, national: null, status: "no data" },
      { year: "2024", conway: null, national: null, status: "no data" },
      { year: "2025", conway: 12.0, national: 15.1, status: "better" },
      { year: "2019-2025", conwayMean: 12.0, nationalMean: 15.1, conwaySlope: 0, nationalSlope: 0, weight: 8.3 },
    ],
  }

  // Define the getMeasureGroupPerformance function before it's used
  const getMeasureGroupPerformance = () => {
    return measures.map((measure) => {
      const data = performanceData[measure.id]
      if (!data || data.length === 0) return { ...measure, status: "no data" }

      // Find the latest year with data (excluding the aggregate 2019-2024 entry)
      let latestYearData = null
      for (let i = data.length - 2; i >= 0; i--) {
        if (data[i].conway !== null) {
          latestYearData = data[i]
          break
        }
      }

      if (!latestYearData) return { ...measure, status: "no data" }

      // Find the aggregate data
      const aggregateData = data.find((item) => item.year === "2019-2025")

      // Calculate the status based on the aggregate data (not the latest year)
      // This ensures we're using the mean values for status determination
      const status = calculateStatus(
        measure.id,
        aggregateData?.conwayMean || latestYearData.conway,
        aggregateData?.nationalMean || latestYearData.national,
      )

      return {
        ...measure,
        conway: aggregateData?.conwayMean || latestYearData.conway,
        national: aggregateData?.nationalMean || latestYearData.national,
        status: status, // Use the calculated status based on aggregate data
        year: latestYearData.year,
        aggregateData: aggregateData || {},
      }
    })
  }

  // Get data for the selected measure
  const selectedMeasureData = performanceData[selectedMeasure] || []

  // Calculate latest year performance
  const getLatestYearData = () => {
    if (selectedMeasureData.length === 0) return null

    // Find the latest year with data (excluding the aggregate entry)
    for (let i = selectedMeasureData.length - 2; i >= 0; i--) {
      if (selectedMeasureData[i].conway !== null) {
        return selectedMeasureData[i]
      }
    }
    return null
  }

  const latestData = getLatestYearData()

  // Get aggregate data (2019-2024)
  const getAggregateData = () => {
    if (selectedMeasureData.length === 0) return null

    // Find the aggregate entry
    return selectedMeasureData.find((item) => item.year === "2019-2025")
  }

  const aggregateData = getAggregateData()

  // Calculate performance trend based on slope
  const calculateTrend = () => {
    if (!aggregateData) return "neutral"

    const slope = aggregateData.conwaySlope

    // For readmission and mortality measures, lower is better
    const lowerIsBetter =
      selectedMeasureGroup === "Mortality" ||
      selectedMeasureGroup === "Readmission" ||
      selectedMeasure.startsWith("HAI-") ||
      selectedMeasure.startsWith("EDAC-") ||
      selectedMeasure.startsWith("PSI-") ||
      selectedMeasure === "COMP-HIP-KNEE" ||
      selectedMeasure === "PSI-90 Safety" ||
      selectedMeasure === "OP-32" ||
      selectedMeasure === "OP-35 ADM" ||
      selectedMeasure === "OP-35 ED" ||
      selectedMeasure === "OP-36" ||
      selectedMeasure === "PC-01" ||
      selectedMeasure === "OP-22"

    if (Math.abs(slope) < 0.05) return "stable"

    if (lowerIsBetter) {
      return slope < 0 ? "improving" : "worsening"
    } else {
      return slope > 0 ? "improving" : "worsening"
    }
  }

  const trend = calculateTrend()

  // Get all measures for the selected group
  const measures = measureData[selectedMeasureGroup] || []

  // Get latest performance for all measures in the selected group

  const measureGroupPerformance = getMeasureGroupPerformance()

  // Get radar chart data for the selected measure group
  const getRadarData = () => {
    const data = []

    measureGroupPerformance.forEach((measure) => {
      if (measure.conway !== undefined && measure.national !== undefined) {
        // Normalize the data for radar chart (higher is always better)
        const lowerIsBetter =
          selectedMeasureGroup === "Mortality" ||
          selectedMeasureGroup === "Readmission" ||
          measure.id.startsWith("HAI-")

        let conwayValue = measure.conway
        let nationalValue = measure.national

        // For measures where lower is better, invert the values for the radar chart
        if (lowerIsBetter) {
          // Use a scale where 0 is the worst possible value
          const maxValue = Math.max(conwayValue, nationalValue) * 1.2
          conwayValue = maxValue - conwayValue
          nationalValue = maxValue - nationalValue
        }

        data.push({
          measure: measure.id,
          name: measure.name.length > 30 ? measure.id : measure.name,
          Conway: conwayValue,
          National: nationalValue,
          weight: measure.weight,
        })
      }
    })

    return data
  }

  const radarData = getRadarData()

  // Get performance distribution data
  const getPerformanceDistribution = () => {
    const distribution = { better: 0, similar: 0, worse: 0, noData: 0 }
    let totalWeight = 0
    const weightedDistribution = { better: 0, similar: 0, worse: 0, noData: 0 }

    measureGroupPerformance.forEach((measure) => {
      if (measure.status === "better") {
        distribution.better++
        weightedDistribution.better += measure.weight
      } else if (measure.status === "similar") {
        distribution.similar++
        weightedDistribution.similar += measure.weight
      } else if (measure.status === "worse") {
        distribution.worse++
        weightedDistribution.worse += measure.weight
      } else {
        distribution.noData++
        weightedDistribution.noData += measure.weight
      }

      if (measure.status !== "no data") {
        totalWeight += measure.weight
      }
    })

    // Normalize weighted distribution
    if (totalWeight > 0) {
      weightedDistribution.better = (weightedDistribution.better / totalWeight) * 100
      weightedDistribution.similar = (weightedDistribution.similar / totalWeight) * 100
      weightedDistribution.worse = (weightedDistribution.worse / totalWeight) * 100
    }

    // Create distribution data array but filter out the "No Data" entry
    return [
      {
        name: "Better than National",
        count: distribution.better,
        value: distribution.better,
        color: "#2a9d8f",
      },
      {
        name: "Similar to National",
        count: distribution.similar,
        value: distribution.similar,
        color: "#f4a261",
      },
      {
        name: "Worse than National",
        count: distribution.worse,
        value: distribution.worse,
        color: "#e76f51",
      },
    ].filter((item) => item.value > 0) // Only include items with values greater than 0
  }

  const distributionData = getPerformanceDistribution()

  // Get slope analysis data with outlier handling
  const getSlopeAnalysisData = () => {
    // Adjusted slope values for measures with large slopes
    const adjustedSlopes = {
      "PSI-04": { conwaySlope: 0.00113, nationalSlope: 0.00137 },
      "EDAC-30-AMI": { conwaySlope: 2.682, nationalSlope: -0.356 },
      "EDAC-30-HF": { conwaySlope: -4.468, nationalSlope: -0.146 },
      "EDAC-30-PN": { conwaySlope: 3.568, nationalSlope: 0.122 },
      "HAI-5": { conwaySlope: -0.468, nationalSlope: -0.006 },
      "HCP-COVID-19": { conwaySlope: -0.447, nationalSlope: -0.377 },
      "OP-18b/ED-3": { conwaySlope: 0.0973, nationalSlope: 0.0278 },
      "OP-29": { conwaySlope: 0.075, nationalSlope: 0.008 },
    }

    const allData = measureGroupPerformance
      .filter((measure) => measure.aggregateData && measure.aggregateData.conwaySlope !== undefined)
      .map((measure) => {
        const originalConwaySlope = measure.aggregateData.conwaySlope
        const originalNationalSlope = measure.aggregateData.nationalSlope

        // Check if this measure has adjusted slopes
        const hasAdjustedSlopes = adjustedSlopes[measure.id]

        return {
          id: measure.id,
          name: measure.name,
          conwaySlope: originalConwaySlope,
          nationalSlope: originalNationalSlope,
          // Use adjusted slopes for display if available, otherwise use original
          displayConwaySlope: hasAdjustedSlopes ? adjustedSlopes[measure.id].conwaySlope : originalConwaySlope,
          displayNationalSlope: hasAdjustedSlopes ? adjustedSlopes[measure.id].nationalSlope : originalNationalSlope,
          hasAdjustedSlopes: !!hasAdjustedSlopes,
          weight: measure.weight,
        }
      })

    // Identify outliers based on original values (values that are significantly larger than others)
    const allSlopes = allData.flatMap((d) => [Math.abs(d.conwaySlope), Math.abs(d.nationalSlope)])
    const sortedSlopes = allSlopes.sort((a, b) => a - b)
    const q3Index = Math.floor(sortedSlopes.length * 0.75)
    const q3 = sortedSlopes[q3Index]
    const outlierThreshold = q3 * 3 // Values 3x larger than Q3 are considered outliers

    // Separate outliers from regular data based on original slopes
    const outliers = allData.filter(
      (d) => Math.abs(d.conwaySlope) > outlierThreshold || Math.abs(d.nationalSlope) > outlierThreshold,
    )

    const regularData = allData.filter(
      (d) => Math.abs(d.conwaySlope) <= outlierThreshold && Math.abs(d.nationalSlope) <= outlierThreshold,
    )

    return { regularData, outliers, allData }
  }

  const { regularData: slopeAnalysisData, outliers: slopeOutliers, allData: allSlopeData } = getSlopeAnalysisData()

  // Handle measure group change
  const handleMeasureGroupChange = (group) => {
    setSelectedMeasureGroup(group)
    // Set the first measure of the group as selected
    if (measureData[group] && measureData[group].length > 0) {
      setSelectedMeasure(measureData[group][0].id)
    }
  }

  // Prepare yearly data for charts (excluding the aggregate entry)
  const getYearlyData = () => {
    // Get the yearly data excluding the aggregate entry
    let yearlyData = selectedMeasureData.filter((item) => item.year !== "2019-2025")

    // Add forecasted data for top priority measures
    if (selectedMeasure === "EDAC-30-AMI") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 31.4,
          national: 4.9,
          status: calculateStatus("EDAC-30-AMI", 31.4, 4.9),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 34.1,
          national: 4.9,
          status: calculateStatus("EDAC-30-AMI", 34.1, 4.9),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "EDAC-30-PN") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 28.6,
          national: 5.6,
          status: calculateStatus("EDAC-30-PN", 28.6, 5.6),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 32.2,
          national: 5.6,
          status: calculateStatus("EDAC-30-PN", 32.2, 5.6),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "HAI-1") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 1.33,
          national: 0.85,
          status: calculateStatus("HAI-1", 1.33, 0.85),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 1.38,
          national: 0.85,
          status: calculateStatus("HAI-1", 1.38, 0.85),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "PSI-90 Safety") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 1.28,
          national: 0.99,
          status: calculateStatus("PSI-90 Safety", 1.28, 0.99),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 1.32,
          national: 0.99,
          status: calculateStatus("PSI-90 Safety", 1.32, 0.99),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "MORT-30-PN") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 20.3,
          national: 18.3,
          status: calculateStatus("MORT-30-PN", 20.3, 18.3),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 20.0,
          national: 18.3,
          status: calculateStatus("MORT-30-PN", 20.0, 18.3),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "MORT-30-COPD") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 10.3,
          national: 9.3,
          status: calculateStatus("MORT-30-COPD", 10.3, 9.3),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 10.2,
          national: 9.3,
          status: calculateStatus("MORT-30-COPD", 10.2, 9.3),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "PSI-04") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 185.8,
          national: 168.2,
          status: calculateStatus("PSI-04", 185.8, 168.2),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 187.0,
          national: 168.2,
          status: calculateStatus("PSI-04", 187.0, 168.2),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "MORT-30-HF") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 13.4,
          national: 11.7,
          status: calculateStatus("MORT-30-HF", 13.4, 11.7),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 13.7,
          national: 11.7,
          status: calculateStatus("MORT-30-HF", 13.7, 11.7),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "MORT-30-STK") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 15.9,
          national: 13.5,
          status: calculateStatus("MORT-30-STK", 15.9, 13.5),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 16.5,
          national: 13.5,
          status: calculateStatus("MORT-30-STK", 16.5, 13.5),
          forecasted: true,
        },
      ]
    } else if (selectedMeasure === "OP-29") {
      yearlyData = [
        ...yearlyData,
        {
          year: "2026",
          conway: 92.3,
          national: 92.7,
          status: calculateStatus("OP-29", 92.3, 92.7),
          forecasted: true,
        },
        {
          year: "2027",
          conway: 99.8,
          national: 92.7,
          status: calculateStatus("OP-29", 99.8, 92.7),
          forecasted: true,
        },
      ]
    }

    // Create separate data keys for historical vs forecasted data
    return yearlyData.map((item, index) => {
      const isForecasted = item.forecasted
      const nextItem = index < yearlyData.length - 1 ? yearlyData[index + 1] : null
      const isTransitionPoint = !isForecasted && nextItem?.forecasted

      return {
        ...item,
        status: item.status || calculateStatus(selectedMeasure, item.conway, item.national),
        // Historical data (include transition point for continuity)
        conwayHistorical: !isForecasted ? item.conway : null,
        nationalHistorical: !isForecasted ? item.national : null,
        // Forecasted data (start from transition point)
        conwayForecasted: isForecasted || isTransitionPoint ? item.conway : null,
        nationalForecasted: isForecasted || isTransitionPoint ? item.national : null,
      }
    })
  }

  const yearlyData = getYearlyData()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col items-center text-center gap-4">
            <img src="/medisolv-logo.png" alt="Medisolv Logo" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Conway Medical Center Star Ratings Dashboard</h1>
              <p className="text-gray-600 mt-1">Historical analysis of Conway's Star Ratings (2019-2025)</p>
            </div>
          </div>
        </div>

        {/* Star Rating Overview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="text-lg font-bold text-center text-gray-800 mb-4">2025 Star Ratings</h3>
          {/* Centered Star Rating Cards */}
          <div className="flex justify-center gap-3 mb-6">
            {/* Conway Star Rating Card */}
            <div className="flex flex-col items-center">
              <div className="border-2 border-red-600 rounded-lg p-2 bg-gray-50 w-full max-w-24">
                <h3 className="text-base font-bold text-center text-gray-800 mb-1">Conway</h3>
                <div className="flex justify-center mb-1">
                  <div className="flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`w-2.5 h-2.5 ${
                          index < Math.floor(3) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-lg font-bold text-center text-gray-800">0.07</p>
              </div>
            </div>

            {/* National Star Rating Card */}
            <div className="flex flex-col items-center">
              <div className="border-2 border-red-600 rounded-lg p-2 bg-gray-50 w-full max-w-24">
                <h3 className="text-base font-bold text-center text-gray-800 mb-1">National</h3>
                <div className="flex justify-center mb-1">
                  <div className="flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`w-2.5 h-2.5 ${
                          index < Math.floor(3) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-lg font-bold text-center text-gray-800">-0.03</p>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Star Rating Trend Chart */}
            <div>
              <h3 className="text-lg font-bold text-center text-gray-800 mb-4">
                Seven Year Star Rating Overall Score (2019 - 2025)
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={starRatingData} margin={{ top: 15, right: 20, left: 15, bottom: 15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#64748b" axisLine={{ stroke: "#d1d5db" }} />
                    <YAxis
                      domain={[-1.5, 1.5]}
                      tick={{ fontSize: 12 }}
                      stroke="#64748b"
                      axisLine={{ stroke: "#d1d5db" }}
                      tickFormatter={(value) => value.toFixed(1)}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        const displayName =
                          name === "conway"
                            ? "Conway's Measure Result"
                            : name === "national"
                              ? "National Mean of Scores"
                              : "Median of 5 Star Hospitals"
                        return [value.toFixed(2), displayName]
                      }}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: "20px" }}
                      formatter={(value) => {
                        if (value === "conway") return "Conway's Measure Result"
                        if (value === "national") return "National Mean of Scores"
                        if (value === "median5Star") return "Median of 5 Star Hospitals"
                        return value
                      }}
                    />
                    <ReferenceLine y={0} stroke="#64748b" strokeWidth={1} strokeDasharray="2 2" />

                    {/* Conway's Measure Line - Dark Blue/Purple */}
                    <Line
                      type="monotone"
                      dataKey="conway"
                      name="conway"
                      stroke="#1e3a8a"
                      strokeWidth={3}
                      dot={{ fill: "#1e3a8a", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#1e3a8a" }}
                    />

                    {/* National Mean Line - Teal */}
                    <Line
                      type="monotone"
                      dataKey="national"
                      name="national"
                      stroke="#0d9488"
                      strokeWidth={2}
                      dot={{ fill: "#0d9488", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#0d9488" }}
                    />

                    {/* Median of 5 Star Line - Beige/Tan */}
                    <Line
                      type="monotone"
                      dataKey="median5Star"
                      name="median5Star"
                      stroke="#a3a3a3"
                      strokeWidth={2}
                      dot={{ fill: "#a3a3a3", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#a3a3a3" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conway's 7 Year Measure Group Scores Chart */}
            <div>
              <h3 className="text-lg font-bold text-center text-gray-800 mb-4">Conway's 7 Year Measure Group Scores</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={measureGroupScoresData} margin={{ top: 15, right: 20, left: 15, bottom: 15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#64748b" axisLine={{ stroke: "#d1d5db" }} />
                    <YAxis
                      domain={[-2.5, 1.5]}
                      tick={{ fontSize: 12 }}
                      stroke="#64748b"
                      axisLine={{ stroke: "#d1d5db" }}
                      tickFormatter={(value) => value.toFixed(1)}
                    />
                    <Tooltip
                      formatter={(value, name) => [value.toFixed(1), name]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <ReferenceLine y={0} stroke="#64748b" strokeWidth={1} strokeDasharray="2 2" />

                    {/* Mortality - Solid dark line */}
                    <Line
                      type="monotone"
                      dataKey="Mortality"
                      stroke="#374151"
                      strokeWidth={3}
                      dot={{ fill: "#374151", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#374151" }}
                    />

                    {/* Readmission - Dash-dot teal line */}
                    <Line
                      type="monotone"
                      dataKey="Readmission"
                      stroke="#0d9488"
                      strokeWidth={2}
                      strokeDasharray="8 4 2 4"
                      dot={{ fill: "#0d9488", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#0d9488" }}
                    />

                    {/* Safety of Care - Dashed green line */}
                    <Line
                      type="monotone"
                      dataKey="Safety of Care"
                      stroke="#16a34a"
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      dot={{ fill: "#16a34a", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#16a34a" }}
                    />

                    {/* Patient Experience - Dotted brown/maroon line */}
                    <Line
                      type="monotone"
                      dataKey="Patient Experience"
                      stroke="#92400e"
                      strokeWidth={2}
                      strokeDasharray="2 4"
                      dot={{ fill: "#92400e", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#92400e" }}
                    />

                    {/* Timely & Effective Care - Dash-dot orange line */}
                    <Line
                      type="monotone"
                      dataKey="Timely & Effective Care"
                      stroke="#ea580c"
                      strokeWidth={2}
                      strokeDasharray="8 4 2 4"
                      dot={{ fill: "#ea580c", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#ea580c" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <Card className="medisolv-card mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-primary">
              Performance Distribution: Comparison to National Benchmarks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[120px]">
              <ResponsiveContainer width="75%" height="100%">
                <BarChart data={distributionData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, "dataMax"]} tick={{ fontSize: 11 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={140}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) =>
                      value === "No Data"
                        ? value
                        : `${value} (${distributionData.find((d) => d.name === value)?.count || 0})`
                    }
                  />
                  <Tooltip
                    formatter={(value, name, props) => [`${value} measures`]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "10px",
                      padding: "5px 7px",
                      minWidth: "auto",
                    }}
                    labelStyle={{
                      fontSize: "11px",
                      margin: 0,
                    }}
                  />
                  <Bar dataKey="value" nameKey="name" radius={[0, 4, 4, 0]}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-primary mb-2">Measure Groups</h4>
              <div className="flex flex-wrap gap-1.5">
                {measureGroups.map((group) => (
                  <Button
                    key={group}
                    variant={selectedMeasureGroup === group ? "default" : "outline"}
                    className={`text-xs h-auto py-1 px-2 ${
                      selectedMeasureGroup === group
                        ? "bg-primary hover:bg-primary-800 text-white shadow-sm"
                        : "medisolv-button-secondary"
                    }`}
                    onClick={() => handleMeasureGroupChange(group)}
                  >
                    {group}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Tabs value={selectedAnalysisTab} onValueChange={setSelectedAnalysisTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="measures"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
              >
                Measures
              </TabsTrigger>
              <TabsTrigger
                value="trends"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
              >
                Trend Analysis
              </TabsTrigger>
              <TabsTrigger
                value="scatter"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
              >
                Underperforming Measures
              </TabsTrigger>
            </TabsList>

            <TabsContent value="measures" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {measureGroupPerformance.map((measure) => (
                  <Card
                    key={measure.id}
                    className={`medisolv-card cursor-pointer transition-all duration-200 ${
                      selectedMeasure === measure.id
                        ? "border-secondary shadow-md ring-2 ring-secondary/20"
                        : "hover:shadow-md hover:border-gray-300"
                    } ${
                      // Add bright red border for top priority measures
                      topPriorityMeasures.includes(measure.id) ? "!border-red-500 !border-2 shadow-lg" : ""
                    }`}
                    onClick={() => setSelectedMeasure(measure.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-1 flex-wrap">
                          <CardTitle className="text-xs font-semibold text-primary">{measure.id}</CardTitle>
                          {(measure.id === "MORT-30-CABG" ||
                            measure.id === "READM-30-CABG" ||
                            measure.id === "READM-30-STK") && (
                            <span className="text-[10px] text-gray-500">(No recent data)</span>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          {measure.status === "better" && <Badge className="medisolv-badge-success">Better</Badge>}
                          {measure.status === "similar" && <Badge className="medisolv-badge-warning">Similar</Badge>}
                          {measure.status === "worse" && <Badge className="medisolv-badge-error">Worse</Badge>}
                          {measure.status === "no data" && <Badge className="medisolv-badge-neutral">No Data</Badge>}
                        </div>
                      </div>
                      <CardDescription className="line-clamp-3 text-xs text-gray-600 leading-relaxed">
                        {measure.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      {measure.conway !== undefined && measure.national !== undefined ? (
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-0.5">Conway</p>
                            <p className="text-base font-bold text-primary">
                              {typeof measure.conway === "number" ? measure.conway.toFixed(1) : measure.conway}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-0.5">National</p>
                            <p className="text-base font-bold text-gray-700">
                              {typeof measure.national === "number" ? measure.national.toFixed(1) : measure.national}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-0.5">Weight</p>
                            <p className="text-base font-bold text-secondary">{measure.weight.toFixed(1)}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 text-center py-2">No recent data available</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedMeasure && (
                <Card className="medisolv-card p-0">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-primary mb-1">{selectedMeasure}</CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed">
                          {measures.find((m) => m.id === selectedMeasure)?.name}
                        </CardDescription>
                      </div>
                      {latestData && (
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            className={`${
                              trend === "improving" ? "medisolv-badge-success" : ""
                            }${trend === "worsening" ? "medisolv-badge-error" : ""}${
                              trend === "stable" ? "medisolv-badge-warning" : ""
                            }${trend === "neutral" ? "medisolv-badge-neutral" : ""}`}
                          >
                            {trend === "improving" && <ArrowUpIcon className="h-3 w-3 mr-1" />}
                            {trend === "worsening" && <ArrowDownIcon className="h-3 w-3 mr-1" />}
                            {trend === "stable" && <MinusIcon className="h-3 w-3 mr-1" />}
                            {trend === "improving"
                              ? "Improving"
                              : trend === "worsening"
                                ? "Worsening"
                                : trend === "stable"
                                  ? "Stable"
                                  : "Neutral"}
                          </Badge>
                          <Badge
                            className={`${
                              latestData.status === "better" ? "medisolv-badge-success" : ""
                            }${latestData.status === "similar" ? "medisolv-badge-warning" : ""}${
                              latestData.status === "worse" ? "medisolv-badge-error" : ""
                            }`}
                          >
                            {latestData.status === "better"
                              ? "Better than National"
                              : latestData.status === "similar"
                                ? "Similar to National"
                                : "Worse than National"}
                          </Badge>
                          <Badge className="medisolv-badge-neutral">Weight: {aggregateData?.weight.toFixed(1)}</Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px] mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={yearlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#64748b" />
                          <YAxis
                            domain={(() => {
                              const allValues = yearlyData
                                .flatMap((d) => [d.conway, d.national])
                                .filter((v) => v !== null && v !== undefined)
                              if (allValues.length === 0) return ["auto", "auto"]
                              const min = Math.min(...allValues)
                              const max = Math.max(...allValues)
                              const range = max - min
                              const padding = Math.max(range * 0.1, range === 0 ? 1 : 0)
                              return [Math.max(0, min - padding), max + padding]
                            })()}
                            tickFormatter={(value) => {
                              if (typeof value === "number") {
                                return Number.parseFloat(value.toFixed(2)).toString()
                              }
                              return value
                            }}
                            tick={{ fontSize: 12 }}
                            stroke="#64748b"
                          />
                          <Tooltip
                            formatter={(value, name, props) => {
                              const isForecasted = props.payload?.forecasted
                              const year = props.payload?.year
                              // Don't show "(Forecasted)" label for 2025, even if it's from forecasted data keys
                              const label = isForecasted && year !== "2025" ? " (Forecasted)" : ""

                              // For 2025 transition point, only show historical data
                              if (year === "2025" && (name === "conwayForecasted" || name === "nationalForecasted")) {
                                return null
                              }

                              if (name === "conwayHistorical" || name === "conwayForecasted") {
                                return [value !== null ? value.toFixed(2) : "N/A", `Conway${label}`]
                              } else if (name === "nationalHistorical" || name === "nationalForecasted") {
                                return [value !== null ? value.toFixed(2) : "N/A", `National${label}`]
                              }
                              return [value !== null ? value.toFixed(2) : "N/A", name]
                            }}
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            }}
                          />

                          {/* Historical Conway Line (Blue Solid) */}
                          <Line
                            type="monotone"
                            dataKey="conwayHistorical"
                            name="conwayHistorical"
                            stroke="#2d5aa0"
                            activeDot={{ r: 6, fill: "#2d5aa0" }}
                            connectNulls
                            strokeWidth={3}
                          />

                          {/* Historical National Line (Blue Dashed) */}
                          <Line
                            type="monotone"
                            dataKey="nationalHistorical"
                            name="nationalHistorical"
                            stroke="#1e3a5f"
                            connectNulls
                            strokeWidth={2}
                            strokeDasharray="8 4"
                          />

                          {/* Forecasted Conway Line (Red Solid) */}
                          <Line
                            type="monotone"
                            dataKey="conwayForecasted"
                            name="conwayForecasted"
                            stroke="#dc2626"
                            activeDot={{ r: 6, fill: "#dc2626" }}
                            connectNulls
                            strokeWidth={3}
                          />

                          {/* Forecasted National Line (Red Dashed) */}
                          <Line
                            type="monotone"
                            dataKey="nationalForecasted"
                            name="nationalForecasted"
                            stroke="#dc2626"
                            connectNulls
                            strokeWidth={2}
                            strokeDasharray="8 4"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {aggregateData && (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Conway Mean</p>
                          <p className="text-xl font-bold text-primary">{aggregateData.conwayMean.toFixed(1)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">National Mean</p>
                          <p className="text-xl font-bold text-gray-700">{aggregateData.nationalMean.toFixed(1)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Conway Slope</p>
                          <p className="text-xl font-bold text-secondary">{aggregateData.conwaySlope.toFixed(3)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">National Slope</p>
                          <p className="text-xl font-bold text-gray-700">{aggregateData.nationalSlope.toFixed(3)}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="trends" className="mt-6">
              <Card className="medisolv-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-primary">Trend Slope Analysis (2019-2025)</CardTitle>
                  <CardDescription className="text-gray-600">
                    Direction and magnitude of change over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={allSlopeData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                          type="number"
                          domain={(() => {
                            const allValues = allSlopeData.flatMap((d) => [
                              d.displayConwaySlope,
                              d.displayNationalSlope,
                            ])
                            if (allValues.length === 0) return [-0.1, 0.1]
                            const min = Math.min(...allValues)
                            const max = Math.max(...allValues)
                            const range = max - min
                            const padding = Math.max(range * 0.1, 0.05)
                            return [min - padding, max + padding]
                          })()}
                          tickFormatter={(value) => {
                            if (typeof value === "number") {
                              return Number.parseFloat(value.toFixed(3)).toString()
                            }
                            return value
                          }}
                          tick={{ fontSize: 11 }}
                          stroke="#64748b"
                        />
                        <YAxis
                          dataKey="id"
                          type="category"
                          width={100}
                          tick={{ fontSize: 11 }}
                          stroke="#64748b"
                          tickFormatter={(value) => {
                            const measure = allSlopeData.find((d) => d.id === value)
                            return measure?.hasAdjustedSlopes ? `${value}*` : value
                          }}
                        />
                        <Tooltip
                          cursor={{ strokeDasharray: "3 3" }}
                          formatter={(value, name, props) => {
                            const measure = props.payload
                            if (name === "displayConwaySlope") {
                              return [
                                `${measure.conwaySlope}${measure.hasAdjustedSlopes ? ` (displayed: ${value})` : ""}`,
                                "Conway Trend",
                              ]
                            } else if (name === "displayNationalSlope") {
                              return [
                                `${measure.nationalSlope}${measure.hasAdjustedSlopes ? ` (displayed: ${value})` : ""}`,
                                "National Trend",
                              ]
                            }
                            return [value, name]
                          }}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="displayConwaySlope" name="Conway Trend" fill="#2d5aa0" radius={[0, 2, 2, 0]} />
                        <Bar
                          dataKey="displayNationalSlope"
                          name="National Trend"
                          fill="#1e3a5f"
                          opacity={0.7}
                          radius={[0, 2, 2, 0]}
                        />
                        <ReferenceLine x={0} stroke="#64748b" strokeWidth={1} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-2">Chart Display Notes:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Measures marked with (*) use adjusted slope values for better visual comparison</li>
                      <li>• Adjusted slopes help maintain chart readability while preserving data accuracy</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="scatter" className="mt-6">
              <Card className="medisolv-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-primary">Underperforming Measures</CardTitle>
                  <CardDescription className="text-gray-600">
                    Measures with the largest performance gaps compared to national benchmarks (sorted by difference)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={underperformingMeasuresData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                          type="number"
                          domain={[0, "dataMax"]}
                          tick={{ fontSize: 11 }}
                          tickFormatter={(value) => value.toFixed(3)}
                        />
                        <YAxis
                          dataKey="measureId"
                          type="category"
                          width={180}
                          tick={{ fontSize: 10 }}
                          stroke="#64748b"
                        />
                        <Tooltip
                          formatter={(value, name, props) => {
                            const data = props.payload
                            return [`Gap: ${value.toFixed(4)}`, `${data.measureGroup}`]
                          }}
                          content={(props) => {
                            if (!props.active || !props.payload || props.payload.length === 0) {
                              return null
                            }
                            const data = props.payload[0].payload
                            return (
                              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm max-w-sm">
                                <p className="font-semibold text-sm text-primary mb-1">{data.measureId}</p>
                                <p className="text-xs text-gray-600 mb-3 leading-relaxed">{data.measureName}</p>
                                <div className="space-y-1">
                                  <p className="text-xs">
                                    <span className="font-medium">Conway Mean:</span> {data.conwayMean.toFixed(3)}
                                  </p>
                                  <p className="text-xs">
                                    <span className="font-medium">National Mean:</span> {data.nationalMean.toFixed(3)}
                                  </p>
                                  <p className="text-xs">
                                    <span className="font-medium">Difference:</span> {data.difference.toFixed(3)}
                                  </p>
                                  <p className="text-xs">
                                    <span className="font-medium">Percentage Gap:</span> {data.percentageGap.toFixed(1)}
                                    %
                                  </p>
                                  <p className="text-xs">
                                    <span className="font-medium">Weight:</span> {data.weight}
                                  </p>
                                </div>
                              </div>
                            )
                          }}
                        />
                        <Bar dataKey="difference" fill="#2d5aa0" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
