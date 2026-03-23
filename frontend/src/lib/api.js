export async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");

  const isFormData = options.body instanceof FormData;
  
  const headers = { ...options.headers };

  // Agar FormData nahi hai, tabhi JSON content type bhejo
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  // Agar access token hai, toh usko headers mein add karo
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Pehli baar API call try karo
  let response = await fetch(url, { ...options, headers });

  // Agar token expire ho gaya hai (401 error aaya)
  if (response.status === 401) {
    console.log("Access token expired, attempting to refresh...");
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        // Naye token ke liye request bhejo
        const refreshRes = await fetch("http://localhost:3000/api/auth/refresh", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${refreshToken}`,
          },
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          
          // Naye tokens ko save karo
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          document.cookie = `accessToken=${data.accessToken}; path=/; max-age=86400`; // Middleware ke liye

          // Purani fail hui request ko naye token ke sath WAPAS bhejo
          headers["Authorization"] = `Bearer ${data.accessToken}`;
          response = await fetch(url, { ...options, headers });
        } else {
          // Agar refresh token bhi expire ho gaya (e.g., 7 din baad), toh user ko logout kar do
          forceLogout();
        }
      } catch (error) {
        forceLogout();
      }
    } else {
      forceLogout();
    }
  }

  return response;
}

// Helper function logout ke liye
function forceLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/login";
}