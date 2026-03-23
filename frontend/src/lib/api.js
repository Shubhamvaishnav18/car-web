export async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");

  const isFormData = options.body instanceof FormData;
  
  const headers = { ...options.headers };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    console.log("Access token expired, attempting to refresh...");
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        const refreshRes = await fetch("https://car-backend-53dx.onrender.com/api/auth/refresh", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${refreshToken}`,
          },
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          
         
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          document.cookie = `accessToken=${data.accessToken}; path=/; max-age=86400`; // Middleware ke liye

          
          headers["Authorization"] = `Bearer ${data.accessToken}`;
          response = await fetch(url, { ...options, headers });
        } else {
        
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