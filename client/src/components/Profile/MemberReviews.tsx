import styled from 'styled-components';
import { BsEmojiSmile, BsEmojiNeutral, BsEmojiFrown } from 'react-icons/bs';
import { GiSiren } from 'react-icons/gi';
import { Review } from 'interfaces/Profile.interface';

interface ReviewProps {
  reviews: Review[] | [];
}

interface EmojiProps {
  score: number;
}

const Emoji = ({ score }: EmojiProps) => {
  if (score === -1) {
    return <span>{<BsEmojiFrown size={25} color="#D9506A" />}</span>;
  } else if (score === 0) {
    return <span>{<BsEmojiNeutral size={25} color="#FEB35C" />}</span>;
  }
  return <span>{<BsEmojiSmile size={25} color="#9BB76A" />}</span>;
};

const MemberReviews = ({ reviews }: ReviewProps) => {
  console.log(reviews);
  return (
    <ReviewWrapper>
      {reviews.length !== 0 ? (
        reviews.map((item, idx) => (
          <ReviewItem key={idx}>
            <p>{item.content}</p>
            <div className="icons">
              <Emoji score={item.score} />
              <span className="siren">
                <GiSiren size={27} color="red" />
              </span>
            </div>
          </ReviewItem>
        ))
      ) : (
        <p>아직 작성된 리뷰가 없습니다!</p>
      )}
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.section`
  width: 100%;
  padding: 20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
  }
`;

const ReviewItem = styled.article`
  width: 100%;
  border-bottom: 1px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  .icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    > span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .siren {
      cursor: pointer;
    }
  }
`;

export default MemberReviews;
