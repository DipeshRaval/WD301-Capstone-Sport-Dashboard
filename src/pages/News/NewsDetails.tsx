import { Dialog, Transition, Listbox } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import Article from "./Article";

interface Sport {
  id: number;
  name: string;
}

interface ArticleDetails {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  sport: Sport;
  content: string;
  date: string;
}

const NewsDetails = () => {
  let [isOpen, setIsOpen] = useState(true);
  let navigate = useNavigate();
  const { articleID } = useParams();

  const [article, setArticle] = useState<ArticleDetails | undefined>(undefined);

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const fetchArticle = async (id: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error("Sign-in failed:", error);
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

                    <p className="my-2 text-sm">
                      <span className="font-bold text-lg">Discription : </span>
                      {article?.content}
                    </p>
                    <button
                      onClick={closeModal}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
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
