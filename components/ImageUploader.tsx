
import React, { useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  preview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, preview }) => {

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700">
       <h2 className="text-xl font-bold mb-4 text-slate-200">1. Upload Your Photo</h2>
      <label
        onDragOver={handleDragOver}
        onDrop={handleDrop} 
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700/50 transition-colors duration-300 ${preview ? 'border-indigo-500' : ''}`}>
        {preview ? (
          <img src={preview} alt="Your upload" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
            <UploadIcon />
            <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs">PNG, JPG or WEBP</p>
          </div>
        )}
        <input 
          id="dropzone-file" 
          type="file" 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
