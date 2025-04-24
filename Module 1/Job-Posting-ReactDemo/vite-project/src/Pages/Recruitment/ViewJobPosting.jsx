// In Pages/Recruitment/NewJobPosting.jsx
import Header from '../../Components/Header';
import LeftPanel from '../../Components/LeftPanel';
import RightPanel from '../../Components/RightPanel';
import ViewJob from '../../Components/ViewJobHero';

export default function ViewJobPosting() {
    return (
      <>
        <Header breadcrumb={['Home', 'Recruitment', 'Add New Job']} />
        <div className="main-layout">
          <LeftPanel />
          <ViewJob  />
          <RightPanel />
        </div>
      </>
    );
}