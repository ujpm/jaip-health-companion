import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
}

export interface PatientData {
  age: string;
  sex: string;
  additionalInfo: string;
}

export const PatientForm = ({ onSubmit }: PatientFormProps) => {
  const [formData, setFormData] = useState<PatientData>({
    age: "",
    sex: "",
    additionalInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          required
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Sex</Label>
        <RadioGroup
          value={formData.sex}
          onValueChange={(value) => setFormData({ ...formData, sex: value })}
          required
        >
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Input
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          placeholder="Any other relevant information..."
        />
      </div>

      <Button type="submit" className="w-full">Continue</Button>
    </form>
  );
};