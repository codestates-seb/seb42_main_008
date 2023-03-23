import styled from 'styled-components';
import { BsEmojiSmile, BsEmojiNeutral, BsEmojiFrown } from 'react-icons/bs';
import { GiSiren } from 'react-icons/gi';
import { Review } from 'interfaces/Profile.interface';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import customAxios from 'api/customAxios';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';

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

const MemberReviews = () => {
  const { memberId } = useParams();
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const loginUser = useRecoilValue(userInfo);

  const handleSirenClick = () => {
    Swal.fire({
      icon: 'info',
      title: '이 리뷰에 문제가 있나요?',
      text: '리뷰 신고 기능은 추후에 추가될 예정입니다! 🥲',
    });
  };

  const getReviewData = async () => {
    await customAxios
      .get(`/members/${memberId}/reviews`)
      .then(resp => {
        setReviews(resp.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReviewData();
  }, [memberId]);

  return (
    <>
      {reviews && (
        <ReviewWrapper>
          {reviews.length !== 0 ? (
            reviews.map((item, idx) => (
              <ReviewItem key={idx}>
                <p>{item.content}</p>
                <div className="icons">
                  <Emoji score={item.score} />
                  {loginUser.memberId === memberId && (
                    <span className="siren" onClick={handleSirenClick}>
                      <GiSiren size={27} color="red" />
                    </span>
                  )}
                </div>
              </ReviewItem>
            ))
          ) : (
            <p>아직 작성된 리뷰가 없습니다!</p>
          )}
        </ReviewWrapper>
      )}
    </>
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
