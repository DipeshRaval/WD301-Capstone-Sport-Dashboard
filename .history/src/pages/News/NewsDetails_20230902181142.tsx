import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { Team, Sport } from "../../context/news/reducer";

interface ArticleDetails {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  sport: Sport;
  content: string;
  date: string;
  teams: Team[];
}

const NewsDetails = () => {
  let [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const { articleID } = useParams();

  const [article, setArticle] = useState<ArticleDetails | undefined>(undefined);

  function closeModal() {
    setIsOpen(false);
    navigate("../");
  }

  const fetchArticle = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const data = await response.json();
      setArticle(data);
      setIsLoading(false);
    } catch (error) {
      console.error("failed to fetch a article", error);
    }
  };

  const handNewsLikes = (id: number) => {
    const likematch = localStorage.getItem("likeArticles");
    if (likematch) {
      const updateLikes = JSON.parse(likematch);
      if (updateLikes.includes(id)) {
        const index = updateLikes.indexOf(id);
        index > -1 ? updateLikes.splice(index, 1) : "";
      } else {
        updateLikes.push(id);
      }
      console.log(updateLikes);

      localStorage.setItem("likeArticles", JSON.stringify(updateLikes));
    } else {
      localStorage.setItem("likeArticles", JSON.stringify([id]));
    }
  };

  useEffect(() => {
    fetchArticle(articleID);
  }, [articleID]);

  const getFormatedDate = (date: any) => {
    const newDate = new Date(date);
    const formatDate = newDate.toDateString();
    return `${formatDate}`;
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative w-11/12 z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-xl text-center border-b border-gray-600 pb-2 font-bold leading-6 text-gray-900"
                      >
                        {article?.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <img
                          src={article?.thumbnail}
                          className="w-full h-56"
                          alt="thumbnail"
                        />

                        <div className="flex justify-between">
                          <p className="mt-2 text-md">
                            <span className="font-bold">Sport Catagory : </span>{" "}
                            {article?.sport.name}
                          </p>{" "}
                          <p className="mt-2 text-md">
                            <span className="font-bold">End At : </span>
                            {getFormatedDate(article?.date?.substring(0, 10))}
                          </p>
                        </div>

                        <div className="flex my-2 items-center">
                          {article?.teams.length !== 0 ? (
                            <span className="font-bold text-lg mr-2">
                              Team :{" "}
                            </span>
                          ) : (
                            ""
                          )}
                          <span>
                            {article?.teams
                              .map((item) => {
                                return ` ${item.name} `;
                              })
                              .join(" Vs ")}
                          </span>
                        </div>

                        <div>
                          <p className="my-2 text-sm h-56 overflow-y-auto">
                            <span className="font-bold text-lg">
                              Discription :{" "}
                            </span>
                            {article?.content}
                          </p>
                        </div>
                        <button
                          onClick={closeModal}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Close
                        </button>
                      </div>{" "}
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewsDetails;
