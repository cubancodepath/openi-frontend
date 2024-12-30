/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadFile } from "@/api/dashboard.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { dataKeys } from "./useData";

export const useFileUpload = (options: any = {}) => {
  const queryClient = useQueryClient();

  const [uploadProgress, setUploadProgress] = useState<any>({
    progress: 0,
    status: "processing",
  });

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      // Start listening to SSE when we get the uploadId
      if (data.ingestionId) {
        initSSEConnection(data.ingestionId);
      }
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      setUploadProgress({
        progress: 0,
        status: "error",
        message: error.message,
      });
      options.onError?.(error);
    },
  });

  const initSSEConnection = (uploadId: string) => {
    const eventSource = new EventSource(
      `http://localhost:3000/api/measurements/progress/${uploadId}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setUploadProgress({
        progress: data.progress,
        status: data.progress === 100 ? "completed" : "processing",
        message: data.message,
      });

      if (data.progress === 100) {
        eventSource.close();
        queryClient.invalidateQueries({ queryKey: dataKeys.all });
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setUploadProgress((prev: any) => ({
        ...prev,
        status: "error",
        message: "Lost connection to server",
      }));
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  };

  return {
    uploadFile: mutation.mutate,
    isUploading: mutation.isPending,
    uploadProgress,
    error: mutation.error,
  };
};
