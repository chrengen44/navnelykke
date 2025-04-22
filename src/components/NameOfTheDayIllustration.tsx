
import React from "react";

// Decorative illustration or Unsplash image based on name origin
const images: Record<string, string> = {
  Nordisk: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=260&q=80",
  Latinsk: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=260&q=80",
  Bibelsk: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=260&q=80",
};

const fallbackUrl = "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=260&q=80";

const NameOfTheDayIllustration: React.FC<{ origin: string }> = ({ origin }) => {
  const imgUrl = images[origin] || fallbackUrl;
  return (
    <div className="w-[72px] h-[72px] relative rounded-lg overflow-hidden border-2 border-purple-100 shadow-sm animate-fade-in">
      <img
        src={imgUrl}
        alt="Navn illustrasjon"
        className="object-cover w-full h-full"
        loading="lazy"
        style={{ filter: "saturate(1.15)" }}
      />
      <span className="absolute bottom-1 right-2 bg-white bg-opacity-70 text-xs text-gray-700 rounded px-2 py-0.5 shadow">
        {origin}
      </span>
    </div>
  );
};

export default NameOfTheDayIllustration;
