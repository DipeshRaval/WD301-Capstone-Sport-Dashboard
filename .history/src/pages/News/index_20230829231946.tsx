import React, { useEffect} from "react";
import ListNews from "./ListNews";
import { Outlet } from "react-router-dom";

export default function NewsContainer() {

  useEffect(()=>{
    
  })

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white my-2">
        Treading News
      </h1>
      <div>
        <ListNews />
        <Outlet />
      </div>
    </div>
  );
}
