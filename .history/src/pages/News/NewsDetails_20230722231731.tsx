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
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new Task
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="text"
                        required
                        placeholder="Enter title"
                        autoFocus
                        id="title"
                        // Register the title field
                        {...register("title", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Enter description"
                        autoFocus
                        id="description"
                        // register the description field
                        {...register("description", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="date"
                        required
                        placeholder="Enter due date"
                        autoFocus
                        id="dueDate"
                        // register due date field
                        {...register("dueDate", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <button
                        type="submit"
                        // Set an id for the submit button
                        id="newTaskSubmitBtn"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                      <button
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </form>
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