# Product Requirements Document (PRD): EduTeach Platform

## 1. Product Vision & Overview
**EduTeach** is a modern, enterprise-ready Educational Technology (EdTech) SaaS platform designed to streamline and elevate the management of tutoring centers, educational academies, and independent teaching businesses. It serves as a unified ecosystem connecting Administrators, Tutors, and Students through dedicated, role-specific portals. 

The goal of EduTeach is to eliminate administrative friction, provide transparent financial tracking, and foster a data-driven approach to student learning and tutor performance.

## 2. Target Audience & Personas

### 2.1 Center Administrators / Owners
*   **Goal:** Manage operations, maximize profitability, and ensure quality of education.
*   **Pain Points:** Disjointed tools for scheduling and payments, lack of visibility into tutor performance, manual administrative overhead.

### 2.2 Tutors / Educators
*   **Goal:** Focus on teaching, easily manage schedules, and track student progress.
*   **Pain Points:** Time wasted on administrative tasks, difficulty tracking individual student performance across large groups, uncertain income tracking.

### 2.3 Students / Parents
*   **Goal:** Access learning materials, attend classes, and track personal growth.
*   **Pain Points:** Missing assignment deadlines, losing track of class links, lack of visibility into academic progress.

---

## 3. Functional Requirements

### 3.1 Admin & Management Portal
*   **Dashboard & Analytics:** Real-time metrics on enrollment, active classes, attendance rates, and revenue.
*   **Financial Management & Payment Model:** 
    *   **Course/Subject Based Payments:** Payments are strictly processed per course or per subject, not on a per-class basis. Students enroll and pay for the entire module/subject.
    *   **Tracking:** Automated invoicing, payment tracking (Gross vs. Net profit), tutor payroll estimation, and overdue payment alerts.
*   **User Management:** Onboarding/offboarding of Tutors and Students, role-based access control (RBAC), and department assignments.
*   **Global Scheduling:** Center-wide master calendar, conflict resolution, and automated reminders.
*   **Activity Logging:** Real-time feed of platform activities (payments, class completions, assignments).

### 3.2 Tutor Portal
*   **Class Management:** "Next Class" focus view with direct integrations to virtual classrooms (e.g., Google Meet, Zoom) and attendance taking.
*   **Schedule & Availability:** Calendar sync, recurring session management, and availability toggles.
*   **Student CRM & Progress:** Individual student profiles, test score tracking, course completion metrics, and behavioral notes.
*   **Earnings Tracking:** Real-time view of expected payouts based on course assignments and completed billable hours.
*   **Task Management:** Ability to assign homework, grade submissions, and send direct feedback.

### 3.3 Student Portal
*   **Daily Agenda:** Chronological view of daily classes with one-click access to virtual rooms or physical room assignments.
*   **Academic Dashboard:** Gamified tracking of attendance, completed lessons, and overall course progress.
*   **Assignment Tracker:** Kanban or list view of pending, submitted, and graded assignments.
*   **Notifications & Communications:** Alerts for schedule changes, graded papers, and direct messages from tutors.
*   **Course Discovery:** Ability to view and enroll in new or featured courses/subjects offered by the center.

---

## 4. Non-Functional Requirements

### 4.1 Scalability & Performance
*   **Architecture:** Microservices or modular monolith architecture to handle high concurrency during peak scheduling hours.
*   **Database:** Highly scalable relational database (e.g., PostgreSQL) with read-replicas for heavy reporting queries.
*   **Caching:** Redis or Memcached for session management, fast UI rendering, and caching frequently accessed data (e.g., master schedules).
*   **Latency:** API response times should be < 200ms for 95% of requests.

### 4.2 UI/UX Standard
*   **Design System:** Material Design 3 (M3) utilizing modern "glassmorphism" UI trends, tonal elevations, and fluid responsiveness.
*   **Responsiveness:** Mobile-first approach; all portals must be fully functional on mobile devices, tablets, and desktops.
*   **Accessibility:** WCAG 2.1 AA compliance (keyboard navigation, screen reader support, high contrast modes).

---

## 5. Security & Compliance (Top Notch Standard)

### 5.1 Data Privacy & Regulations
*   **FERPA / COPPA Compliance:** (If operating in the US) Strict controls over student data visibility and parental consent mechanisms.
*   **GDPR Compliance:** Right to be forgotten, data portability, and explicit cookie/tracking consent.
*   **SOC 2 Type II:** Architecture and operational processes must be designed to pass SOC 2 audits for security, availability, and confidentiality.

### 5.2 Application Security
*   **Authentication:** OAuth 2.0 / OIDC integrations (Google, Microsoft) + Multi-Factor Authentication (MFA) enforcement for Admins and Tutors.
*   **Authorization:** Strict Role-Based Access Control (RBAC) and Row-Level Security (RLS) in the database to prevent cross-tenant data leakage.
*   **Data Encryption:** 
    *   *In Transit:* TLS 1.3 for all communications.
    *   *At Rest:* AES-256 encryption for databases and object storage (S3).
*   **Vulnerability Management:** Automated SAST/DAST scanning in the CI/CD pipeline, regular third-party penetration testing.
*   **Audit Logging:** Immutable audit trails for all critical actions (e.g., grade changes, financial transactions, permission updates).

---

## 6. Recommended Technical Stack

*   **Frontend:** React (Next.js) or Vue (Nuxt.js) for SEO and fast client-side rendering. Tailwind CSS for styling.
*   **Backend:** Node.js (NestJS/Express), Python (FastAPI/Django), or Go.
*   **Database:** PostgreSQL (Primary Data), Redis (Caching), Elasticsearch (for fast student/course lookups).
*   **Infrastructure:** AWS or GCP. Kubernetes for container orchestration.
*   **Integrations:** 
    *   *Video:* Zoom API, Google Meet API.
    *   *Payments:* Stripe Connect (ideal for routing payments between students, center, and tutors).
    *   *Email/SMS:* Twilio, SendGrid.
