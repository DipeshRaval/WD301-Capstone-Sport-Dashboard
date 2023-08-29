import React from "react";
import NewsContainer from "./NewsContainer";

export default function ListNews() {
  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white my-2">
        Treading News
      </h1>
      <div>
        <NewsContainer />
      </div>
    </div>
  );
}
