import Portal from "@/components/Portal";

// Optionele catch-all: elk schermpad (/dashboard, /vacature/v1, …) serveert
// dezelfde app, zodat verversen op een diepe URL geen 404 geeft.
export default function Home() {
  return <Portal />;
}
