import { useEffect, useState } from "react";
import { nowPlaying, popular, topRated, upRated } from "../../api";
import { Loading } from "../../components/Loading";
import styled from "styled-components";
import { spacing } from "../../GlobalStyled";
import { ORIGIN_URL, W500_URL } from "../../constant/imgUrl";
import { Link } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movies } from "./components/Movies";

const MainBanner = styled.section`
  height: 80vh;
  background: url(${ORIGIN_URL}${(props) => props.$bgUrl}) no-repeat center /
    cover;
  padding: 420px ${spacing.side} 0 ${spacing.side};
  position: relative;
  h3 {
    font-size: 80px;
    font-weight: 700;
    letter-spacing: -3px;
    margin-bottom: 30px;
    position: relative;
  }

  p {
    width: 600px;
    line-height: 30px;
    font-size: 20px;
    opacity: 0.7;
    font-weight: 300;
  }

  @media screen and (max-width: 768px) {
    padding: 550px ${spacing.moSide} 0 ${spacing.moSide};
    h3 {
      font-size: 40px;
      margin-bottom: 15px;
    }

    p {
      max-width: 500px;
      width: 100%;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

const BlackBg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 18%,
    rgba(255, 255, 255, 0) 100%
  );
`;

export const Home = () => {
  const [nowData, setNowData] = useState();
  const [popData, setPopData] = useState();
  const [topData, setTopData] = useState();
  const [upData, setUpData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { results: nowResult } = await nowPlaying();
        // => 비구조 할당시 이름이 중복될 땐 상위와 같이 이름을 변경할 수 있음
        const { results: popResult } = await popular();
        const { results: topResult } = await topRated();
        const { results: upResult } = await upRated();

        setNowData(nowResult);
        setPopData(popResult);
        setTopData(topResult);
        setUpData(upResult);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("알 수 없는 에러가 발생했습니다");
      }
    })();
  }, []);

  // console.log(nowData);
  // console.log(topData);
  console.log(topData);
  console.log(isLoading);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MainBanner $bgUrl={nowData[0].backdrop_path}>
            <BlackBg />
            <h3>{nowData[0].title}</h3>
            <p>{nowData[0].overview.slice(0, 100) + "..."}</p>
          </MainBanner>

          <Movies title="현재 상영 영화" movieData={nowData} />
          <Movies title="인기 영화" movieData={popData} />
          <Movies title="평점 좋음" movieData={topData} />
          <Movies title="개봉예정" movieData={upData} />
        </>
      )}
    </>
  );
};

// *예외
// 1. 컴파일 에러
// => 프로그램이 실행되기 전에 발생하는 오류
// => 프로그램 실행 자체가 안 됨

// 2. 런타임 에러
// => 프로그램이 실행 중 발생하는 오류

// *try ~ catch
// => 예외가 발생할 것 같은 코드를 제어함
// ex)
// try{
//   => 예외 발생 가능성이 있는 코드 작성
// }catch(error){
//   예외가 발생했을 때 처리해주는 부분
// }finally{
//   예외와 상관없이 무조건 실행해야하는 코드
// }
