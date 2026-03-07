import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { toast } from "sonner";

export interface NotificationItem {
  id: string;
  regulator: string;
  subject: string;
  subStatus: "For Processing" | "Under Review" | "For Action" | "Processed" | "Closed";
  assignedTo: string;
  lastUpdated: string;
  department: string;
  month: string;
  dateReceived: string;
  reference: string;
  attachment?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "N-1024",
    regulator: "RBI",
    subject: "Revised KYC Norms",
    subStatus: "Under Review",
    assignedTo: "AI Engine",
    lastUpdated: "2 hrs ago",
    department: "Compliance",
    month: "March 2026",
    dateReceived: "2026-03-04",
    reference: "RBI-KYC-24",
    attachment: "KYC_Norms.pdf",
  },
  {
    id: "N-1023",
    regulator: "SEBI",
    subject: "ESG Disclosure Update",
    subStatus: "Under Review",
    assignedTo: "John Mathew",
    lastUpdated: "5 hrs ago",
    department: "Risk",
    month: "March 2026",
    dateReceived: "2026-03-03",
    reference: "SEBI-ESG-23",
    attachment: "ESG_Update.pdf",
  },
  {
    id: "N-1022",
    regulator: "IRDAI",
    subject: "Capital Adequacy Rule",
    subStatus: "For Action",
    assignedTo: "Mortgage Dept",
    lastUpdated: "1 day ago",
    department: "Mortgage",
    month: "March 2026",
    dateReceived: "2026-03-02",
    reference: "IRDAI-CAR-22",
    attachment: "Capital_Rule.pdf",
  },
  {
    id: "N-1021",
    regulator: "RBI",
    subject: "Compliance Audit",
    subStatus: "Closed",
    assignedTo: "—",
    lastUpdated: "2 days ago",
    department: "Compliance",
    month: "February 2026",
    dateReceived: "2026-02-20",
    reference: "RBI-AUD-21",
    attachment: "Audit_Report.pdf",
  },
  {
    id: "N-1020",
    regulator: "SEBI",
    subject: "Insider Trading Guidelines",
    subStatus: "Closed",
    assignedTo: "—",
    lastUpdated: "3 days ago",
    department: "Legal",
    month: "February 2026",
    dateReceived: "2026-02-18",
    reference: "SEBI-ITG-20",
    attachment: "Trading_Guidelines.pdf",
  },
  {
    id: "N-1019",
    regulator: "IRDAI",
    subject: "Solvency Margin Update",
    subStatus: "Under Review",
    assignedTo: "Priya Sharma",
    lastUpdated: "6 hrs ago",
    department: "Finance",
    month: "February 2026",
    dateReceived: "2026-02-15",
    reference: "IRDAI-SMU-19",
    attachment: "Solvency_Update.pdf",
  },
  {
    id: "N-1018",
    regulator: "RBI",
    subject: "Digital Lending Framework",
    subStatus: "Processed",
    assignedTo: "Tech Team",
    lastUpdated: "5 days ago",
    department: "Digital Banking",
    month: "January 2026",
    dateReceived: "2026-01-22",
    reference: "RBI-DLF-18",
    attachment: "Lending_Framework.pdf",
  },
  {
    id: "N-1017",
    regulator: "SEBI",
    subject: "Mutual Fund Regulation",
    subStatus: "For Action",
    assignedTo: "Risk Dept",
    lastUpdated: "1 day ago",
    department: "Risk",
    month: "March 2026",
    dateReceived: "2026-03-01",
    reference: "SEBI-MFR-17",
    attachment: "MF_Regulation.pdf",
  },
  {
    id: "N-1016",
    regulator: "RBI",
    subject: "AML Guidelines Update",
    subStatus: "For Action",
    assignedTo: "Compliance Dept",
    lastUpdated: "12 hrs ago",
    department: "Compliance",
    month: "February 2026",
    dateReceived: "2026-02-14",
    reference: "RBI-AML-16",
    attachment: "AML_Guidelines.pdf",
  },
  {
    id: "N-1015",
    regulator: "IRDAI",
    subject: "Insurance Product Standards",
    subStatus: "For Action",
    assignedTo: "Product Dept",
    lastUpdated: "2 days ago",
    department: "Product",
    month: "February 2026",
    dateReceived: "2026-02-10",
    reference: "IRDAI-IPS-15",
    attachment: "Product_Standards.pdf",
  },
  {
    id: "N-1014",
    regulator: "SEBI",
    subject: "Broker Compliance Update",
    subStatus: "Under Review",
    assignedTo: "Legal Team",
    lastUpdated: "4 hrs ago",
    department: "Legal",
    month: "March 2026",
    dateReceived: "2026-03-05",
    reference: "SEBI-BCU-14",
  },
  {
    id: "N-1013",
    regulator: "RBI",
    subject: "Foreign Exchange Norms",
    subStatus: "Under Review",
    assignedTo: "Treasury",
    lastUpdated: "8 hrs ago",
    department: "Treasury",
    month: "March 2026",
    dateReceived: "2026-03-04",
    reference: "RBI-FEN-13",
    attachment: "Forex_Norms.pdf",
  },
];

let idCounter = 1057;

interface NotificationContextType {
  notifications: NotificationItem[];
  addNotification: (n: Partial<NotificationItem>) => void;
  moveNotification: (id: string, newStatus: NotificationItem["subStatus"]) => void;
  getByStatus: (...statuses: NotificationItem["subStatus"][]) => NotificationItem[];
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const addNotification = useCallback((partial: Partial<NotificationItem>) => {
    const newId = `N-${idCounter++}`;
    const n: NotificationItem = {
      id: newId,
      regulator: partial.regulator || "RBI",
      subject: partial.subject || "New Regulatory Notification",
      subStatus: "Under Review",
      assignedTo: "AI Engine",
      lastUpdated: "Just now",
      department: partial.department || "Compliance",
      month: "March 2026",
      dateReceived: new Date().toISOString().split("T")[0],
      reference: `REF-${newId}`,
      attachment: partial.attachment,
    };
    setNotifications((prev) => [n, ...prev]);
    toast.success("Notification moved to Pending - Under Review", {
      description: `${n.id} — ${n.subject} has completed AI processing.`,
    });
    return n;
  }, []);

  const moveNotification = useCallback((id: string, newStatus: NotificationItem["subStatus"]) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, subStatus: newStatus, lastUpdated: "Just now" } : n
      )
    );
    const statusLabels: Record<string, string> = {
      "For Processing": "Pending - For Processing",
      "Under Review": "Pending - Under Review",
      "For Action": "Pending - For Action",
      Processed: "Processed Notifications",
      Closed: "Closed Notifications",
    };
    toast.success(`Notification moved to ${statusLabels[newStatus]}`, {
      description: `${id} status updated successfully.`,
    });
  }, []);

  const getByStatus = useCallback(
    (...statuses: NotificationItem["subStatus"][]) =>
      notifications.filter((n) => statuses.includes(n.subStatus)),
    [notifications]
  );

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, moveNotification, getByStatus }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
