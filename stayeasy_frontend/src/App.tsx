import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './store';
import { setUser } from './store/authSlice';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AddRoomPage from './pages/AddRoomPage';
import NotFound from "./pages/NotFound";

const AppWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add-room" element={<AddRoomPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

const App = () => (
  <Provider store={store}>
    <Toaster />
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </Provider>
);

export default App;
