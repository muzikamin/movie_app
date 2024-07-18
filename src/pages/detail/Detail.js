import { useEffect, useState } from "react";
import { movieDetail } from "../../api";
import { Loading } from "../../components/Loading";
import styled from "styled-components";

const ConBox = styled.div``;

const Con = styled.div``;

const Title = styled.div``;

export const Detail = () => {
  const [detailData, setDetailData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await movieDetail(1022789);
        // console.log(data);
        setDetailData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(isLoading);
  console.log(detailData);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ConBox>
          <img />
          <Con>
            <Title>{detailData.title}</Title>
            <p>{`런타임 ${detailData.runtime} 분`}</p>
            <p>{`개봉일 ${detailData.release_date}`}</p>
            <p>장르</p>
            <p>{detailData.genres[0].name}</p>
            <p>{detailData.genres[1].name}</p>
          </Con>
        </ConBox>
      )}
    </>
  );
};
