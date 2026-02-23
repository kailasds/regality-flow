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

export const trendData = [
  { month: "Jan", received: 94, closed: 70, closureRate: 74 },
  { month: "Feb", received: 110, closed: 83, closureRate: 75 },
  { month: "Mar", received: 128, closed: 76, closureRate: 59 },
];

export const distributionData = [
  { name: "Processing", value: 18, color: "hsl(263, 70%, 58%)" },
  { name: "Under Review", value: 11, color: "hsl(280, 80%, 65%)" },
  { name: "For Action", value: 8, color: "hsl(38, 92%, 50%)" },
  { name: "Closed", value: 76, color: "hsl(142, 71%, 45%)" },
];
