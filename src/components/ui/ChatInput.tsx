import { KeyboardEvent, useState } from 'react';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
}

export function ChatInput({ onSubmit, placeholder = "Nachricht eingeben... (Ctrl+Enter zum Senden)" }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      if (text.trim()) {
        onSubmit(text);
        setText('');
      }
    }
  };

  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none min-h-[100px]"
    />
  );
}
