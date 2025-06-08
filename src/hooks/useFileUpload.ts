import { useState, useCallback } from "react";

interface UseFileUploadReturn {
  selectedFile: File | null;
  uploadProgress: number;
  isUploading: boolean;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetUpload: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        simulateFileUpload();
      }
    },
    []
  );

  const simulateFileUpload = useCallback(() => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSelectedFile(null);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  const resetUpload = useCallback(() => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  }, []);

  return {
    selectedFile,
    uploadProgress,
    isUploading,
    handleFileSelect,
    resetUpload,
  };
};
