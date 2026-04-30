import { ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64String: string) => void;
}

export function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onImageSelected(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative inline-block">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-gray-800 transition-colors">
        <Upload size={18} />
        <span>Bild hochladen (Base64)</span>
      </div>
    </div>
  );
}
