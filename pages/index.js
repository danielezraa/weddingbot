import AboutUs from "../components/AboutUs";
import Instructions from "../components/Instructions";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className='w-full flex flex-col items-center justify-center select-none' dir='rtl'>
      <Logo />
      <AboutUs />
      <Instructions />
    </div>
  )
}
