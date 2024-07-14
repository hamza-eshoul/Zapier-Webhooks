// components
import HomepageForm from "./components/HomepageForm";
import HomepageHeader from "./components/HomepageHeader";
import HomepageLayout from "./components/HomepageLayout";

const Homepage = () => {
  return (
    <HomepageLayout>
      <HomepageHeader />
      <HomepageForm />
    </HomepageLayout>
  );
};

export default Homepage;
