import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favoritos from './pages/Favoritos';
import Builder from './pages/Builder';
import Informativa from './pages/Informativa';
import Usuario from './pages/Usuario';
import Detalle from './pages/Detalle';
import Peleas from './pages/Peleas';
import Login from './pages/auth/Login';
import Registro from './pages/auth/Registro';
import { AuthProvider, useAuth } from './AuthContext';

function RutaProtegida({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peleas" element={<Peleas />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/heroe/:id" element={<Detalle />} />
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/registro" element={
          user ? <Navigate to="/" /> : <Registro />
        } />
        <Route path="/favoritos" element={
          <RutaProtegida><Favoritos /></RutaProtegida>
        } />
        <Route path="/builder" element={
          <RutaProtegida><Builder /></RutaProtegida>
        } />
        <Route path="/usuario" element={
          <RutaProtegida><Usuario /></RutaProtegida>
        } />
      </Routes>
      <Navbar />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;