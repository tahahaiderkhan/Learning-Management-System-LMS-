import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentsList from './pages/students/StudentsList';
import StudentAdd from './pages/students/StudentAdd';
import StudentTransfer from './pages/students/StudentTransfer';
import TeachersList from './pages/teachers/TeachersList';
import TeacherAdd from './pages/teachers/TeacherAdd';
import TeacherAllocation from './pages/teachers/TeacherAllocation';
import SubjectsList from './pages/subjects/SubjectsList';
import SubjectAdd from './pages/subjects/SubjectAdd';
import SchoolRegistration from './pages/school/SchoolRegistration';
import SyllabusList from './pages/syllabus/SyllabusList';
import SyllabusForm from './pages/syllabus/SyllabusForm';
import ClassList from './pages/classes/ClassList';
import ClassForm from './pages/classes/ClassForm';
import FeeStructure from './pages/fees/FeeStructure';
import FeeSubmission from './pages/fees/FeeSubmission';
import FeeVoucher from './pages/fees/FeeVoucher';
import Admission from './pages/admission/Admission';
import ExamSchedule from './pages/exams/ExamSchedule';
import ExamResult from './pages/exams/ExamResult';

// Placeholder components for other routes
const Placeholder = ({ title }) => <div><h1>{title}</h1></div>;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="students/add" element={<StudentAdd />} />
        <Route path="students/transfer" element={<StudentTransfer />} />
        <Route path="teachers" element={<TeachersList />} />
        <Route path="teachers/add" element={<TeacherAdd />} />
        <Route path="teachers/allocation" element={<TeacherAllocation />} />
        <Route path="subjects" element={<SubjectsList />} />
        <Route path="subjects/add" element={<SubjectAdd />} />
        <Route path="school" element={<SchoolRegistration />} />
        <Route path="syllabus" element={<SyllabusList />} />
        <Route path="syllabus/add" element={<SyllabusForm />} />
        <Route path="classes" element={<ClassList />} />
        <Route path="classes/add" element={<ClassForm />} />
        <Route path="fees" element={<FeeStructure />} />
        <Route path="fees/submission" element={<FeeSubmission />} />
        <Route path="fees/voucher" element={<FeeVoucher />} />
        <Route path="admission" element={<Admission />} />
        <Route path="exams" element={<ExamSchedule />} />
        <Route path="exams/result" element={<ExamResult />} />
      </Route>
    </Routes>
  );
}

export default App;
