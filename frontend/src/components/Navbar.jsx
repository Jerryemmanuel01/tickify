import logo from "../assets/tickify-logo.png";
const Navbar = () => {
  return (
    <div className="w-full h-[80px] shadow-custom1 px-4 py-1 ">
      <div className="max-w-[1200px] mx-auto h-full">
        <img src={logo} alt="" className="h-full" />
      </div>
    </div>
  );
};

export default Navbar;
