import Logo from "../../../assets/images/logo.png";

// components
import Image from "../../../components/Image";

const HomepageHeader = () => {
  return (
    <header className="flex flex-col text-[1.375rem] font-semibold leading-[1.3]">
      <div className="flex items-center justify-center w-full pb-4">
        <div className="size-36">
          <Image src={Logo} alt="logo" />
        </div>
      </div>

      <div className="-translate-y-8">
        <h1 className="text-center">Shaping Tomorrow's Education Landscape</h1>

        <p className="text-[#053046] text-[17px] text-center pt-0.5">
          Empower educational leaders and learners alike.
        </p>
      </div>
    </header>
  );
};

export default HomepageHeader;
