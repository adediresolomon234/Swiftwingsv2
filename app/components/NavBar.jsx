import Button from "./Button";

const NavBar = () => {
  return (
    <main className="w-full flex justify-between items-center p-10 bg-purple-600 text-white text-xl font-semiibold">
      <div>Swift wings</div>

      <div className="flex gap-5">
        <p>Fleets</p>
        <p>Destination</p>
        <div>Company </div>
        <p>Contact Us</p>
      </div>

      <div className="flex gap-5">
        <Button
          label={"Sign In"}
          bgColor={"bg-gray-200"}
          textColor={"text-white"}
        />
        <Button label={"Sign Up"} />
      </div>
    </main>
  );
};

export default NavBar;
