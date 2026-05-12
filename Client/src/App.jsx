import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './providers/AuthContext'
import { UserCoursesProvider } from './providers/UserCoursesProvider'
import { TestResultProvider } from './providers/TestResultProvider'
import { TitleProvider } from './providers/TitleContext'
import { CertificateProvider } from './providers/CertificateProvider'
import ProtectedRoute from './providers/ProtectedRoute'
import Home from './pages/Home/Home'
import UserHab from './pages/UserHab/UserHab'
import EditUser from './pages/EditUser/EditUser'
import About from './pages/About/About'
import Courses from './pages/Courses/Courses'
import Course from './pages/Course/Course'
import CreateCourse from './pages/CreateCourse/CreateCourse'
import Lesson from './pages/Lesson/Lesson'
import CourseCompleted from './pages/CourseCompleted/CourseCompleted'
import Contacts from './pages/Contacts/Contacts'
import NotFound from './pages/404/404'
import Layout from './widgets/Layout/Layout'
import Auth from './widgets/Auth/Auth'
import { PayModal } from './widgets/PayModal/PayModal'
import TestResult from './widgets/TestResult/TestResult'
import { CertificateModal } from './widgets/CertificateModal/CertificateModal'
import { SkeletonTheme } from 'react-loading-skeleton'


function App() {
  return (
    <SkeletonTheme baseColor="#b4b4b4" highlightColor="#e6e6e6">
      <AuthProvider>
        <UserCoursesProvider>
          <TestResultProvider>
            <CertificateProvider>
              <TitleProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="courses/:id" element={<Course />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="courses/:id/lesson/:order" element={<Lesson />}/>
                      <Route path="completed/:courseId" element={<CourseCompleted />}/>
                      <Route path="hab/:id" element={<UserHab />}/>
                      <Route path="edit-user/:id" element={<EditUser />}/>
                    </Route>
                    <Route element={<ProtectedRoute deniedRoles={["Пользователь"]} />}>
                      <Route path="create-course" element={<CreateCourse />}/>
                    </Route>
                  </Route>

                  <Route path="*" element={<NotFound />}/>
                </Routes>

                <TestResult />
                <PayModal/>
                <CertificateModal />
                <Auth />
              </TitleProvider>
            </CertificateProvider>
          </TestResultProvider>
        </UserCoursesProvider>
      </AuthProvider>
    </SkeletonTheme>
  )
}

export default App