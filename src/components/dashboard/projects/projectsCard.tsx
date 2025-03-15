"use client";

import { Dispatch, SetStateAction } from "react";
import { Trash2 } from "lucide-react";
import DefaultCard from "@/components/layout/defaultCard";
import { Button } from "@/components/ui/button";
import { ProjectsType } from "@/db/types/types";

export default function ProjectsCard({
  onClickHandler,
  projectCardTitle,
  projectName,
  setIsModalOpen,
  setProjectToBeDeleted,
  userProjects,
}: {
  onClickHandler: (arg0: { project: string }) => void;
  projectCardTitle: string;
  projectName?: string | null;
  setIsModalOpen: (arg0: boolean) => void;
  setProjectToBeDeleted: Dispatch<SetStateAction<ProjectsType | null>>;
  userProjects: ProjectsType[];
}) {
  return userProjects?.map((project: ProjectsType, index: number) => (
    <DefaultCard
      className={`${
        projectName === project?.title ? "border-2 border-primary" : ""
      } mt-5`}
      isHoverable
      key={`${index}-${project.title}`}
      onClick={() =>
        project.title ? onClickHandler({ project: project.title }) : null
      }
    >
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          {projectCardTitle}
          <span className="font-bold">{project.title}</span>
        </div>
        <div>
          <Button
            className="w-[50px] h-[50px] z-10 hover:bg-destructive/10"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
              setProjectToBeDeleted((prevState) => {
                if (prevState === null) {
                  return project;
                } else {
                  return {
                    ...prevState,
                    ...project,
                  };
                }
              });
            }}
            size="icon"
            variant="ghost"
          >
            <Trash2 className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      </div>
    </DefaultCard>
  ));
}
