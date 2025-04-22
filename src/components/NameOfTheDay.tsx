import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
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
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-6 flex items-center justify-center h-40">
          <div className="animate-pulse rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </CardContent>
      </Card>
    );
  }

  if (!todaysName) {
    return (
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-6 text-center text-gray-600">
          Ingen navn funnet for dagen
        </CardContent>
      </Card>
    );
  }

  const bgColorClass = todaysName?.gender === 'girl' 
    ? 'bg-babypink/30' 
    : todaysName?.gender === 'boy' 
      ? 'bg-babyblue/30'
      : 'bg-babypeach/30';

  return (
    <Card className={`shadow-sm border-0 ${bgColorClass}`}>
      <CardHeader className="pb-2 pt-4">
        <h3 className="text-lg font-semibold text-center">Dagens navn</h3>
      </CardHeader>
      
      <CardContent className="py-3 px-6 text-center">
        <div className="mb-2">
          <Link to={`/navn/${todaysName.id}`} className="text-2xl font-bold hover:text-pink-600 transition-colors">
            {todaysName.name}
          </Link>
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          Opprinnelse: {todaysName.origin}
        </div>
        
        <p className="text-sm">
          {todaysName.meaning}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 flex justify-center">
        <Button asChild size="sm" variant="outline">
          <Link to={`/navn/${todaysName.id}`}>
            Les mer
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NameOfTheDay;
