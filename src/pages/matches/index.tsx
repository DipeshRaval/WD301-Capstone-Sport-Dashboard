import React, { useEffect, Suspense } from "react";
import { useMatchesDispatch } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/action";
import ErrorBoundary from "../../components/ErrorBoundary";
const LiveMatchList = React.lazy(() => import("./LiveMatchList"));
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LiveMatch() {
  const matcheDispatch = useMatchesDispatch();
  useEffect(() => {
    fetchMatches(matcheDispatch);
  }, [matcheDispatch]);

  return (
    <div>
      <h1 className="text-gray-900 dark:text-white font-bold text-xl">
        Live Games
      </h1>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="ml-4 flex gap-4 overflow-x-auto">
              <SkeletonTheme baseColor="#d1cdcd" highlightColor="#adacac">
                {Array(4)
                  .fill(0)
                  .map((ele, index) => {
                    return (
                      <Skeleton key={index} height={140} width={250}></Skeleton>
                    );
                  })}
              </SkeletonTheme>
            </div>
          }
        >
          <div className="overflow-x-auto mt-2 flex items-center w-full">
            <LiveMatchList />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
