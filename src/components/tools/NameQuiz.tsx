
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { babyNames } from "@/data";
import { BabyName } from "@/data/types";
import { Check, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

const NameQuiz: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [results, setResults] = useState<BabyName[]>([]);
  const [gender, setGender] = useState<string>("any");
  const [loading, setLoading] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: "nameLength",
      question: "Hvilken lengde foretrekker du?",
      options: [
        { value: "short", label: "Korte navn (3-5 bokstaver)" },
        { value: "medium", label: "Mellom (6-8 bokstaver)" },
        { value: "long", label: "Lange navn (9+ bokstaver)" },
        { value: "any", label: "Alle lengder" },
      ],
    },
    {
      id: "nameOrigin",
      question: "Hvilken opprinnelse foretrekker du?",
      options: [
        { value: "nordisk", label: "Nordisk" },
        { value: "Germansk", label: "Germansk" },
        { value: "Latinsk", label: "Latinsk" },
        { value: "Gresk", label: "Gresk" },
        { value: "any", label: "Alle opprinnelser" },
      ],
    },
    {
      id: "nameStyle",
      question: "Hvilken stil foretrekker du?",
      options: [
        { value: "klassisk", label: "Klassisk og tradisjonell" },
        { value: "moderne", label: "Moderne og trendy" },
        { value: "unik", label: "Unik og sjelden" },
        { value: "any", label: "Alle stiler" },
      ],
    },
  ];
  
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };
  
  const handleCategoryToggle = (category: string) => {
    setCategories(
      categories.includes(category)
        ? categories.filter(c => c !== category)
        : [...categories, category]
    );
  };
  
  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      // Filter names based on quiz answers
      let filteredNames = [...babyNames];
      if (gender !== "any") {
        filteredNames = filteredNames.filter(name => 
          gender === "both" ? name.gender === "unisex" : name.gender === gender
        );
      }
      if (answers.nameLength && answers.nameLength !== "any") {
        filteredNames = filteredNames.filter(name => name.length === answers.nameLength);
      }
      if (answers.nameOrigin && answers.nameOrigin !== "any") {
        filteredNames = filteredNames.filter(name => 
          name.origin.includes(answers.nameOrigin)
        );
      }
      if (answers.nameStyle && answers.nameStyle !== "any") {
        filteredNames = filteredNames.filter(name => 
          name.categories.includes(answers.nameStyle)
        );
      }
      if (categories.length > 0) {
        filteredNames = filteredNames.filter(name => 
          categories.some(category => name.categories.includes(category))
        );
      }
      filteredNames.sort((a, b) => b.popularity - a.popularity);
      const finalResults = filteredNames.slice(0, 12);
      setResults(finalResults);
      setLoading(false);
      if (finalResults.length === 0) {
        toast({
          title: "Ingen treff",
          description: "Prøv å justere kriteriene dine for å få flere resultater",
        });
      }
      setCurrentStep(questions.length + 1);
    }, 800);
  };
  
  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setCategories([]);
    setResults([]);
    setGender("any");
    setLoading(false);
  };

  return (
    <Card className="bg-white shadow-md border-0">
      <CardContent className="p-6 md:p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Navnequiz</h2>
          <p className="text-gray-600 mb-2 text-sm">
            Svar på noen spørsmål for å finne navn som passer din stil og preferanser.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-pink-500 h-2.5 rounded-full transition-all"
              style={{ 
                width: `${(currentStep / (questions.length + 1)) * 100}%` 
              }}
            />
          </div>
        </div>
        
        {currentStep === 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Velg kjønn</h3>
            <RadioGroup value={gender} onValueChange={setGender} className="gap-3 flex flex-wrap">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="girl" id="girl" />
                <Label htmlFor="girl">Jente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="boy" id="boy" />
                <Label htmlFor="boy">Gutt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="unisex" />
                <Label htmlFor="unisex">Unisex</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Alle kjønn</Label>
              </div>
            </RadioGroup>
          </div>
        )}
        
        {currentStep > 0 && currentStep <= questions.length && (
          <div>
            <h3 className="text-lg font-medium mb-3">{questions[currentStep - 1].question}</h3>
            <RadioGroup 
              value={answers[questions[currentStep - 1].id] || ""} 
              onValueChange={(value) => handleAnswerChange(questions[currentStep - 1].id, value)}
              className="gap-3 flex flex-col"
            >
              {questions[currentStep - 1].options.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        
        {currentStep === questions.length && (
          <div>
            <h3 className="text-lg font-medium mb-3">Ekstra kategorier (valgfritt)</h3>
            <p className="text-sm text-gray-500 mb-3">
              Velg ytterligere kategorier du er interessert i
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="vikingnavn" 
                  checked={categories.includes("vikingnavn")}
                  onCheckedChange={() => handleCategoryToggle("vikingnavn")}
                />
                <label htmlFor="vikingnavn" className="text-sm font-medium">
                  Vikingnavn
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bibelsk" 
                  checked={categories.includes("bibelsk")}
                  onCheckedChange={() => handleCategoryToggle("bibelsk")}
                />
                <label htmlFor="bibelsk" className="text-sm font-medium">
                  Bibelske navn
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="naturnavn" 
                  checked={categories.includes("naturnavn")}
                  onCheckedChange={() => handleCategoryToggle("naturnavn")}
                />
                <label htmlFor="naturnavn" className="text-sm font-medium">
                  Naturnavn
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="internasjonal" 
                  checked={categories.includes("internasjonal")}
                  onCheckedChange={() => handleCategoryToggle("internasjonal")}
                />
                <label htmlFor="internasjonal" className="text-sm font-medium">
                  Internasjonale navn
                </label>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === questions.length + 1 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Dine navneforslag</h3>
            {loading ? (
              <div className="w-full py-10 flex flex-col items-center justify-center animate-fade-in">
                <Loader className="w-10 h-10 text-pink-400 animate-spin mb-2" />
                <span className="text-gray-400 text-sm">Laster forslag...</span>
              </div>
            ) : (
              results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-fade-in">
                  {results.map((name) => (
                    <div 
                      key={name.id} 
                      className="p-3 bg-gray-50 rounded-lg text-center border border-gray-100 hover:bg-pink-50 transition-colors shadow-sm flex flex-col min-h-[70px]"
                    >
                      <div className="font-medium text-pink-700 text-base">{name.name}</div>
                      <div className="text-xs mt-1 text-gray-500 min-h-[28px] truncate" title={name.meaning}>
                        {name.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  Ingen navn funnet med disse kriteriene. Prøv å justere valgene dine.
                </div>
              )
            )}
            <Button onClick={resetQuiz} variant="outline" className="mt-4 w-full">
              Start på nytt
            </Button>
          </div>
        )}

        <div className="flex justify-between mt-2">
          {currentStep > 0 && currentStep <= questions.length + 1 && (
            <Button onClick={handleBack} variant="outline">
              Tilbake
            </Button>
          )}
          
          {currentStep < questions.length && (
            <Button onClick={handleNext} className="ml-auto">
              Neste
            </Button>
          )}
          
          {currentStep === questions.length && (
            <Button onClick={handleSubmit} className="ml-auto">
              Vis resultater
            </Button>
          )}
          
          {currentStep === 0 && (
            <Button onClick={handleNext} className="ml-auto">
              Start
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameQuiz;
