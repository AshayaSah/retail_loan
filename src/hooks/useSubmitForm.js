// hooks/useAddPersonalInfo.js
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const apiClient = axios.create({
  baseURL: "http://192.168.10.41",
  headers: {
    "Content-Type": "application/json",
    Authorization: "6ae7332d5eccb12:e5faca4763d5930",
    // Cookie: `sid=f379a820b483d04cc1b2263c0b93f8fef7c7b33fc8d16e4646541298`
  },
  timeout: 10000,
});

 export default function useSubmitForm(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const postRetailLoan = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiClient.post("/api/resource/Retail Loan", { data: formData });
      return data;
    } catch (error) {
      let errorMessage = "Failed to submit personal information";
      
      if (error.response) {
        errorMessage = `Server Error: ${error.response.status} - ${error.response.data?.message || "Unknown error"}`;
      } else if (error.request) {
        errorMessage = "Network Error: Please check your internet connection";
      }

      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { postRetailLoan, loading, error };
};
