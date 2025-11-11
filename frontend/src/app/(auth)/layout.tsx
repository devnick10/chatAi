import AuthWrpper from "./auth-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthWrpper>{children}</AuthWrpper>
    </>
  );
}
