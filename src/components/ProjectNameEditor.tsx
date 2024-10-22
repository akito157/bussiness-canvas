import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface ProjectNameEditorProps {
  name: string;
  onNameChange: (newName: string) => void;
}

const ProjectNameEditor: React.FC<ProjectNameEditorProps> = ({ name, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNameChange(editedName);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
            autoFocus
          />
          <button type="submit" className="text-blue-600 hover:text-blue-800">
            保存
          </button>
        </form>
      ) : (
        <>
          <h2 className="text-2xl font-bold mr-2">{name}</h2>
          <button onClick={() => setIsEditing(true)} className="text-gray-600 hover:text-gray-800">
            <Edit2 size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default ProjectNameEditor;