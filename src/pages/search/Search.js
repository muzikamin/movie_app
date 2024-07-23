import { useForm } from "react-hook-form";
import { BsSearchHeart } from "react-icons/bs";
import styled from "styled-components";
import { spacing } from "../../GlobalStyled";
import { searchMovie } from "../../api";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { W500_URL } from "../../constant/imgUrl";

const Container = styled.div`
  padding: 150px ${spacing.side};
`;

const Form = styled.form`
  position: relative;
  input {
    all: unset;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #555;
    &::placeholder {
      font-size: 20px;
    }
    padding: 0 10px;
    font-size: 20px;
    letter-spacing: 0;
  }

  button {
    all: unset;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 20px;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.h4`
  font-size: 18px;
  margin-top: 20px;
  color: gold;
`;

const ConWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // 반복, 값이 2개 들어감 (옆으로 반복할 갯수, 각자의 가로크기)
  // 1fr : 하나씩, 동등한 간격으로 똑같이 나눠가져라
  // 2fr : 전체 중에 2배 간격으로 하라
  row-gap: 30px;
  // grid 위아래 간격
  column-gap: 15px;
  // grid 양 옆 간격
`;

const Con = styled.div``;

const Bg = styled.div`
  height: 400px;
  img {
    height: 100%;
    object-fit: cover;
  }
`;

//백그라운드 이미지의 단점 : 검색했을 때에 대한 이미지 노출이 안 된다, alt가 없다!!!!

export const Search = () => {
  const [searchData, setSearchData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSearchResult = async (data) => {
    const { keyword } = data;

    const { results } = await searchMovie(keyword);
    setSearchData(results);
    setIsLoading(false);
  };

  console.log(searchData?.length === 0 ? "없음" : "있음");

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSearchResult)}>
        <input
          {...register("keyword", {
            required: "검색 내용을 입력해 주세요😒",
          })}
          type="text"
          placeholder="보고 싶은 영화를 검색해주세요"
        />
        <button>
          <BsSearchHeart />
        </button>

        <ErrorMessage>{errors?.keyword?.message}</ErrorMessage>
      </Form>

      {searchData?.length === 0 ? (
        "검색결과 없음"
      ) : (
        <>
          {searchData && (
            <ConWrap>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {searchData.map((data) => (
                    <Con key={data.id}>
                      <Link to={`/detail/${data.id}`}>
                        <Bg>
                          <img
                            src={W500_URL + data.poster_path}
                            alt={data.title}
                          />
                        </Bg>
                      </Link>
                    </Con>
                  ))}
                </>
              )}
            </ConWrap>
          )}
        </>
      )}
    </Container>
  );
};
