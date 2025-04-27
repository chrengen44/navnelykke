
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const slides = [
  {
    title: "The Art of Baby Naming: Trends, Influences, and Digital Tools",
    content: "Modern parents approach baby naming with more information and broader influences than ever before. Over the past century, naming trends have shifted dramatically – moving from a small pool of traditional names to a diverse array driven by creativity and global culture.",
    number: "1/10",
    image: "photo-1486312338219-ce68d2c6f44d"
  },
  {
    title: "Historical Naming Trends: A Century of Change",
    content: "From traditional naming patterns in the early 20th century to today's diverse landscape, the evolution of baby naming reflects broader social changes. The '100-Year Rule' shows how names cycle in and out of fashion.",
    number: "2/10",
    image: "photo-1498050108023-c5249f4df085"
  },
  {
    title: "Cultural and Linguistic Factors in Name Selection",
    content: "Cultural heritage, linguistic considerations, and multicultural balance play crucial roles in modern name selection. These factors create a foundation for name selection while navigating emotional connections and practical considerations.",
    number: "3/10",
    image: "photo-1519389950473-47ba0277781c"
  },
  {
    title: "Emotional and Psychological Dimensions of Naming",
    content: "Names carry emotional weight and personal stories, from honoring family members to projecting future identity. The balance between uniqueness and acceptability remains a key consideration.",
    number: "4/10",
    image: "photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "The Rise of Gender-Neutral Names",
    content: "Gender-neutral naming has seen significant growth, with 6% of U.S. babies receiving androgynous names in 2021. This trend reflects broader social movements and the quest for unique identifiers.",
    number: "5/10",
    image: "photo-1605810230434-7631ac76ec81"
  },
  {
    title: "External Events Influencing Name Choices",
    content: "From global crises to royal influences, celebrity impact, and media exposure, external events significantly shape naming trends and parents' choices.",
    number: "6/10",
    image: "photo-1481627834876-b7833e8f5570"
  },
  {
    title: "Digital Tools Revolutionizing Name Selection",
    content: "Modern technology has transformed baby naming through databases, mobile apps, social media, and online communities, making it a more informed and collaborative process.",
    number: "7/10",
    image: "photo-1488590528505-98d2b5aba04b"
  },
  {
    title: "The Name Selection Journey",
    content: "Parents follow a journey from broad exploration to emotional decision-making, using various tools and seeking social feedback along the way.",
    number: "8/10",
    image: "photo-1460925895917-afdab827c52f"
  },
  {
    title: "Regional Differences in Naming Practices",
    content: "Naming practices vary significantly across regions, from Scandinavia's relative liberality to stricter European constraints and global religious influences.",
    number: "9/10",
    image: "photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "Key Takeaways: The Modern Art of Baby Naming",
    content: "Today's naming practices reflect a dynamic interplay of individual taste, trend cycles, and global influences, supported by digital tools and personal reflection.",
    number: "10/10",
    image: "photo-1531297484001-80022131f5a1"
  }
];

const ArtOfBabyNamingSlideshow = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Kunsten å velge navn: En presentasjon
      </h2>
      
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[300px] w-full">
                    <img
                      src={`https://images.unsplash.com/${slide.image}`}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{slide.number}</div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">{slide.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{slide.content}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default ArtOfBabyNamingSlideshow;
