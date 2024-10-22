import React from 'react';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
  currentProject: Project | null;
  onSelectProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, currentProject, onSelectProject }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">プロジェクト一覧</h2>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className={`cursor-pointer p-2 rounded ${
              project.id === currentProject?.id ? 'bg-blue-100 dark:bg-blue-800' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => onSelectProject(project)}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;