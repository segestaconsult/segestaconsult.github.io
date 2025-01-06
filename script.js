const oidcSettings = {
  authority: "https://oauth.id.jumpcloud.com/oauth2/auth", // Replace with your OpenID Provider URL
  client_id: "2481f242-a06f-4782-9b56-dfeaa69bfa8b",
  redirect_uri: window.location.origin + "/success.html",
  response_type: "id_token token",
  scope: "openid profile email",
  post_logout_redirect_uri: window.location.origin + "/index.html",
};

const userManager = new oidc.UserManager(oidcSettings);

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
