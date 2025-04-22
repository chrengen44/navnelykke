
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { babyNames } from "@/data";
import { BabyName } from "@/data/types";
import { Loader } from "lucide-react";
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
    <Card className="bg-white shadow-xl border-0 max-w-2xl mx-auto animate-fade-in-fast">
      <CardContent className="p-4 md:p-8 flex flex-col gap-5 md:gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-1 tracking-tight text-pink-700">Navnequiz</h2>
          <p className="text-gray-600 mb-2 text-sm md:text-base">
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
            <h3 className="text-lg md:text-xl font-medium mb-4">Velg kjønn</h3>
            <RadioGroup
              value={gender}
              onValueChange={setGender}
              className="gap-4 flex flex-wrap"
            >
              <div className="flex items-center space-x-2 flex-1 min-w-[120px]">
                <RadioGroupItem value="girl" id="girl"
                  className="bg-pink-50 border-pink-200 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-200" />
                <Label htmlFor="girl" className="flex-1 cursor-pointer">Jente</Label>
              </div>
              <div className="flex items-center space-x-2 flex-1 min-w-[120px]">
                <RadioGroupItem value="boy" id="boy"
                  className="bg-blue-50 border-blue-200 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-200" />
                <Label htmlFor="boy" className="flex-1 cursor-pointer">Gutt</Label>
              </div>
              <div className="flex items-center space-x-2 flex-1 min-w-[120px]">
                <RadioGroupItem value="both" id="unisex"
                  className="bg-green-50 border-green-200 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-200" />
                <Label htmlFor="unisex" className="flex-1 cursor-pointer">Unisex</Label>
              </div>
              <div className="flex items-center space-x-2 flex-1 min-w-[120px]">
                <RadioGroupItem value="any" id="any"
                  className="bg-gray-50 border-gray-200 data-[state=checked]:border-gray-600 data-[state=checked]:bg-gray-200" />
                <Label htmlFor="any" className="flex-1 cursor-pointer">Alle kjønn</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep > 0 && currentStep <= questions.length && (
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-4">
              {questions[currentStep - 1].question}
            </h3>
            <RadioGroup
              value={answers[questions[currentStep - 1].id] || ""}
              onValueChange={(value) =>
                handleAnswerChange(questions[currentStep - 1].id, value)}
              className="gap-3 flex flex-col"
            >
              {questions[currentStep - 1].options.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="bg-gray-50 border-gray-200 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-100"
                  />
                  <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {currentStep === questions.length && (
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-3">Ekstra kategorier (valgfritt)</h3>
            <p className="text-sm text-gray-500 mb-3">
              Velg ytterligere kategorier du er interessert i
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-2 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vikingnavn"
                  checked={categories.includes("vikingnavn")}
                  onCheckedChange={() => handleCategoryToggle("vikingnavn")}
                  className="data-[state=checked]:bg-yellow-100 data-[state=checked]:border-yellow-400"
                />
                <label htmlFor="vikingnavn" className="text-sm font-medium cursor-pointer">
                  Vikingnavn
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bibelsk"
                  checked={categories.includes("bibelsk")}
                  onCheckedChange={() => handleCategoryToggle("bibelsk")}
                  className="data-[state=checked]:bg-blue-100 data-[state=checked]:border-blue-300"
                />
                <label htmlFor="bibelsk" className="text-sm font-medium cursor-pointer">
                  Bibelske navn
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="naturnavn"
                  checked={categories.includes("naturnavn")}
                  onCheckedChange={() => handleCategoryToggle("naturnavn")}
                  className="data-[state=checked]:bg-green-100 data-[state=checked]:border-green-300"
                />
                <label htmlFor="naturnavn" className="text-sm font-medium cursor-pointer">
                  Naturnavn
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="internasjonal"
                  checked={categories.includes("internasjonal")}
                  onCheckedChange={() => handleCategoryToggle("internasjonal")}
                  className="data-[state=checked]:bg-purple-100 data-[state=checked]:border-purple-300"
                />
                <label htmlFor="internasjonal" className="text-sm font-medium cursor-pointer">
                  Internasjonale navn
                </label>
              </div>
            </div>
          </div>
        )}

        {currentStep === questions.length + 1 && (
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-4">Dine navneforslag</h3>
            {loading ? (
              <div className="w-full py-10 flex flex-col items-center justify-center animate-fade-in">
                <div className="w-16 h-16 mb-3 rounded-full bg-gradient-to-tr from-pink-100 to-pink-200 animate-pulse flex items-center justify-center">
                  <Loader className="w-10 h-10 text-pink-400 animate-spin" />
                </div>
                <span className="text-gray-400 text-base mt-2 animate-pulse">Laster forslag...</span>
                <div className="h-8 w-56 mt-5 rounded-lg bg-gray-100 animate-pulse"></div>
              </div>
            ) : (
              results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 animate-fade-in">
                  {results.map((name) => (
                    <div
                      key={name.id}
                      className="relative p-3 md:p-4 bg-gradient-to-bl from-pink-50/80 to-white border border-pink-100 rounded-xl shadow group cursor-pointer hover:scale-105 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all flex flex-col min-h-[80px] items-center"
                    >
                      <div className="font-bold text-pink-700 text-lg md:text-xl tracking-wide mb-1">
                        {name.name}
                      </div>
                      <div className="text-xs md:text-sm mt-1 text-gray-600 min-h-[28px] text-center">
                        {name.meaning}
                      </div>
                      <span className="absolute right-2 top-2 block h-2 w-2 rounded-full bg-pink-200 group-hover:bg-pink-400 transition" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  Ingen navn funnet med disse kriteriene. Prøv å justere valgene dine.
                </div>
              )
            )}
            <Button onClick={resetQuiz} variant="outline" className="mt-6 w-full font-semibold">
              Start på nytt
            </Button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          {currentStep > 0 && currentStep <= questions.length + 1 && (
            <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto">
              Tilbake
            </Button>
          )}

          {currentStep < questions.length && (
            <Button onClick={handleNext} className="w-full sm:w-auto sm:ml-auto bg-pink-500 hover:bg-pink-600 text-white font-medium">
              Neste
            </Button>
          )}

          {currentStep === questions.length && (
            <Button onClick={handleSubmit} className="w-full sm:w-auto sm:ml-auto bg-pink-500 hover:bg-pink-600 text-white font-medium">
              Vis resultater
            </Button>
          )}

          {currentStep === 0 && (
            <Button onClick={handleNext} className="w-full sm:w-auto sm:ml-auto bg-pink-500 hover:bg-pink-600 text-white font-medium">
              Start
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameQuiz;
