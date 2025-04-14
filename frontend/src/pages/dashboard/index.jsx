import { useState } from "react";
import { Trash, X } from "lucide-react";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";
import Taskform from "../../components/Taskform";
import TasksTable from "../../components/TasksTable";

const Dashboard = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <section className="px-6">
        <div className="max-w-[800px] mx-auto h-full">
          <div className="w-full flex items-center justify-center mt-10 flex-col">
            <Taskform />

            <TasksTable />
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default Dashboard;
