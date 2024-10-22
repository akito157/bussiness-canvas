import React from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ExportButton: React.FC = () => {
  const handleExport = async (type: 'png' | 'pdf') => {
    const canvas = document.getElementById('business-model-canvas');
    if (canvas) {
      const image = await html2canvas(canvas);
      if (type === 'png') {
        const link = document.createElement('a');
        link.download = 'business-model-canvas.png';
        link.href = image.toDataURL();
        link.click();
      } else {
        const pdf = new jsPDF();
        const imgData = image.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('business-model-canvas.pdf');
      }
    }
  };

  return (
    <div className="space-x-2">
      <button
        onClick={() => handleExport('png')}
        className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
      >
        <Download className="mr-2 h-5 w-5" />
        PNG出力
      </button>
      <button
        onClick={() => handleExport('pdf')}
        className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        <Download className="mr-2 h-5 w-5" />
        PDF出力
      </button>
    </div>
  );
};

export default ExportButton;