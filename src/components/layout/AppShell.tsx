import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/cn";

interface AppShellProps {
  children: React.ReactNode;
  mainClassName?: string;
}

/**
 * AppShell — page wrapper rendered in the root layout.
 *
 * DOM order:
 *   <header>  Navigation  </header>   ← fixed, outside flow
 *   <main>    {children}  </main>     ← all page sections
 *   <footer>  Footer      </footer>   ← outside main, correct semantics
 */
export function AppShell({ children, mainClassName }: AppShellProps) {
  return (
    <>
      <Navigation />

      {/* pt-16 clears the 64px fixed nav bar */}
      <main
        id="main-content"
        className={cn("flex flex-col flex-1 pt-16", mainClassName)}
        tabIndex={-1}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
