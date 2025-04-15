import { Trash, X } from "lucide-react";
import React from "react";
import useTasksTable from "../hooks/useTasksTable";
import Modal from "./Modal";
import { PiSpinner } from "react-icons/pi";

const TasksTable = () => {
  const {
    tasks,
    deleteModal,
    setDeleteModal,
    setShowModal,
    showModal,
    setTaskId,
    formik,
    isEditTaskLoading,
    handleCompleteTask,
    handleDeleteTask,
    isLoading,
    isDeleteTaskLoading,
    allTasks,
  } = useTasksTable();

  return (
    <section className="w-full">
      <div className="mt-6 w-full overflow-x-auto">
        <table className="w-full bg-[#f8f8f8] rounded-md text-sm ">
          <thead>
            <tr className="bg-secondary/30 font-lato text-dark">
              <th className="px-4 py-2 border-r border-gray text-left">#</th>
              <th className="px-4 py-2 border-r border-gray text-left w-full">
                Tasks
              </th>
              <th
                className="px-4 py-2 border-r border-gray text-center "
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allTasks?.map((task, i) => (
              <tr
                className={`even:bg-primary/10 font-exo cursor-pointer w-full ${
                  task?.completed ? " text-gray" : "text-darker"
                } `}
                key={i}
              >
                <td className="border-r border-gray px-4 py-2 whitespace-nowrap">
                  {i + 1}
                </td>
                <td
                  className={`${
                    task?.completed ? "line-through" : "font-medium"
                  } border-r border-gray px-4 py-2 font-montserrat`}
                  onDoubleClick={() => {
                    handleCompleteTask(task?._id);
                  }}
                >
                  {task?.title}
                </td>
                <td className=" px-4 py-2 whitespace-nowrap flex justify-between gap-6 md:gap-14">
                  <button
                    className="outline-none font-medium text-yellow-500 hover:text-yellow-300 active:text-yellow-700 duration-300"
                    onClick={() => {
                      setShowModal(true), setTaskId(task?._id);
                    }}
                  >
                    Edit
                  </button>
                  <Trash
                    className="w-5 text-red-700 hover:text-red-500 active:text-red-900 duration-300"
                    onClick={() => {
                      setDeleteModal(true), setTaskId(task?._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allTasks?.length === 0 && (
          <p className="text-white text-center mt-4 font-semibold text-xs md:text-sm font-montserrat">
            No task available
          </p>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false), setTaskId("");
        }}
        maxWidth={848}
      >
        <div className="text-primary flex items-center justify-between gap-3">
          <h2 className="font-montserrat font-bold md:text-xl">Edit task</h2>
          <X
            className="cursor-pointer"
            onClick={() => {
              setShowModal(false), setTaskId("");
            }}
          />
        </div>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div>
            <input
              name="title"
              id="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              type="text"
              className="w-full h-10 border border-primary outline-none px-4 rounded-lg text-sm font-medium placeholder:text-gray/90 placeholder:font-normal text-darker"
              placeholder="Edit your task here..."
            />
          </div>
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-[10px] lg:text-xs font-semibold">
              {formik.errors.title}
            </div>
          ) : null}
          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="px-10 h-10 bg-secondary hover:bg-secondary/90 active:bg-primary duration-300 rounded-md text-white font-semibold text-sm"
            >
              {isEditTaskLoading ? (
                <PiSpinner className="animate-spin" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false), setTaskId("");
        }}
        maxWidth={500}
      >
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-primary font-montserrat font-semibold text-sm md:text-base">
            Are you sure you want to delete this item?
          </h2>
          <div className="flex items-center justify-around w-full mt-4 text-xs md:text-sm font-semibold font-lato">
            <button
              className="bg-gray/80 hover:bg-gray/60 active:bg-gray duration-300 py-2 px-4 rounded-md text-white"
              onClick={() => {
                setDeleteModal(false), setTaskId("");
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteTask}
              className={`${
                isDeleteTaskLoading ? "bg-red-400" : "bg-red-600"
              }  hover:bg-red-500 active:bg-red-700 duration-300 py-2 px-4 rounded-md text-white`}
            >
              {isDeleteTaskLoading ? (
                <PiSpinner className="animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default TasksTable;
