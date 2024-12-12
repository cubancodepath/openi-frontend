import { Dashboard } from "@/components/Dashboard";
import Footer from "@/components/Footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const queryClient = new QueryClient();

function App() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: new Date(2005, 0, 1),
    to: new Date(2024, 0, 1),
  }));

  const [selectedParams, setSelectedParams] = useState<string[]>([
    "co_gt",
    "c6h6_gt",
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Dashboard
              dateRange={dateRange}
              setDateRange={setDateRange}
              // selectedParams={selectedParams}
              // setSelectedParams={setSelectedParams}
            />
          </main>
          <Footer />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
