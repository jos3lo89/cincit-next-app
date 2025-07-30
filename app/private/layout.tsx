import Navbar from "@/components/Navbar";

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default PrivateLayout;
