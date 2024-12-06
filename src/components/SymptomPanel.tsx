import { motion } from "framer-motion";
import { bodyParts } from "./BodyMap";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface SymptomPanelProps {
  part: string | null;
  onSymptomSelect: (symptom: string) => void;
  selectedSymptoms: string[];
  onClose: () => void;
}

export const SymptomPanel = ({ part, onSymptomSelect, selectedSymptoms, onClose }: SymptomPanelProps) => {
  if (!part || !bodyParts[part]) return null;

  return (
    <motion.div
      className="bg-card p-4 rounded-lg shadow-sm relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{bodyParts[part].name} Symptoms</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
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