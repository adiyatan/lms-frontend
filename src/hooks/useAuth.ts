const useAuth = (): boolean => {
    const token = localStorage.getItem("token");
    return !!token; // Return true jika token ada
  };
  
  export default useAuth;
  