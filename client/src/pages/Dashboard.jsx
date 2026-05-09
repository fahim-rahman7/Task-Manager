import React, { useState } from "react";
import { useGetProfileQuery, useGetProjectListQuery } from "../services/api";
import Loader from "../components/ui/Loader";
import { Navigate } from "react-router";
import Button from "../components/ui/Button";
import CreateProject from "../components/ui/CreateProject";
import ProjectCard from "../components/ui/ProjectCard";

const Dashboard = () => {
  const { data, isLoading } = useGetProfileQuery();
  console.log(data);
  const { data: projectList, isLoading: projectLoading } =
    useGetProjectListQuery();
    console.log(projectList);
  const [modal, setModal] = useState(false);

  if (isLoading) return <Loader />;

  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <Button
        onClick={() => setModal(true)}
        className="fixed bottom-10 right-5 cursor-pointer"
        size="lg"
      >
        + Create Project
      </Button>
  
      <div className="container grid grid-cols-4 gap-6 pt-20">
        {projectList?.length > 0 ? (
          projectList?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p className="">No projects found</p>
        )}
      </div>
      {modal && <CreateProject modal={(mode) => setModal(mode)} />}
    </div>
  );
};

export default Dashboard;
