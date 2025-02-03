import { create } from "zustand";

export const useAppStore = create((set) => ({
  personalInfo: [],
  filteredPersonalInfo: [],

  currentEdit: null,

  loading: false,
  error: null,

  addPersonalInfo: (info) =>
    set((state) => {
      const updatedData = [...state.personalInfo, info];
      localStorage.setItem("personalInfo", JSON.stringify(updatedData));
      return { personalInfo: updatedData };
    }),

  updatePersonalInfo: (updatedInfo) =>
    set((state) => {
      const updatedData = state.personalInfo.map((entry) =>
        entry.id === updatedInfo.id ? updatedInfo : entry
      );
      localStorage.setItem("personalInfo", JSON.stringify(updatedData));
      return { personalInfo: updatedData };
    }),

  filterPersonalInfo: (searchTerm, docstatus) =>
    set((state) => {
      const filteredSearchData =
        (docstatus == "all" || docstatus == "") && searchTerm == ""
          ? state.personalInfo.filter(
              (info) =>
                info.name.includes(searchTerm) ||
                info.email.includes(searchTerm)
            )
          : docstatus == "0"
          ? state.personalInfo.filter(
              (info) =>
                (info.name.includes(searchTerm) ||
                  info.email.includes(searchTerm)) &&
                info.docstatus == "0"
            )
          : docstatus == "1"
          ? state.personalInfo.filter(
              (info) =>
                (info.name.includes(searchTerm) ||
                  info.email.includes(searchTerm)) &&
                info.docstatus == "1"
            )
          : docstatus == "2"
          ? state.personalInfo.filter(
              (info) =>
                (info.name.includes(searchTerm) ||
                  info.email.includes(searchTerm)) &&
                info.docstatus == "2"
            )
          : state.personalInfo.filter(
              (info) =>
                info.name.includes(searchTerm) ||
                info.email.includes(searchTerm)
            );
      return { filteredPersonalInfo: filteredSearchData };
    }),

  setCurrentEdit: (info) => set({ currentEdit: info }),

  clearCurrentEdit: () => set({ currentEdit: null }),

  fetchPersonalInfos: async () => {
    const home = "ashaya.com:8000";
    // const fetchRetailTableData = `http://${home}/api/method/onlinelc.api.fetch_personal_info`;
    const fetchRetailTableData = `http://${home}/api/resource/Retail Loan`;
    const authorizationToken = "fe850d916626397:77854dc086219ac";

    set({ loading: true, error: null }); // Set loading state

    try {
      document.cookie =
        "sid=a7a8133df3cbfb0084024e45cc363db40c93f40506d6c4b3d26326db";

      const response = await fetch(fetchRetailTableData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ limit: 50 }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      const jsonData = data.message.data || [];
      set({ personalInfo: jsonData || [] }); // Update fetched data in the store
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error: error.message }); // Set error message in the store
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  adddPersonalInfo: async (data) => {
    const base_url = "192.168.10.41";
    const addPersonalInfoUrl = `http://${base_url}/api/method/loan.api.create_retail_loan`;
    const authorizationToken = "6ae7332d5eccb12:e5faca4763d5930";

    try {
      const response = await fetch(addPersonalInfoUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
          Cookie: `sid=f379a820b483d04cc1b2263c0b93f8fef7c7b33fc8d16e4646541298`,
        },
        body: JSON.stringify({ data }), // Wrap data inside an object
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${errorText}`
        );
      }

      const resData = await response.json();
      console.log("Added resData:", resData);
    } catch (error) {
      console.error("Error adding personal info:", error);
    }
  },
}));

export default useAppStore;
