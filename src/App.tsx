import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Account from "./pages/Account.tsx";
import Movies from "./pages/Movies.tsx";
import Series from "./pages/Series.tsx";
import Reels from "./pages/Reels.tsx";
import Influencers from "./pages/Influencers.tsx";
import InfluencerChat from "./pages/InfluencerChat.tsx";
import TitleDetail from "./pages/TitleDetail.tsx";
import Pricing from "./pages/Pricing.tsx";
import Support from "./pages/Support.tsx";
import Assistant from "./pages/Assistant.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AdminContent from "./pages/admin/Content.tsx";
import AdminRequests from "./pages/admin/Requests.tsx";
import AdminInfluencers from "./pages/admin/Influencers.tsx";
import AdminUsers from "./pages/admin/Users.tsx";
import AdminPlans from "./pages/admin/Plans.tsx";
import AdminGateways from "./pages/admin/Gateways.tsx";
import AdminSupport from "./pages/admin/Support.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/influencers/:id" element={<InfluencerChat />} />
            <Route path="/title/:id" element={<TitleDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/assistant" element={<Assistant />} />

            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute adminOnly><AdminContent /></ProtectedRoute>} />
            <Route path="/admin/requests" element={<ProtectedRoute adminOnly><AdminRequests /></ProtectedRoute>} />
            <Route path="/admin/influencers" element={<ProtectedRoute adminOnly><AdminInfluencers /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/plans" element={<ProtectedRoute adminOnly><AdminPlans /></ProtectedRoute>} />
            <Route path="/admin/gateways" element={<ProtectedRoute adminOnly><AdminGateways /></ProtectedRoute>} />
            <Route path="/admin/support" element={<ProtectedRoute adminOnly><AdminSupport /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
