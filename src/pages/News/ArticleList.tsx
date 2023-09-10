import React, { useContext, useState } from "react";
import { News } from "../../context/news/reducer";
import { useNewsState } from "../../context/news/context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { CustomizeContext } from "../../context/customizeState";
import { FetchPreferences } from "../Preferances";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  filter: string;
  sortType: string;
}

export default function ArticleList(props: Props) {
  const state: any = useNewsState();
  const { isLoading, isError, errorMessage } = state;
  let { news } = state;

  const [newsState, setNewsState] = useState(news);
  const [likeNewsState, setLikeNewsState] = useState<number[]>([]);

  if (props.sortType && props.sortType !== "Sort By: ") {
    if (props.sortType === "Date") {
      news = news.sort((a: News, b: News) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if (props.sortType === "Title") {
      news = news.sort((a: News, b: News) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (props.sortType === "Sport Type") {
      news = news.sort((a: News, b: News) => {
        if (a.sport.name < b.sport.name) {
          return -1;
        }
        if (a.sport.name > b.sport.name) {
          return 1;
        }
        return 0;
      });
    } else if (props.sortType === "Favourites") {
      const likesArticles = localStorage.getItem("likeArticles");
      if (likesArticles) {
        const likesArticlesArray = JSON.parse(likesArticles);
        news = news.filter((newsItem: News) => {
          return likesArticlesArray.includes(newsItem.id);
        });
      }
    }
  }

  const { isOpen } = useContext(CustomizeContext);
  const isLoggedIn = !!localStorage.getItem("userData");

  const settingNewsState = async () => {
    if (isLoggedIn) {
      const data = await FetchPreferences();
      if (data && !data?.errors) {
        if (Object.keys(data?.preferences).length) {
          if (props.filter) {
            setNewsState(
              news.filter((newsItem: any) => {
                return newsItem.sport.name === props.filter;
              })
            );
          } else {
            //chnage is required
            if (data?.preferences.SelectedSport.length) {
              setNewsState(
                news.filter((newsItem: any) => {
                  return data?.preferences.SelectedSport.includes(
                    newsItem.sport.name
                  );
                })
              );
            } else {
              setNewsState(news);
            }
          }
        } else {
          if (props.filter) {
            setNewsState(
              news.filter((newsItem: any) => {
                return newsItem.sport.name === props.filter;
              })
            );
          } else {
            setNewsState(news);
          }
        }
      } else {
        if (props.filter) {
          setNewsState(
            news.filter((newsItem: any) => {
              return newsItem.sport.name === props.filter;
            })
          );
        } else {
          setNewsState(news);
        }
      }
    } else {
      if (props.filter) {
        setNewsState(
          news.filter((newsItem: any) => {
            return newsItem.sport.name === props.filter;
          })
        );
      } else {
        setNewsState(news);
      }
    }
  };

  const handNewsLikes = (id: number) => {
    const likeArticles = localStorage.getItem("likeArticles");
    if (likeArticles) {
      const updateLikes = JSON.parse(likeArticles);
      if (updateLikes.includes(id)) {
        const index = updateLikes.indexOf(id);
        index > -1 ? updateLikes.splice(index, 1) : "";
      } else {
        updateLikes.push(id);
      }
      localStorage.setItem("likeArticles", JSON.stringify(updateLikes));
      setLikeNewsState(updateLikes);
    } else {
      localStorage.setItem("likeArticles", JSON.stringify([id]));
      setLikeNewsState([id]);
    }
  };

  const getFormatedDate = (date: string) => {
    const newDate = new Date(date);
    const formatDate = newDate.toDateString();
    return `${formatDate}`;
  };

  useEffect(() => {
    settingNewsState();
    const likeArticles = localStorage.getItem("likeArticles");
    if (likeArticles) {
      setLikeNewsState(JSON.parse(likeArticles));
    }
  }, [isOpen, isLoading, props]);

  if (news.length === 0 && isLoading) {
    return (
      <div className="ml-4 flex flex-col gap-4 overflow-y-auto">
        <SkeletonTheme baseColor="#d1cdcd" highlightColor="#adacac">
          {Array(4)
            .fill(0)
            .map((ele, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between w-full px-4 my-2"
                >
                  <div className="border rounded-md w-full dark:hover:bg-gray-600 hover:bg-slate-200 duration-100 transition-colors dark:bg-gray-800 bg-white flex justify-between items-center">
                    <div className="px-4">
                      <p className="text-gray-700 mt-3 dark:text-white">
                        <Skeleton width={80} />
                      </p>
                      <h2 className=" dark:text-white text-gray-800 font-bold">
                        <Skeleton height={30} width={500} />
                      </h2>
                      <p className="text-gray-900 my-2 dark:text-gray-100">
                        <Skeleton count={3} />
                      </p>
                      <div className="flex justify-between my-3">
                        <Skeleton width={100} />
                        <Skeleton width={100} />
                      </div>
                    </div>
                    <Skeleton
                      height={180}
                      className="mr-4"
                      width={250}
                    ></Skeleton>
                  </div>
                </div>
              );
            })}
        </SkeletonTheme>
      </div>
    );
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (
    localStorage.getItem("likeArticles") == null &&
    props.sortType === "Favourites"
  ) {
    return (
      <span className="ml-8 dark:text-white dark:bg-gray-700">
        No articles for Favourite Aeticles{" "}
      </span>
    );
  }

  if (newsState.length === 0) {
    return (
      <span className="ml-8 dark:text-white dark:bg-gray-700">
        No articles for this Selection{" "}
      </span>
    );
  }

  return (
    <div className="overflow-y-auto dark:bg-gray-700 h-[75vh] relative bottom-0">
      {!isLoading &&
        newsState.map((newsItem: News) => {
          return (
            <div
              key={newsItem.id}
              className="flex justify-between w-full px-4 my-2"
            >
              <div className="border rounded-md w-full dark:hover:bg-gray-600 hover:bg-slate-200 duration-100 transition-colors dark:bg-gray-800 bg-white flex justify-between items-center">
                <div className="px-4">
                  <div className="flex mt-3 justify-between">
                    <p className="text-gray-700 dark:text-white">
                      {newsItem.sport.name}
                    </p>
                    <button
                      className="mx-2"
                      onClick={() => handNewsLikes(newsItem.id)}
                    >
                      {likeNewsState.includes(newsItem.id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 47.5 47.5"
                          id="heart"
                          className="h-6 w-6 text-red-500 duration-250 cursor-pointer"
                        >
                          <g
                            clipPath="url(#a)"
                            transform="matrix(1.25 0 0 -1.25 0 47.5)"
                          >
                            <path
                              fill="#dd2e44"
                              d="M3.067 25.68c0 8.799 12.184 12.06 15.933 1.874 3.749 10.186 15.933 6.925 15.933-1.874C34.933 16.12 19 3.999 19 3.999S3.067 16.12 3.067 25.68"
                            ></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          id="heart"
                          className="h-6 w-6"
                        >
                          <path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  <h2 className="my-1 dark:text-white text-gray-800 text-2xl font-bold">
                    {newsItem.title}
                  </h2>
                  <div className="flex">
                    {newsItem.teams.length !== 0 ? (
                      <span className="font-bold mr-2">Team : </span>
                    ) : (
                      ""
                    )}
                    <span>
                      {newsItem.teams
                        .map((item: any) => {
                          return ` ${item.name} `;
                        })
                        .join(" Vs ")}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-gray-100">
                    {newsItem.summary.substring(0, 200)}...
                  </p>
                  <div className="flex justify-between my-1">
                    <p className="font-bold text-gray-500">
                      {getFormatedDate(newsItem.date?.substring(0, 10))}
                    </p>
                    <Link to={`/articles/${newsItem.id}`}>
                      <p className="underline hover:text-blue-600 transiton duration-400">
                        Read more...
                      </p>
                    </Link>{" "}
                  </div>
                </div>

                <div className="w-4/12">
                  <img
                    src={newsItem.thumbnail}
                    alt="thumbnail"
                    className="ml-auto h-48 w-48"
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
