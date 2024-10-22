import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface CanvasBlockProps {
  title: string;
  content: string;
  onContentChange: (content: string) => void;
}

const CanvasBlock: React.FC<CanvasBlockProps> = ({ title, content, onContentChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-2">{title}</h3>
      {isEditing ? (
        <textarea
          className="w-full h-32 p-2 border rounded"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)} className="cursor-pointer">
          <ReactMarkdown>{content || 'クリックして編集'}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default CanvasBlock;