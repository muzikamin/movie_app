import { useEffect, useState } from "react";
import { nowPlaying } from "../../api";

export const Home = () => {
  const [nowData, setNowData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { results } = await nowPlaying();
        setNowData(results);
        // 에러가 발생할 것 같은 것을 넣어주고
      } catch (error) {
        console.log(error);
        // 실제 에러가 났을 때 유저에게 표시할 내용을 넣어주기
      }
    })();
  }, []);

  console.log(nowData);

  return <div>Home</div>;
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
