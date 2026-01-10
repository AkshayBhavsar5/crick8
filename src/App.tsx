import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import MatchDetail from './pages/MatchDetail';
import ScoringPanel from './pages/ScoringPanel';
import CommentaryEdit from './pages/CommentaryEdit';
import WagonWheel from './pages/WagonWheel';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { AuthGuard } from './components/AuthGuard';
import { ProtectedRoute } from './components/ProtectedRoute';

const routes = [
  {
    path: '/login',
    element: <Login />,
    protected: false,
    authGuard: true,
  },
  {
    path: '/match',
    element: <Index />,
    protected: true,
    authGuard: false,
  },
  {
    path: '/match/:id',
    element: <MatchDetail />,
    protected: true,
    authGuard: false,
  },
  {
    path: '/match/:id/commentary/:eventId/edit',
    element: <CommentaryEdit />,
    protected: true,
    authGuard: false,
  },
  {
    path: '/match/:id/commentary/:eventId/wagon-wheel',
    element: <WagonWheel />,
    protected: true,
    authGuard: false,
  },
  {
    path: '/scoring',
    element: <ScoringPanel />,
    protected: true,
    authGuard: false,
  },

  {
    path: '*',
    element: <NotFound />,
    protected: true,
    authGuard: false,
  },
];

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            let element = route.element;

            // AuthGuard (Login page protection)
            if (route.authGuard) {
              element = <AuthGuard>{element}</AuthGuard>;
            }

            // Protected routes (Requires login)
            if (route.protected) {
              element = <ProtectedRoute>{element}</ProtectedRoute>;
            }

            return <Route key={index} path={route.path} element={element} />;
          })}
        </Routes>
      </BrowserRouter>
    </div>
  </TooltipProvider>
);

export default App;
