import React from "react";
import ListNews from "./ListNews";

export default function NewsContainer() {
  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white my-2">
        Treading News
      </h1>
      <div>
        <ListNews />
      </div>
    </div>
  );
}
