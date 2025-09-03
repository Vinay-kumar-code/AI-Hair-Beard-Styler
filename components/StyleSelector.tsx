import React from 'react';
import { StyleOption } from '../types';

interface StyleSelectorProps {
  styles: StyleOption[];
  selectedStyle: StyleOption | null;
  onStyleSelect: (style: StyleOption) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-slate-200">2. Choose a Style</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:-translate-y-1 ${
              selectedStyle?.id === style.id
                ? 'border-indigo-500 scale-105 shadow-lg shadow-indigo-500/20'
                : 'border-slate-700 hover:border-indigo-600'
            }`}
          >
            <img src={style.imageUrl} alt={style.name} className="w-full h-24 object-cover" />
            <p className="bg-slate-700/50 text-center p-2 text-sm font-semibold text-slate-300">{style.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;