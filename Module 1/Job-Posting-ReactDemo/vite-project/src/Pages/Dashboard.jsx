import Header from '../Components/Header';
import LeftPanel from '../Components/LeftPanel';
import RightPanel from '../Components/RightPanel';
import HeroSection from '../Components/HeroSection';

export default function Dashboard() {
  return (
    <>
      <Header breadcrumb={['Home', 'Dashboard']} />
      <div className="main-layout">
        <LeftPanel />
        <HeroSection />
        <RightPanel />
      </div>
    </>
  );
}