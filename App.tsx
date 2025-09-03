
import React, { useState, useCallback, useEffect } from 'react';
import { StyleOption } from './types';
import { HAIR_BEARD_STYLES } from './constants';
import { applyStyle } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import { MagicWandIcon } from './components/icons/MagicWandIcon';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [triggerGeneration, setTriggerGeneration] = useState<number>(0);

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImage(file);
    setGeneratedImage(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleStyleSelect = useCallback((style: StyleOption) => {
    setSelectedStyle(style);
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handleGenerateClick = useCallback(() => {
    if (originalImage && selectedStyle) {
      setTriggerGeneration(prev => prev + 1);
    }
  }, [originalImage, selectedStyle]);

  useEffect(() => {
    if (triggerGeneration === 0 || !originalImage || !selectedStyle) {
      return;
    }

    const generateImage = async () => {
      setIsLoading(true);
      setError(null);
      setGeneratedImage(null);
      try {
        const newImage = await applyStyle(originalImage, selectedStyle.prompt);
        setGeneratedImage(newImage);
      } catch (err) {
        console.error(err);
        setError('Failed to generate style. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    generateImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerGeneration, originalImage, selectedStyle]);


  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-8">
            <ImageUploader onImageUpload={handleImageUpload} preview={originalImagePreview} />
            <StyleSelector 
              styles={HAIR_BEARD_STYLES}
              selectedStyle={selectedStyle}
              onStyleSelect={handleStyleSelect}
            />
            <button
              onClick={handleGenerateClick}
              disabled={!originalImage || !selectedStyle || isLoading}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-indigo-600/30"
            >
              <MagicWandIcon />
              {isLoading ? 'Styling in Progress...' : 'Apply Style'}
            </button>
             {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </div>

          {/* Right Column: Results */}
          <div>
            <ResultDisplay 
              originalImage={originalImagePreview} 
              generatedImage={generatedImage} 
              isLoading={isLoading} 
              hasStyleBeenSelected={!!selectedStyle}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
