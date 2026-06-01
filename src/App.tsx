import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, RootState } from "./store";
import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 10 * 60 * 1000,
    },
  },
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector((s: RootState) => s.settings.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
}

function AppContent() {
  return (
    <ThemeProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
