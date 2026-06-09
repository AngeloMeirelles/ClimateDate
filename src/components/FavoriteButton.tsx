"use client";

import { Star } from "lucide-react";

interface Props {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

export default function FavoriteButton({ isFavorite, onToggle, size = 18 }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`p-1.5 rounded-lg transition-all ${
        isFavorite
          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
          : "bg-white/[0.06] text-white/30 hover:text-amber-400 hover:bg-amber-500/10"
      }`}
      title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Star size={size} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
}
