import Participants from 'components/ContentDetail/Tab//Participants';
import Companion from 'components/ContentDetail/Tab/Companion';
import { subProps } from 'interfaces/ContentDetail.interface';

const CompanionTab = ({ detail, sub, setSub }: subProps) => {
  return (
    <div>
      <Companion detail={detail} sub={sub} setSub={setSub} />
      <Participants detail={detail} sub={sub} setSub={setSub} />
    </div>
  );
};

export default CompanionTab;
