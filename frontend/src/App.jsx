import { useState } from "react";
import Navbar from "./components/Navbar";
import { Trash, X } from "lucide-react";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(true);
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-primary to-black">
      <Navbar />

      <section className="px-6">
        <div className="max-w-[800px] mx-auto h-full">
          <div className="w-full flex items-center justify-center mt-10 flex-col">
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="border border-borderColor h-10 md:h-12 rounded-lg flex items-center w-full font-exo">
                <input
                  type="text"
                  name="todo"
                  className="w-full bg-inher h-full rounded-s-lg outline-none px-4 text-sm font-medium placeholder:text-gray/90 placeholder:font-normal text-darker"
                  placeholder="Write out your daily activities..."
                />

                <button className="text-nowrap text-white text-sm font-semibold bg-gradient-to-br from-black to-primary/50 rounded-e-lg px-6 h-full hover:bg-gradient-to-tr active:from-primary/50">
                  Add Task
                </button>
              </div>
            </form>

            <div className="mt-6 w-full overflow-x-auto">
              <table className="w-full bg-[#f8f8f8] rounded-md table-auto border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-secondary/30 font-lato text-dark">
                    <th className="px-4 py-2 border-r border-gray text-left">
                      #
                    </th>
                    <th className="px-4 py-2 border-r border-gray text-left">
                      Tasks
                    </th>
                    <th
                      className="px-4 py-2 border-r border-gray text-center"
                      colSpan={2}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-primary/10 font-exo">
                    <td className="border-r border-gray px-4 py-2 whitespace-nowrap text-darker">
                      1
                    </td>
                    <td className="border-r border-gray px-4 py-2 font-montserrat text-darker">
                      Hit the Gym house and lift 1000kg dumbell
                    </td>
                    <td className=" px-4 py-2 whitespace-nowrap flex justify-between gap-6 md:gap-4">
                      <button
                        className="outline-none font-medium text-yellow-500 hover:text-yellow-300 active:text-yellow-700 duration-300"
                        onClick={() => setShowModal(true)}
                      >
                        Edit
                      </button>
                      <Trash
                        className="w-5 text-red-700 hover:text-red-500 active:text-red-900 duration-300"
                        onClick={() => setDeleteModal(true)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        maxWidth={848}
      >
        <div className="text-primary flex items-center justify-between gap-3">
          <h2 className="font-montserrat font-bold md:text-xl">Edit task</h2>
          <X className="cursor-pointer" onClick={() => setShowModal(false)} />
        </div>

        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              className="w-full h-10 border border-primary rounded-md outline-none px-4 text-sm text-primary"
              placeholder="Edit your task here..."
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="px-10 h-10 bg-secondary hover:bg-secondary/90 active:bg-primary duration-300 rounded-md text-white font-semibold text-sm"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        maxWidth={500}
      >
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-primary font-montserrat font-semibold text-sm md:text-base">
            Are you sure you want to delete this item?
          </h2>
          <div className="flex items-center justify-around w-full mt-4 text-xs md:text-sm font-semibold font-lato">
            <button className="bg-gray/80 hover:bg-gray/60 active:bg-gray duration-300 py-2 px-4 rounded-md text-white" onClick={()=>setDeleteModal(false)}>
              Cancel
            </button>
            <button className="bg-red-600 hover:bg-red-500 active:bg-red-700 duration-300 py-2 px-4 rounded-md text-white">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default App;
