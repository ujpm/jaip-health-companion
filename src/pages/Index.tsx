import { useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PatientForm, PatientData } from "@/components/PatientForm";
import { BodyMap } from "@/components/BodyMap";
import { SymptomPanel } from "@/components/SymptomPanel";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("en");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
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
  };

  const handleSymptomSelect = (symptom: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        return prev.filter(s => s !== symptom);
      }
      return [...prev, symptom];
    });
  };

  const handleStartChat = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please select at least one symptom to continue.",
        variant: "destructive",
      });
      return;
    }

    setStep(4);
    const initialMessage = {
      role: "assistant" as const,
      content: `I understand you're experiencing the following symptoms: ${selectedSymptoms.join(", ")}. How long have you been experiencing these symptoms?`
    };
    setMessages([initialMessage]);
  };

  const handleSendMessage = (message: string) => {
    const newUserMessage = { role: "user" as const, content: message };
    const newAIMessage = {
      role: "assistant" as const,
      content: `I see. Given your symptoms in the ${selectedBodyPart} area, can you tell me if you've experienced any other related symptoms?`
    };
    setMessages(prev => [...prev, newUserMessage, newAIMessage]);
  };

  const steps = [
    { number: 1, title: "Patient Information" },
    { number: 2, title: "Select Body Part" },
    { number: 3, title: "Select Symptoms" },
    { number: 4, title: "AI Consultation" }
  ];

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
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

        {/* Progress Steps */}
        <div className="relative">
          <div className="flex justify-between items-center">
            {steps.map((s, i) => (
              <div key={s.number} className="flex flex-col items-center relative z-10">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s.number ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: step === s.number ? 1 : 0.8 }}
                >
                  {s.number}
                </motion.div>
                <span className="text-sm mt-2 hidden sm:block">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-muted -z-10">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <main className="space-y-8">
          {/* Navigation Controls */}
          <div className="flex justify-between items-center px-4">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Step {step} of {steps.length}
            </span>
          </div>

          {/* Content Area */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-lg shadow-lg p-6"
          >
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
              <div className="fade-in space-y-4">
                <h2 className="text-2xl font-semibold text-center mb-6">
                  Select Your Symptoms
                </h2>
                <SymptomPanel
                  part={selectedBodyPart}
                  onSymptomSelect={handleSymptomSelect}
                  selectedSymptoms={selectedSymptoms}
                />
                <div className="flex justify-center">
                  <Button 
                    onClick={handleStartChat} 
                    className="mt-4 bg-primary hover:bg-primary/90 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Continue to Chat
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="fade-in">
                <h2 className="text-2xl font-semibold text-center mb-6">
                  Chat with JAIP AI
                </h2>
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            )}
          </motion.div>
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
