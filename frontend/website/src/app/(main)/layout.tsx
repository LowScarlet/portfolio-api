import Layout from "./_components/Layout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <Layout>
      {children}
    </Layout>
  </>);
}
