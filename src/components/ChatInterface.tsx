import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string, image?: string) => void;
  messages: Message[];
  isLoading?: boolean;
}

export const ChatInterface = ({ onSendMessage, messages, isLoading }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !uploadedImage) {
      toast({
        title: "Empty message",
        description: "Please enter a message or upload an image",
        variant: "destructive",
      });
      return;
    }
    onSendMessage(input, uploadedImage || undefined);
    setInput("");
    setUploadedImage(null);
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg bg-background">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "p-3 rounded-lg max-w-[80%] space-y-2",
              message.role === "assistant"
                ? "bg-primary/10 mr-auto"
                : "bg-primary text-primary-foreground ml-auto"
            )}
          >
            {message.image && (
              <img
                src={message.image}
                alt="Uploaded content"
                className="max-w-full h-auto rounded"
              />
            )}
            <p className="break-words">{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}
      </div>
      
      <div className="p-4 border-t space-y-4">
        <ImageUpload onImageUpload={(image) => setUploadedImage(image)} />
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};