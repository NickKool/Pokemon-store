import { Component } from 'react';

interface PokemonCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export class PokemonCard extends Component<PokemonCardProps> {
  render() {
    const { name, description, imageUrl } = this.props;

    return (
      <div
        className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col items-center 
                      transition-transform hover:scale-105 shadow-md"
      >
        <div className="w-32 h-32 bg-slate-900 rounded-full mb-4 flex items-center justify-center">
          <img src={imageUrl} alt={name} className="w-24 h-24 object-contain" />
        </div>

        <h3 className="text-main-text font-bold text-xl capitalize mb-2 font-sans">{name}</h3>

        <p className="text-sub-text text-sm text-center line-clamp-2">{description}</p>
      </div>
    );
  }
}
