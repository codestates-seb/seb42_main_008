import { BsEmojiSmile, BsEmojiNeutral, BsEmojiFrown } from 'react-icons/bs';

import { Review } from 'interfaces/Profile.interface';

interface ReviewProps {
  reviews: Review[];
}

interface EmojiProps {
  score: number;
}

const Emoji = ({ score }: EmojiProps) => {
  if (score === -1) {
    return <span className="sad-face">{<BsEmojiFrown />}</span>;
  } else if (score === 0) {
    return <span className="neutral-face">{<BsEmojiNeutral />}</span>;
  }
  return <span className="smile-face">{<BsEmojiSmile />}</span>;
};

const MemberReviews = ({ reviews }: ReviewProps) => {
  console.log(reviews);
  return (
    <div>
      {reviews.map((item, idx) => (
        <div key={idx}>
          <Emoji score={item.score} />
        </div>
      ))}
    </div>
  );
};

export default MemberReviews;
