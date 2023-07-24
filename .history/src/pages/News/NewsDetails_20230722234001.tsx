import { Dialog, Transition, Listbox } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"


const NewsDetails = () => {
  let [isOpen, setIsOpen] = useState(true);
  let navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }


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
                    Legendary Coach Announces Retirement: Reflecting on a Storied Career
                  </Dialog.Title>
                  <div className="mt-2">
                      <img src="https://images.pexels.com/photos/2260849/pexels-photo-2260849.jpeg" className="w-full h-56" alt="" />

                      <div className="flex justify-between">
                      <p className="mt-2 text-sm">
                        <span className="font-bold">Sport Catagory : </span> Cricket
                      </p> <p className="mt-2 text-sm">
                        <span className="text-lg font-bold">End At : </span> Thu Jun 08 2023
                      </p>
                      </div>

                      <p className="my-2 text-sm">
                      <span className="font-bold">Discription : </span>
                      In a moment that marks the end of an era, a legendary basketball coach has announced their retirement, bringing an illustrious career to a close. The coach's impact on the sport is immeasurable, with numerous championships, accolades, and a lasting legacy that will be remembered for generations.\n\nThroughout their career, the coach guided teams to remarkable success, instilling a winning culture, and nurturing the talents of their players. Their strategic brilliance, leadership, and ability to motivate and inspire have left an indelible mark on the basketball landscape.\n\nThe retirement announcement has prompted reflection on the coach's storied career, with fans and players alike reminiscing about memorable victories, iconic moments, and the coach's unwavering commitment to excellence. The coach's influence extends far beyond the court, as they have shaped the lives of countless individuals, instilling values of discipline, teamwork, and perseverance.\n\nAs the coach takes their final bow, the basketball community celebrates their remarkable achievements and expresses gratitude for the countless contributions they have made to the sport. Their retirement marks the end of an era but serves as a reminder of the enduring impact a legendary coach can have on the game of basketball
                      </p>
                      <button
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
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