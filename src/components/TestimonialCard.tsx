import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  name: string;
  district: string;
  rating: number;
  text: string;
  avatar?: string;
}

const TestimonialCard = ({ name, district, rating, text, avatar }: TestimonialCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="border-border hover:shadow-card transition-smooth rounded-[20px] bg-card h-full">
      <CardContent className="pt-8 pb-6 px-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-foreground mb-1">{name}</h4>
            <p className="text-sm text-muted-foreground">{district}</p>
          </div>
          
          <Quote className="h-8 w-8 text-primary/30 flex-shrink-0" />
        </div>
        
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? "fill-[#F4C430] text-[#F4C430]" : "fill-muted text-muted"}`}
            />
          ))}
        </div>
        
        <p className="text-muted-foreground leading-relaxed italic">
          "{text}"
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
