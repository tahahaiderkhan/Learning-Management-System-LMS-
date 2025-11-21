# Learning Management System (LMS)

## Overview

A full-featured Learning Management System (LMS) built with React and Firebase. This README describes planned entities, screens, components, tech stack, folder structure, Firebase setup, API/DB schema suggestions, and instructions to run the project.

---

## Key Features

* Student management (add/edit/list/transfer)
* Teacher management (add/edit/list/allocate)
* School registration & admin staff management
* Syllabus creation & release
* Class registration & management
* Fees: structure, submission, vouchers (printable)
* Admissions management
* Exam scheduling, paper creation & results
* Subject management

---

## Screens & Entities (User-Flows)

### Students

* Student Add / Edit Screen
* Student List Screen (search, filter, pagination)
* Transfer Student Screen (between classes/sections)

### Teacher

* Teacher Add / Edit Screen
* Teacher List Screen
* Teacher Allocation Screen (assign subjects/classes)

### Subjects

* Subject Add / Edit Screen
* Subject List Screen

### School

* School Registration Screen (create school, admin users)

### Syllabus

* Syllabus Form (create/edit syllabus)
* Syllabus List Screen (release/unrelease)

### Classes

* Class Form Screen (create class, sections)
* Class List Screen

### Fees

* Fee Structure Screen (define per-class/per-student fees, discounts)
* Fee Submission Screen (collect fees, attach receipts)
* Fee Voucher Screen (view/print voucher)

### Admission

* Admission Screen (create and manage admission applications)

### Exam

* Exam Schedule Screen (create exams, timetables)
* Exam Result Screen (enter and publish results)

---

## UI Components (reusable)

* `Input` (text/number)
* `Button` (primary/secondary)
* `IconButton`
* `Select` / `SelectWithFirebaseDatabase`
* `DataGrid` (listing with sorting/filtering)
* `PageHeader`
* `DatePicker`
* `RadioButton` / `Checkbox`

---

## Libraries / Tools

* React (Create React App / Vite)
* React Router DOM (routing)
* Firebase (Auth + Firestore + Storage)
* MUI (Material UI) for datagrid & components
* Bootstrap (utility & layout)

---

## Suggested Project Structure

```
lms/
├─ public/
├─ src/
│  ├─ api/                    # Firebase wrappers & helper APIs
│  ├─ components/             # Reusable UI components
│  │  ├─ Input/
│  │  ├─ Button/
│  │  └─ DataGrid/
│  ├─ pages/                  # Page routes (Students, Teachers, Fees...)
│  │  ├─ Students/
│  │  ├─ Teachers/
│  │  ├─ School/
│  │  ├─ Syllabus/
│  │  └─ Exams/
│  ├─ routes/                 # Router and protected routes
│  ├─ hooks/                  # Custom hooks (useAuth, useFirestore)
│  ├─ context/                # React Contexts (AuthContext)
│  ├─ styles/                 # Global css / tailwind/bootstrap overrides
│  └─ utils/                  # helper functions (date, formatters)
├─ .env
├─ package.json
└─ README.md
```

---

## Firebase (high-level setup)

1. Create Firebase project in console.
2. Enable **Authentication** (Email/Password or Google) for admin/teachers.
3. Create **Cloud Firestore** with collections described below.
4. (Optional) Enable **Storage** for student photos and attachments.
5. Place Firebase config in `.env` and initialize the SDK in `src/api/firebase.js`.

### Suggested Firestore Collections & Documents

* `schools/{schoolId}`

  * name, address, adminUserId, settings
* `users/{userId}`

  * common user profile (role: student|teacher|admin), email, name, photoURL
* `students/{studentId}`

  * userId, schoolId, classId, section, rollNo, admissionNo, guardians, address
* `teachers/{teacherId}`

  * userId, subjects[], allocatedClasses[], contact
* `classes/{classId}`

  * name, section[], feeStructureRef
* `subjects/{subjectId}`

  * name, code, classLevel
* `syllabus/{syllabusId}`

  * title, classId, subjectId, content, releasedAt
* `admissions/{admissionId}`

  * applicant info, status, appliedAt
* `fees/{feeId}`

  * studentId, amount, status, paidAt, voucherUrl
* `exams/{examId}`

  * title, classId, schedule[], papers[], resultsPublished

> Use Firestore rules to restrict access per role and per school.

---

## Routing (example)

* `/login`
* `/dashboard`
* `/students` (list)
* `/students/new`
* `/students/:id/edit`
* `/teachers`
* `/teachers/new`
* `/classes`
* `/subjects`
* `/fees`
* `/admissions`
* `/exams`

---

## Example UX notes

* Use DataGrid for lists with server-side pagination and searching.
* Add role-based protected routes: Admin, School-Staff, Teacher, Student (read-only views).
* Provide CSV import (students/teachers) and PDF export (fee vouchers, reports).

---

## Dev Setup (quick)

1. `git clone <repo>`
2. `cd lms`
3. `npm install`
4. Create a `.env` with your Firebase config keys
5. `npm start` (or `npm run dev` if using Vite)

---

## Printing Vouchers & Reports

* Use `window.print()` for a printable voucher page, or use a library such as `jspdf` for generating PDFs server-side or in-browser.

---

## Next Steps / Roadmap

* Role-based permissions & audit logs
* Notifications (email/SMS) for fee reminders and exam schedules
* Attendance module
* Mobile-responsive layout / PWA build for offline access

---

## Contribution

PRs welcome. Follow branching rules: `main` protected, `develop` for features, open PRs with description and screenshots.

---

## License

MIT

---

If you want, I can also generate:

* Component boilerplate (React + MUI) for one screen (e.g., Student Add/Edit)
* Firebase rules and sample `firebase.js` initializer
* DataGrid list & Firestore query hook (ready-to-use)

Tell me which one you'd like next and I will create it.
