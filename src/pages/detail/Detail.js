import { useEffect, useState } from "react";
import { movieDetail } from "../../api";
import { Loading } from "../../components/Loading";
import styled from "styled-components";
import { ORIGIN_URL } from "../../constant/imgUrl";
import { useParams } from "react-router-dom";

const Container = styled.div`
  padding: 150px 20%;
  display: flex;

  @media screen and (max-width: 768px) {
    padding: 150px 10%;
  }
`;

const CoverImg = styled.img`
  width: 45%;
  margin-right: 5%;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    width: 40%;
  }
`;

const ConWrap = styled.div`
  width: 40%;

  @media screen and (max-width: 768px) {
    width: 60%;
  }

  h3 {
    font-size: 70px;
    font-weight: 700;
    margin-bottom: 30px;

    @media screen and (max-width: 768px) {
      font-size: 40px;
    }
  }
`;

const Info = styled.div`
  span {
    display: block;
    padding: 10px 20px;
    background-color: #333;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 400;
    margin-right: 15px;

    @media screen and (max-width: 768px) {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 15px;
      text-align: center;
    }
  }

  display: flex;
`;

const Genres = styled.ul`
  list-style: disc;
  // 원래 모양으로 돌아옴, 동그라미는 간격을 인식못해서 따로 마진 넣어줘야함
  margin-left: 20px;
  font-size: 18px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  li {
    margin-top: 10px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  font-weight: 300;
  opacity: 0.7;
  margin-top: 100px;
  line-height: 30px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 26px;
    margin-top: 40px;
  }
`;

export const Detail = () => {
  const [detailData, setDetailData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id: movieId } = useParams();
  console.log(movieId);

  useEffect(() => {
    (async () => {
      try {
        const data = await movieDetail(movieId);
        // console.log(data);
        setDetailData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // console.log(detailData);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <CoverImg
            src={ORIGIN_URL + detailData.poster_path}
            alt={detailData.title}
          />
          <ConWrap>
            <h3>{detailData.title}</h3>
            <Info>
              <span>{detailData.release_date}</span>
              <span>{Math.round(detailData.vote_average)} 점</span>
              <span>{detailData.runtime}분</span>
            </Info>
            <Genres>
              {detailData.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </Genres>

            <Desc>{detailData.overview}</Desc>
          </ConWrap>
        </Container>
      )}
    </div>
  );
};
