import React from 'react'
import { News } from "../../context/news/reducer";
import Article from "./Article";

interface Props {
    news : News[];
}

export default function ArticleList(props: Props) {
  const [articles,setArticles] = useState("")

  return (
    <div className="overflow-y-auto w-10/12 h-[65vh] relative bottom-0">
        {props.news.map((news: News) => {
            return <Article key={news.id} news={news} />;
        })}
    </div>
  )
}
