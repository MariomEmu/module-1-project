import Header from '../Components/Header';
import LeftPanel from '../Components/LeftPanel';
import RightPanel from '../Components/RightPanel';
import RecruitmentHero from '../Components/RecruitmentHero';


export default function Recruitment() {
  
    return (
      <>
        <Header/>
        <div className="main-layout">
          <LeftPanel />
          <RecruitmentHero />
          <RightPanel />
          
        </div>
      </>
    );
  }
