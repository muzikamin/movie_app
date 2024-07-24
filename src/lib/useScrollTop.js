import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // 특정 상황일 때 사용, []안의 값이 변경되면 {} 이 실행된다

  return;
};

// 그림이 그려지기 전에 (랜더링 전) 스크롤을 올려야 함
// 랜더링 전 후 중간을 제어해주는 것 = useeffect
// 리턴해서 보여줄 값은 없으니까 바로 종료
// 랜더링이 되기 전에 행동하는 것을 중괄호에 넣기
// 인피니티 스크롤 = 무한 스크롤

// 냅다 무조건 올라가라고 만들면 무한 스크롤이 생기면
// 새롭게 랜더링 된다 생각하고 다시 0이 될 수 있다
