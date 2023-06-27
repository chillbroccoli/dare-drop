import { Navbar } from "../molecules/Navbar";
import { Container } from "../ui/Container";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <Container className="py-8">{children}</Container>
    </div>
  );
}
