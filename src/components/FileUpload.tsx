/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFileUpload } from "@/hooks/useFileUpload";
import { File, FileWarning, Upload } from "lucide-react";
import React, { useState } from "react";

export interface FileUploadProps {
  onFileUpload?: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");

  const { uploadFile, isUploading, uploadProgress, error } = useFileUpload({
    onSuccess: (data: any) => {
      onFileUpload?.(data);
    },
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsDragging(false);
    setValidationError("");

    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      uploadFile(file);
    }
  };

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      uploadFile(file);
    }
  };

  const validateFile = (file: File): boolean => {
    if (!file) return false;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setValidationError("Please upload a valid CSV file");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setValidationError("File is too large. Maximum size is 5MB");
      return false;
    }

    return true;
  };

  const renderProgress = () => {
    if (!isUploading && uploadProgress.progress === 0) return null;

    return (
      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            {uploadProgress.status === "processing"
              ? "Processing file..."
              : "Upload complete"}
          </span>
          <span className="text-sm font-medium">
            {uploadProgress.progress}%
          </span>
        </div>
        <Progress value={uploadProgress.progress} className="w-full" />
        {uploadProgress.message && (
          <p className="text-sm text-gray-500 mt-2">{uploadProgress.message}</p>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Data</CardTitle>
        <CardDescription>
          Upload a CSV file to start visualizing your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging ? "border-primary bg-primary/10" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">
                Drag and drop your CSV file here
              </p>
              <p className="text-sm text-gray-500">or click to select a file</p>
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={isUploading}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={isUploading}
            >
              <File className="mr-2 h-4 w-4" />
              Select File
            </Button>
          </div>
        </div>

        {renderProgress()}

        {(validationError || error) && (
          <Alert variant="destructive" className="mt-4">
            <FileWarning className="h-4 w-4" />
            <AlertDescription>
              {validationError ||
                (error instanceof Error ? error.message : "Upload failed")}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
