import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import SignUp from '@/pages/SignUp';
import SignUpComplete from '@/pages/SignUpComplete';
import BaseLayout from '@/pages/BaseLayout';

const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-complete" element={<SignUpComplete />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterProvider;
