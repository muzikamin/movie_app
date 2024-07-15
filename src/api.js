const fetch = require("node-fetch");

const baseUrl = "https://api.themoviedb.org/3/";
// => 3버전
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzNkZTVjM2U5MTcyZjIwYTEwZWFiOGU3MmQ3MjFlMyIsIm5iZiI6MTcyMDc2NTYxMi44OTczOTksInN1YiI6IjY2OGY5NjUwZDhiZThlNGZhZWE3YTAzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kBqyuVYymhjnWruoRae4zPXjAAjg_kVzb0Fsj0v_rY0",
  },
};

const url = (urlName) => {
  return baseUrl + `${urlName}?language=ko-kr`;
};

export const nowPlaying = () =>
  fetch(url("movie/now_playing"), options).then((res) => res.json());

export const popular = () =>
  fetch(url("movie/popular"), options).then((res) => res.json());

export const topRated = () =>
  fetch(url("movie/top_rated"), options).then((res) => res.json());

export const upRated = () =>
  fetch(url("movie/upcoming"), options).then((res) => res.json());
