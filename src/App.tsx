import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import CanvasBlock from './components/CanvasBlock';
import ExportButton from './components/ExportButton';
import ProjectList from './components/ProjectList';
import ProjectNameEditor from './components/ProjectNameEditor';
import DarkModeToggle from './components/DarkModeToggle';
import { nanoid } from 'nanoid';

interface CanvasData {
  [key: string]: string;
}

interface Project {
  id: string;
  name: string;
  lastModified: Date;
  canvas: CanvasData;
}

const INITIAL_CANVAS: CanvasData = {
  'Key Partners': '',
  'Key Activities': '',
  'Value Propositions': '',
  'Customer Relationships': '',
  'Customer Segments': '',
  'Key Resources': '',
  'Channels': '',
  'Cost Structure': '',
  'Revenue Streams': '',
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      setProjects(parsedProjects);
      setCurrentProject(parsedProjects[0] || null);
    }
    const storedDarkMode = localStorage.getItem('darkMode');
    setIsDarkMode(storedDarkMode === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const createNewProject = () => {
    const newProject: Project = {
      id: nanoid(),
      name: `新規プロジェクト ${projects.length + 1}`,
      lastModified: new Date(),
      canvas: { ...INITIAL_CANVAS },
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  };

  const updateCanvas = (key: string, content: string) => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        canvas: { ...currentProject.canvas, [key]: content },
        lastModified: new Date(),
      };
      setCurrentProject(updatedProject);
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    }
  };

  const updateProjectName = (newName: string) => {
    if (currentProject) {
      const updatedProject = { ...currentProject, name: newName };
      setCurrentProject(updatedProject);
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <header className="bg-white dark:bg-gray-900 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">ビジネスモデルキャンバス</h1>
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex">
            <div className="w-1/4 pr-4">
              <ProjectList
                projects={projects}
                currentProject={currentProject}
                onSelectProject={setCurrentProject}
              />
              <button
                onClick={createNewProject}
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 w-full justify-center"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                新規プロジェクト
              </button>
            </div>
            <div className="w-3/4">
              {currentProject && (
                <>
                  <ProjectNameEditor
                    name={currentProject.name}
                    onNameChange={updateProjectName}
                  />
                  <div id="business-model-canvas" className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-4">
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(currentProject.canvas).map(([key, content]) => (
                        <CanvasBlock
                          key={key}
                          title={key}
                          content={content}
                          onContentChange={(newContent) => updateCanvas(key, newContent)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <ExportButton />
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;