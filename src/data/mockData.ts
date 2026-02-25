export interface Notification {
  id: string;
  regulator: string;
  subject: string;
  stage: "Pending" | "Closed";
  subStatus: "Processing" | "Under Review" | "For Action" | "Closed";
  assignedTo: string;
  lastUpdated: string;
  department?: string;
  metadata?: MetadataFields;
}

export interface MetadataFields {
  documentType: string;
  effectiveDate: string;
  expiryDate: string;
  riskLevel: string;
  affectedDepartments: string[];
  confidences: Record<string, number>;
}

export const notifications: Notification[] = [
  {
    id: "N-1024",
    regulator: "RBI",
    subject: "Revised KYC Norms",
    stage: "Pending",
    subStatus: "Processing",
    assignedTo: "AI Engine",
    lastUpdated: "2 hrs ago",
    department: "Compliance",
    metadata: {
      documentType: "Regulatory Circular",
      effectiveDate: "12 Feb 2026",
      expiryDate: "12 Feb 2027",
      riskLevel: "Medium",
      affectedDepartments: ["Compliance", "Mortgage"],
      confidences: {
        documentType: 94,
        effectiveDate: 91,
        expiryDate: 87,
        riskLevel: 82,
        affectedDepartments: 89,
      },
    },
  },
  {
    id: "N-1023",
    regulator: "SEBI",
    subject: "ESG Disclosure Update",
    stage: "Pending",
    subStatus: "Under Review",
    assignedTo: "John Mathew",
    lastUpdated: "5 hrs ago",
    department: "Risk",
  },
  {
    id: "N-1022",
    regulator: "IRDAI",
    subject: "Capital Adequacy Rule",
    stage: "Pending",
    subStatus: "For Action",
    assignedTo: "Mortgage Dept",
    lastUpdated: "1 day ago",
    department: "Mortgage",
  },
  {
    id: "N-1021",
    regulator: "RBI",
    subject: "Compliance Audit",
    stage: "Closed",
    subStatus: "Closed",
    assignedTo: "—",
    lastUpdated: "2 days ago",
    department: "Compliance",
  },
  {
    id: "N-1020",
    regulator: "SEBI",
    subject: "Insider Trading Guidelines",
    stage: "Closed",
    subStatus: "Closed",
    assignedTo: "—",
    lastUpdated: "3 days ago",
    department: "Legal",
  },
  {
    id: "N-1019",
    regulator: "IRDAI",
    subject: "Solvency Margin Update",
    stage: "Pending",
    subStatus: "Under Review",
    assignedTo: "Priya Sharma",
    lastUpdated: "6 hrs ago",
    department: "Finance",
  },
  {
    id: "N-1018",
    regulator: "RBI",
    subject: "Digital Lending Framework",
    stage: "Closed",
    subStatus: "Closed",
    assignedTo: "—",
    lastUpdated: "5 days ago",
    department: "Digital Banking",
  },
];

export const timelineEvents = [
  { label: "Uploaded", date: "12 Feb", done: true },
  { label: "Metadata Completed", date: "12 Feb", done: true },
  { label: "Analysis Completed", date: "13 Feb", done: true },
  { label: "Sent to Review", date: "13 Feb", done: true },
  { label: "Approved", date: "15 Feb", done: false },
  { label: "Assigned to Business", date: "15 Feb", done: false },
  { label: "Closed", date: "18 Feb", done: false },
];

export const trendData3m = [
  { month: "Jan", received: 94, closed: 70, closureRate: 74 },
  { month: "Feb", received: 110, closed: 83, closureRate: 75 },
  { month: "Mar", received: 128, closed: 76, closureRate: 59 },
];

export const trendData6m = [
  { month: "Oct", received: 78, closed: 62, closureRate: 79 },
  { month: "Nov", received: 85, closed: 68, closureRate: 80 },
  { month: "Dec", received: 92, closed: 74, closureRate: 80 },
  { month: "Jan", received: 94, closed: 70, closureRate: 74 },
  { month: "Feb", received: 110, closed: 83, closureRate: 75 },
  { month: "Mar", received: 128, closed: 76, closureRate: 59 },
];

export const trendData12m = [
  { month: "Apr", received: 65, closed: 52, closureRate: 80 },
  { month: "May", received: 72, closed: 58, closureRate: 81 },
  { month: "Jun", received: 68, closed: 55, closureRate: 81 },
  { month: "Jul", received: 74, closed: 60, closureRate: 81 },
  { month: "Aug", received: 80, closed: 65, closureRate: 81 },
  { month: "Sep", received: 76, closed: 61, closureRate: 80 },
  { month: "Oct", received: 78, closed: 62, closureRate: 79 },
  { month: "Nov", received: 85, closed: 68, closureRate: 80 },
  { month: "Dec", received: 92, closed: 74, closureRate: 80 },
  { month: "Jan", received: 94, closed: 70, closureRate: 74 },
  { month: "Feb", received: 110, closed: 83, closureRate: 75 },
  { month: "Mar", received: 128, closed: 76, closureRate: 59 },
];

// Keep backward compat
export const trendData = trendData3m;

export const distributionData = [
  { name: "Processing", value: 18, color: "hsl(263, 70%, 58%)" },
  { name: "Under Review", value: 11, color: "hsl(280, 80%, 65%)" },
  { name: "For Action", value: 8, color: "hsl(38, 92%, 50%)" },
  { name: "Closed", value: 76, color: "hsl(142, 71%, 45%)" },
];

export const trendDistributionData: Record<string, { data: typeof distributionData; total: number }> = {
  "1m": {
    total: 128,
    data: [
      { name: "Processing", value: 18, color: "hsl(263, 70%, 58%)" },
      { name: "Under Review", value: 11, color: "hsl(280, 80%, 65%)" },
      { name: "For Action", value: 8, color: "hsl(38, 92%, 50%)" },
      { name: "Closed", value: 76, color: "hsl(142, 71%, 45%)" },
    ],
  },
  "2m": {
    total: 238,
    data: [
      { name: "Processing", value: 32, color: "hsl(263, 70%, 58%)" },
      { name: "Under Review", value: 24, color: "hsl(280, 80%, 65%)" },
      { name: "For Action", value: 15, color: "hsl(38, 92%, 50%)" },
      { name: "Closed", value: 159, color: "hsl(142, 71%, 45%)" },
    ],
  },
  "3m": {
    total: 332,
    data: [
      { name: "Processing", value: 48, color: "hsl(263, 70%, 58%)" },
      { name: "Under Review", value: 36, color: "hsl(280, 80%, 65%)" },
      { name: "For Action", value: 22, color: "hsl(38, 92%, 50%)" },
      { name: "Closed", value: 229, color: "hsl(142, 71%, 45%)" },
    ],
  },
  "6m": {
    total: 587,
    data: [
      { name: "Processing", value: 74, color: "hsl(263, 70%, 58%)" },
      { name: "Under Review", value: 58, color: "hsl(280, 80%, 65%)" },
      { name: "For Action", value: 41, color: "hsl(38, 92%, 50%)" },
      { name: "Closed", value: 397, color: "hsl(142, 71%, 45%)" },
    ],
  },
};
