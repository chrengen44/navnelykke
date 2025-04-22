
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BabyName } from "@/data/types";
import { fetchNameOfTheDay } from "@/utils/nameOfTheDay";

const NameOfTheDay: React.FC = () => {
  const [todaysName, setTodaysName] = useState<BabyName | null>(null);
  const [loading, setLoading] = useState(true);

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
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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
    <div className="space-y-4">
      <div>
        <Link 
          to={`/navn/${todaysName.id}`} 
          className="text-2xl font-bold hover:text-pink-600 transition-colors"
        >
          {todaysName.name}
        </Link>
      </div>
      
      <div className="text-sm text-gray-600">
        Opprinnelse: {todaysName.origin}
      </div>
      
      <p className="text-sm text-gray-700">
        {todaysName.meaning}
      </p>

      <Button asChild size="sm" variant="outline" className="w-full mt-4">
        <Link to={`/navn/${todaysName.id}`}>
          Les mer
        </Link>
      </Button>
    </div>
  );
};

export default NameOfTheDay;
