import { motion } from "framer-motion";
import { useState } from "react";

const bodyParts = {
  head: {
    name: "Head",
    symptoms: [
      "Headache", "Dizziness", "Blurred vision", "Ear pain", "Sinus pressure",
      "Tinnitus", "Light sensitivity", "Hearing loss", "Nasal congestion",
      "Sore throat", "Jaw pain", "Neck stiffness", "Vertigo",
      "Swollen lymph nodes", "Facial pain", "Dry mouth", "Runny nose",
      "Scalp tenderness", "Eye strain", "Double vision", "Loss of smell",
      "Tingling in face", "Difficulty swallowing", "Eye redness", "Nausea"
    ],
    path: "M 50 10 Q 30 30 30 50 Q 50 60 70 50 Q 70 30 50 10"
  },
  neck: {
    name: "Neck",
    symptoms: [
      "Neck pain", "Stiff neck", "Swollen lymph nodes", "Throat pain",
      "Difficulty swallowing", "Hoarseness", "Lump in neck", "Tenderness in neck",
      "Muscle tightness", "Limited neck movement", "Numbness in arms",
      "Tingling in neck", "Swollen glands", "Throat tightness", "Shoulder pain",
      "Sore throat", "Jaw stiffness", "Throat irritation", "Neck spasms",
      "Head tilt", "Pain radiating to arms", "Pain when turning head",
      "Voice changes", "Swelling in throat area", "Painful swallowing"
    ],
    path: "M 40 50 Q 50 60 60 50 L 60 70 Q 50 80 40 70 Z"
  },
  chest: {
    name: "Chest",
    symptoms: [
      "Chest pain", "Shortness of breath", "Heart palpitations", "Cough",
      "Wheezing", "Chest tightness", "Pain with breathing", "Bluish lips or fingers",
      "Rapid heartbeat", "Dizziness", "Swelling in legs", "Fatigue",
      "Cold sweats", "Anxiety", "Sharp stabbing pain", "Dry cough",
      "Coughing up blood", "Pressure in chest", "Difficulty breathing when lying down"
    ],
    path: "M 30 70 H 70 V 120 H 30 Z"
  },
  abdomen: {
    name: "Abdomen",
    symptoms: [
      "Abdominal pain", "Nausea", "Bloating", "Diarrhea", "Constipation",
      "Indigestion", "Vomiting", "Heartburn", "Loss of appetite", "Gas",
      "Cramping", "Acid reflux", "Blood in stool", "Abdominal swelling",
      "Pain after eating", "Unexplained weight loss", "Pain radiating to back",
      "Feeling full quickly", "Tenderness in abdomen"
    ],
    path: "M 30 120 H 70 V 160 H 30 Z"
  },
  arms: {
    name: "Arms",
    symptoms: ["Joint pain", "Muscle weakness", "Numbness", "Tingling", "Swelling"],
    path: "M 20 70 H 30 V 140 H 20 Z M 70 70 H 80 V 140 H 70 Z"
  },
  legs: {
    name: "Legs",
    symptoms: ["Leg pain", "Swelling", "Cramping", "Varicose veins", "Restless legs"],
    path: "M 35 160 H 45 V 250 H 35 Z M 55 160 H 65 V 250 H 55 Z"
  },
};

interface BodyMapProps {
  onSelectPart: (part: string) => void;
  selectedPart: string | null;
}

export const BodyMap = ({ onSelectPart, selectedPart }: BodyMapProps) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const viewBox = "0 0 100 260";

  return (
    <div className="w-full max-w-md mx-auto relative">
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {Object.entries(bodyParts).map(([part, data]) => (
          <motion.path
            key={part}
            d={data.path}
            fill={hoveredPart === part ? "hsl(var(--primary))" : "#ecf0f1"}
            stroke="hsl(var(--foreground))"
            strokeWidth="0.5"
            onClick={() => onSelectPart(part)}
            onMouseEnter={() => setHoveredPart(part)}
            onMouseLeave={() => setHoveredPart(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={selectedPart === part ? "fill-primary/40" : ""}
          />
        ))}
      </svg>
      {hoveredPart && (
        <motion.div
          className="absolute top-4 left-4 bg-background/90 text-foreground px-3 py-1 rounded-md shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {bodyParts[hoveredPart].name}
        </motion.div>
      )}
    </div>
  );
};

export type { BodyMapProps };
export { bodyParts };
