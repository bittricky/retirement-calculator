import ThemeToggle from "@/components/ui/theme-toggle";
import Calculator from "@/components/common/Calculator";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
