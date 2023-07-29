import React from 'react'

export default function ArticleList() {
  return (
    <div className="overflow-y-auto w-10/12 h-[65vh] relative bottom-0">
    {news.map((news: News) => {
      return <Article key={news.id} news={news} />;
    })}
  </div>
  )
}
