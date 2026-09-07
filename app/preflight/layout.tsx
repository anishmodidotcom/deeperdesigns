import "./preflight.css";
import PreflightHeader from "./_components/PreflightHeader";

// v30.2: every Preflight route gets the minimal header. The stylesheet is
// imported here as well as in each page so the header's own classes are
// styled on any route that renders it.
export default function PreflightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PreflightHeader />
      {children}
    </>
  );
}
