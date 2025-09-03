import React from 'react';
import Loader from './Loader';
import { ImageIcon } from './icons/ImageIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  hasStyleBeenSelected: boolean;
}

const ImagePanel: React.FC<{ title: string; imageUrl: string | null; children?: React.ReactNode }> = ({ title, imageUrl, children }) => (
    <div className="w-full">
        <h3 className="text-lg font-semibold text-slate-400 mb-3 text-center">{title}</h3>
        <div className="aspect-square bg-slate-800 rounded-lg shadow-inner border border-slate-700 flex items-center justify-center overflow-hidden relative">
            {imageUrl ? (
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
                 <div className="text-slate-500 flex flex-col items-center">
                    <ImageIcon />
                    <span className="mt-2 text-sm">Image will appear here</span>
                </div>
            )}
            {children}
        </div>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading, hasStyleBeenSelected }) => {
    const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    
    const mimeType = generatedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    let extension = 'png'; // default
    if (mimeType && mimeType.length > 1) {
      extension = mimeType[1].split('/')[1];
    }

    link.download = `styled-look.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="flex flex-col items-center gap-6">
       <h2 className="text-2xl font-bold text-slate-200 self-start">Your New Look</h2>
       <div className="w-full relative">
        <ImagePanel title="Styled" imageUrl={generatedImage}>
            {isLoading && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                    <Loader />
                    <p className="text-slate-300 mt-4 text-center">Generating your new style... <br/> This may take a moment.</p>
                </div>
            )}
            {!isLoading && !generatedImage && hasStyleBeenSelected && (
                 <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
                    <p className="text-slate-300 text-center">Click "Apply Style" to see the magic!</p>
                </div>
            )}
        </ImagePanel>
        {generatedImage && !isLoading && (
          <button
            onClick={handleDownload}
            className="mt-6 w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-600/30"
            aria-label="Download Styled Image"
          >
            <DownloadIcon />
            Download Image
          </button>
        )}
       </div>
    </div>
  );
};

export default ResultDisplay;