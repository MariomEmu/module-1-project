// In Pages/Recruitment/NewJobPosting.jsx
import Header from '../../Components/Header';
import LeftPanel from '../../Components/LeftPanel';
import RightPanel from '../../Components/RightPanel';
import NewJobPostingHero from '../../Components/NewJobPostingHero';

export default function NewJobPosting() {
    return (
      <>
        <Header breadcrumb={['Home', 'Recruitment', 'Add New Job']} />
        <div className="main-layout">
          <LeftPanel />
          <NewJobPostingHero />
          <RightPanel />
        </div>
      </>
    );
}