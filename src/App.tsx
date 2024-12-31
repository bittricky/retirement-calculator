import { ThemeToggle } from "./components/ui/theme-toggle";
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="py-12">{/* TODO: Calculator */}</div>
    </div>
  );
}

export default App;
