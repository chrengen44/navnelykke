
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BabyName } from "@/data/types";
import { fetchNameOfTheDay } from "@/utils/nameOfTheDay";
import NameFunFacts from "./NameFunFacts";
import FavoriteButton from "@/components/FavoritesButton";
import { useFavorites } from "@/contexts/FavoritesContext";

const animatedWrapper = "transition-all duration-500 animate-fade-in";

const NameOfTheDay: React.FC = () => {
  const [todaysName, setTodaysName] = useState<BabyName | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite } = useFavorites();

  useEffect(() => {
    const loadNameOfTheDay = async () => {
      try {
        setLoading(true);
        const name = await fetchNameOfTheDay();
        setTodaysName(name);
      } finally {
        setLoading(false);
      }
    };

    loadNameOfTheDay();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-7 bg-purple-100 rounded w-2/3 mb-2"></div>
        <div className="h-5 bg-purple-100 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-11 bg-gray-100 rounded w-full"></div>
      </div>
    );
  }

  if (!todaysName) {
    return (
      <div className="text-center text-gray-600">
        Ingen navn funnet for dagen
      </div>
    );
  }

  return (
    <div className={`space-y-5 ${animatedWrapper}`}>
      <div className="flex flex-col gap-5">
        {/* Main name info */}
        <div>
          <div className="flex gap-2 items-center mb-1">
            <Link
              to={`/navn/${todaysName.id}`}
              className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent block hover:scale-105 transition-transform"
            >
              {todaysName.name}
            </Link>
            <FavoriteButton nameId={todaysName.id} />
          </div>
          <div className="text-sm text-gray-600">
            Opprinnelse: <span className="font-semibold">{todaysName.origin}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">Kjønn: {todaysName.gender === "boy" ? "Gutt" : todaysName.gender === "girl" ? "Jente" : "Unisex"}</div>
          <p className="text-base text-gray-700 mt-1">{todaysName.meaning}</p>
        </div>

        {/* Fun facts, history, notable people */}
        <NameFunFacts nameObj={todaysName} />
      </div>

      <Button asChild size="sm" variant="outline" className="w-full mt-2 animate-fade-in">
        <Link to={`/navn/${todaysName.id}`}>
          Les mer
        </Link>
      </Button>
    </div>
  );
};

export default NameOfTheDay;
