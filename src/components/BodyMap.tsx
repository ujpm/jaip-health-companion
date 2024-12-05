import { cn } from "@/lib/utils";

interface BodyMapProps {
  onSelectPart: (part: string) => void;
  selectedPart: string | null;
}

export const BodyMap = ({ onSelectPart, selectedPart }: BodyMapProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 100 200"
        className="w-full h-auto"
      >
        {/* Head */}
        <circle
          cx="50"
          cy="20"
          r="15"
          className={cn(
            "body-part",
            selectedPart === "head" && "selected"
          )}
          onClick={() => onSelectPart("head")}
        />
        
        {/* Torso */}
        <rect
          x="35"
          y="35"
          width="30"
          height="50"
          className={cn(
            "body-part",
            selectedPart === "torso" && "selected"
          )}
          onClick={() => onSelectPart("torso")}
        />
        
        {/* Arms */}
        <rect
          x="15"
          y="35"
          width="20"
          height="40"
          className={cn(
            "body-part",
            selectedPart === "leftArm" && "selected"
          )}
          onClick={() => onSelectPart("leftArm")}
        />
        <rect
          x="65"
          y="35"
          width="20"
          height="40"
          className={cn(
            "body-part",
            selectedPart === "rightArm" && "selected"
          )}
          onClick={() => onSelectPart("rightArm")}
        />
        
        {/* Legs */}
        <rect
          x="35"
          y="85"
          width="15"
          height="50"
          className={cn(
            "body-part",
            selectedPart === "leftLeg" && "selected"
          )}
          onClick={() => onSelectPart("leftLeg")}
        />
        <rect
          x="50"
          y="85"
          width="15"
          height="50"
          className={cn(
            "body-part",
            selectedPart === "rightLeg" && "selected"
          )}
          onClick={() => onSelectPart("rightLeg")}
        />
      </svg>
    </div>
  );
};