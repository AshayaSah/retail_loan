// hooks/useAddPersonalInfo.js
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.API_AUTH_TOKEN,
    Cookie: `sid=${process.env.API_SESSION_ID}`
  },
  timeout: 10000,
});

const useAddPersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const addPersonalInfo = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiClient.post("/api/resource/Retail Loan", { data: formData });
      
      toast({
        title: "Success",
        description: "Personal information added successfully.",
        variant: "success",
      });
      return data;
    } catch (error) {
      let errorMessage = "Failed to submit personal information";
      
      if (error.response) {
        errorMessage = `Server Error: ${error.response.status} - ${error.response.data?.message || "Unknown error"}`;
      } else if (error.request) {
        errorMessage = "Network Error: Please check your internet connection";
      }

      setError(errorMessage);
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { addPersonalInfo, loading, error };
};

export default useAddPersonalInfo;