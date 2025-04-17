import { Card, CardContent } from "@/components/ui/card";

interface AdSpaceProps {
  type: "horizontal" | "vertical" | "square";
  className?: string;
}

const AdSpace = ({ type, className = "" }: AdSpaceProps) => {
  let dimensions = "h-12";
  
  if (type === "horizontal") {
    dimensions = "h-24 w-full";
  } else if (type === "vertical") {
    dimensions = "h-64 w-full";
  } else if (type === "square") {
    dimensions = "h-48 w-full sm:w-48";
  }
  
  return (
    <Card className={`overflow-hidden bg-gray-100 flex items-center justify-center ${dimensions} ${className}`}>
      <CardContent className="p-2 text-center flex items-center justify-center w-full h-full">
        {/* Auto Ads will automatically place ads here */}
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">Annonseplass</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdSpace;
