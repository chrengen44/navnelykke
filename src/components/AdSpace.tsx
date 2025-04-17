import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

interface AdSpaceProps {
  type: "horizontal" | "vertical" | "square";
  className?: string;
}

const AdSpace = ({ type, className = "" }: AdSpaceProps) => {
  useEffect(() => {
    try {
      // @ts-expect-error - Google AdSense types are not available
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Error loading AdSense:", err);
    }
  }, []);

  let dimensions = "h-12";
  let adStyle = {};
  
  if (type === "horizontal") {
    dimensions = "h-24 w-full";
    adStyle = { display: "block", width: "100%", height: "90px" };
  } else if (type === "vertical") {
    dimensions = "h-64 w-full";
    adStyle = { display: "block", width: "100%", height: "600px" };
  } else if (type === "square") {
    dimensions = "h-48 w-full sm:w-48";
    adStyle = { display: "block", width: "100%", height: "250px" };
  }
  
  return (
    <Card className={`overflow-hidden bg-gray-100 flex items-center justify-center ${dimensions} ${className}`}>
      <CardContent className="p-2 text-center flex items-center justify-center w-full h-full">
        <ins
          className="adsbygoogle"
          style={adStyle}
          data-ad-client="ca-pub-3372507393637890"
          data-ad-slot={type === "horizontal" ? "1234567890" : 
                        type === "vertical" ? "0987654321" : 
                        "1122334455"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </CardContent>
    </Card>
  );
};

export default AdSpace;
