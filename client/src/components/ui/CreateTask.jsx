import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import {
  useAddNewTaskToProjectMutation,
  useGetProjectDetailsQuery,
} from "../../services/api";
import { ImCross } from "react-icons/im";
const CreateTask = ({ modal, projectId, members, slug }) => {
  const { refetch } = useGetProjectDetailsQuery(slug);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignedTo: [],
    priority: "",
    projectId: projectId,
  });
  const [createTask] = useAddNewTaskToProjectMutation();
  const handelCreate = async (e) => {
    e.preventDefault();
    const res = await createTask(taskData);
    if (res.error) {
      console.log(res.error);
      return;
    }
    refetch();
    modal(false);
  };
  return (
    <div className="h-screen w-full bg-gray-700/40 fixed top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={handelCreate}
        className="bg-white flex flex-col rounded-xl shadow space-y-6 max-w-md mx-auto p-6 w-full"
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-[#001F54]">
            Create a new task
          </h2>
          <button className="cursor-pointer" onClick={() => modal(false)}>
            <ImCross className="text-[#001F54]" />
          </button>
        </div>
        <Input
          label="Task Title"
          type="text"
          placeholder="Task Title here"
          onChange={(e) =>
            setTaskData((prev) => ({ ...prev, title: e.target.value }))
          }
          //   error={}
        />
        <Input
          label="Task Description"
          type="text"
          placeholder="Task Description here"
          //   error={}
          onChange={(e) =>
            setTaskData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <select className="border"
          onChange={(e) =>
            setTaskData((prev) => ({ ...prev, priority: e.target.value }))
          }
        >
          <option hidden >Select Priority</option>
          <option value="Medium">Mid</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
        <div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Assign Member To Task
  </label>

  <div className="flex flex-wrap gap-3">
    {members?.map((member) => (
      <label
        key={member._id}
        className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100"
      >
        <input
          type="checkbox"
          value={member._id}
          checked={taskData.assignedTo.includes(member._id)}
          onChange={(e) => {
            if (e.target.checked) {
              setTaskData((prev) => ({
                ...prev,
                assignedTo: [...prev.assignedTo, member._id],
              }));
            } else {
              setTaskData((prev) => ({
                ...prev,
                assignedTo: prev.assignedTo.filter(
                  (id) => id !== member._id
                ),
              }));
            }
          }}
        />

        {/* {member?.avatar ? (
          <img
            src={member.avatar}
            alt={member.fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : ( */}
          {/* <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
            {member?.fullName?.charAt(0)}
          </div> */}
        

        <span className="text-sm">{member.fullName}</span>
      </label>
    ))}
  </div>
</div>
        <Button type="submit" fullWidth>
          Create Task
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
