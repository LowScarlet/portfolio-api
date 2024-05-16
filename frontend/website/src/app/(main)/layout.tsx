import AppBar from "./_components/AppBar";
import Drawer from "./_components/Drawer";
import Footer from "./_components/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <div className="flex h-svh">
      {/* Drawer */}
      <div>
        <Drawer />
      </div>
      {/* App */}
      <main className="flex flex-col overflow-y-auto grow">
        {/* AppBar */}
        <AppBar />
        {/* Context */}
        <div className="px-4 grow py">
          {children}
        </div>
        {/* Footer */}
        <Footer />
      </main>
    </div>
  </>);
}
