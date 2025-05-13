import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import RegisterAccount from '@/pages/register/RegisterAccount';
import RegisterProfile from '@/pages/register/RegisterProfile';
import About from '@/pages/about/About';
import CreateNews from '@/pages/createPost/CreatePost';
import { useAuthStore } from '@/stores/authStore';
import NotFound from '@/pages/notFound/NotFound';
import Info from '@/pages/info/Info';
import Post from '@/pages/post/Post';
import Services from '@/pages/services/Services';
import Posts from '@/pages/posts/Posts';
import Dashboard from '@/pages/dashboard/Dashboard';
import UserDashboard from '@/pages/dashboard/UserDashboard';
import PostDashboard from '@/pages/dashboard/PostDashboard';
import UpdatePost from '@/pages/updatePost/UpdatePost';
import ProfileDetail from '@/pages/ProfileDetail.tsx/ProfileDetail';
import Administration from '@/pages/administration/Administration';
import LetterRequestDashboard from '@/pages/dashboard/LetterRequestDashboard';
import ViewLetter from '@/pages/viewLetter/ViewLetter';
import SettingDashboard from '@/pages/dashboard/SettingDashboard';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  const token = useAuthStore((state) => state.token)
  return (
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={token ? <Navigate to={'/'}/> : <Login />} />
        <Route path="/register/account" element={token ? <Navigate to={'/'}/> : <RegisterAccount />} />
        <Route path="/register/profile" element={token ? <Navigate to={'/'}/> : <RegisterProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path='/post/:slug' element={<Post/>}/>
        <Route path='/service' element={<Services/>}/>
        <Route path='/posts' element={<Posts />}/>
        <Route path='/administration' element={ <Administration /> } />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes allowedRoles={['warga', 'admin', 'ketua']}/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/administration" element={<LetterRequestDashboard/>} />
          <Route path="/administration/:id" element={<ViewLetter/>} />
          <Route path="/administration/submission/:type" element={<ViewLetter/>} />
          <Route path="/administration/submission/:type" element={<ViewLetter/>} />
          
          <Route path='/dashboard/profile' element={<ProfileDetail />}/>
          <Route path='/dashboard/settings' element={<SettingDashboard />}/>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={['admin', 'ketua']}/>}>
          <Route path="/post/create" element={<CreateNews />} />
          <Route path="/post/update/:slug" element={<UpdatePost />} />
          <Route path="/dashboard/users" element={<UserDashboard />} />
          <Route path="/dashboard/posts" element={<PostDashboard />} />
          <Route path="/dashboard/user/detail/:id" element={<ProfileDetail />} />
        </Route>

        {/* Not Found Route */}
        <Route path='*' element={<NotFound />}/>

      </Routes>
  );
};

export default AppRoutes;
