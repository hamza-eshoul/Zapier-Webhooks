interface HomepageLayoutProps {
  children: React.ReactNode;
}

const HomepageLayout = ({ children }: HomepageLayoutProps) => {
  return (
    <main className="max-w-xl mx-auto flex flex-col gap-5 items-center justify-center h-[90vh]">
      {children}
    </main>
  );
};

export default HomepageLayout;
