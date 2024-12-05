import { motion } from "framer-motion";
import { bodyParts } from "./BodyMap";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface SymptomPanelProps {
  part: string | null;
  onSymptomSelect: (symptom: string) => void;
  selectedSymptoms: string[];
}

export const SymptomPanel = ({ part, onSymptomSelect, selectedSymptoms }: SymptomPanelProps) => {
  if (!part || !bodyParts[part]) return null;

  return (
    <motion.div
      className="bg-card p-4 rounded-lg shadow-sm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">{bodyParts[part].name} Symptoms</h2>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {bodyParts[part].symptoms.map((symptom) => (
          <motion.div
            key={symptom}
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
          >
            <Checkbox
              id={symptom}
              checked={selectedSymptoms.includes(symptom)}
              onCheckedChange={() => onSymptomSelect(symptom)}
            />
            <Label htmlFor={symptom} className="text-sm">
              {symptom}
            </Label>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};