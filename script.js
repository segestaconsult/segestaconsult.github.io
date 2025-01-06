// Ensure we reference the correct global from the library
const UserManager = window.Oidc.UserManager;

// OpenID Connect configuration
const oidcSettings = {
  authority: "https://YOUR_AUTHORITY_URL", // Replace with your OpenID Provider URL
  client_id: "YOUR_CLIENT_ID",
  redirect_uri: window.location.origin + "/success.html",
  response_type: "code", // Use Authorization Code flow
  scope: "openid profile email",
  post_logout_redirect_uri: window.location.origin + "/index.html",
};

const userManager = new UserManager(oidcSettings);

// Login function
if (document.getElementById("loginButton")) {
  document.getElementById("loginButton").addEventListener("click", () => {
    userManager.signinRedirect().catch((err) => {
      console.error("Error during login:", err);
    });
  });
}

// Handle login callback
if (window.location.pathname.endsWith("success.html")) {
  userManager
    .signinRedirectCallback()
    .then((user) => {
      if (user && user.profile) {
        document.getElementById("userName").textContent = user.profile.name;
      }
    })
    .catch((err) => {
      console.error("Error during login callback:", err);
    });

  // Logout function
  document.getElementById("logoutButton").addEventListener("click", () => {
    userManager.signoutRedirect().catch((err) => {
      console.error("Error during logout:", err);
    });
  });
}
