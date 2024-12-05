import { useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PatientForm, PatientData } from "@/components/PatientForm";
import { BodyMap } from "@/components/BodyMap";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("en");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant", content: string }>>([]);
  const { toast } = useToast();

  const handlePatientSubmit = (data: PatientData) => {
    setPatientData(data);
    setStep(2);
    toast({
      title: "Information Saved",
      description: "You can now select the affected body part.",
    });
  };

  const handleBodyPartSelect = (part: string) => {
    setSelectedBodyPart(part);
    setStep(3);
    setMessages([
      {
        role: "assistant",
        content: `Please describe the symptoms you're experiencing in your ${part}.`
      }
    ]);
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, 
      { role: "user", content: message },
      { role: "assistant", content: "I understand you're experiencing symptoms in your " + selectedBodyPart + ". Can you tell me when these symptoms started?" }
    ]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">JAIP AI Symptom Checker</h1>
          <p className="text-muted-foreground">
            Your AI-powered health companion
          </p>
          <div className="flex justify-center">
            <LanguageSelector
              selectedLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </header>

        <main className="space-y-8">
          {step === 1 && (
            <div className="fade-in">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Patient Information
              </h2>
              <PatientForm onSubmit={handlePatientSubmit} />
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Select Affected Area
              </h2>
              <BodyMap
                onSelectPart={handleBodyPartSelect}
                selectedPart={selectedBodyPart}
              />
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Describe Your Symptoms
              </h2>
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </div>
          )}
        </main>

        <footer className="text-center text-sm text-muted-foreground">
          <p>
            This is not a substitute for professional medical advice. 
            If you're experiencing a medical emergency, please contact emergency services immediately.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;