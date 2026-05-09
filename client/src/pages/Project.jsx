import React, { useState } from "react";
import {
  useGetProjectDetailsQuery,
  useUpdateTaskStatusMutation,
} from "../services/api";
import { useParams } from "react-router";
import Button from "../components/ui/Button";
import UserAvatarGroup from "../components/ui/UserAvatarGroup";
import CreateTask from "../components/ui/CreateTask";

const Project = () => {
  const { slug } = useParams();
  const { data, refetch } = useGetProjectDetailsQuery(slug);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [modal, setModal] = useState(false);

  console.log(data);
  return (
    <div className="py-20">
      <div className="m-auto max-w-4xl flex justify-between pb-4 border-b-2 border-gray-500">
        <div className="space-y-6">
          <h2 className="text-xl">
            <span className="font-bold">Project Name :</span> {data?.title}
          </h2>
          <h2>
            <span className="font-bold">Project Details :</span>{" "}
            {data?.description}
          </h2>
        </div>
        <div className="space-y-6">
          <Button>Add Member</Button>
          <div className="flex gap-3 items-center ">
            <p>Author :</p>
            <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white text-xs">
              {data?.author.avatar ? (
                <img
                  src={data?.author.avatar}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                data?.fullName?.charAt(0)
              )}
            </div>
            <h2 className=" font-bold">{data?.author.fullName}</h2>
          </div>
          <div>
            <p>Members :</p>
            <div>
              {data?.members && data?.members.length > 0 && (
                <UserAvatarGroup members={data?.members} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto max-w-4xl mt-15 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-2xl">Task List</h3>
          <Button onClick={() => setModal(true)}>Add Task</Button>
        </div>
        <div className="space-y-8">
          {data?.tasks.map((item) => (
            <div
              key={item._id}
              className={`rounded-xl p-6 flex justify-between transition-all duration-300 ${
                item?.status
                  ? "bg-green-200 border border-green-400"
                  : "bg-slate-300"
              }`}
            >
              <div className="space-y-2">
                <h4 className="text-xl font-medium">{item?.title}</h4>
                <h4>{item?.description}</h4>
                <div>
                  <p className="border-b-1 border-gray-400">Assigned To :</p>
                  <div>
                    {item?.assignedTo && item?.assignedTo.length > 0 && (
                      <UserAvatarGroup members={item?.assignedTo} />
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h5>Priority : {item?.priority}</h5>
                <div className="flex items-center gap-3">
                  <span>
                    Status : {item?.status ? "Completed" : "Incomplete"}
                  </span>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item?.status}
                      onChange={async (e) => {
                        await updateTaskStatus({
                          projectId: data?._id,
                          taskId: item?._id,
                          status: e.target.checked,
                        });

                        refetch();
                      }}
                    />

                    <div className="w-11 h-6 bg-[#001F54] rounded-full peer peer-checked:bg-green-500 transition-all"></div>

                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>
                <Button
                  disabled={item?.status}
                  className={`${
                    item?.status
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : ""
                  }`}
                >
                  {item?.status ? "Completed" : "Assign Member"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <CreateTask
          modal={(mode) => setModal(mode)}
          projectId={data?._id}
          slug={slug}
          members={data?.members}
        />
      )}
    </div>
  );
};

export default Project;
