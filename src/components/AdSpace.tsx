
import { Card, CardContent } from "@/components/ui/card";

interface AdSpaceProps {
  type: "horizontal" | "vertical" | "square";
  className?: string;
}

const AdSpace = ({ type, className = "" }: AdSpaceProps) => {
  // This is a placeholder for where Google Ads would go
  // In a real implementation, you would integrate Google AdSense code here
  
  let dimensions = "h-12";
  let label = "Annonse";
  
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
        <span className="text-gray-400 text-sm">{label}</span>
      </CardContent>
    </Card>
  );
};

export default AdSpace;
