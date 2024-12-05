import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
}

export const ChatInterface = ({ onSendMessage, messages }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[400px] max-w-2xl mx-auto border rounded-lg">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "p-3 rounded-lg max-w-[80%] fade-in",
              message.role === "assistant"
                ? "bg-primary/10 mr-auto"
                : "bg-primary text-white ml-auto"
            )}
          >
            {message.content}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};