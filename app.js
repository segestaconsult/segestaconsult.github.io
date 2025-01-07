// Configure Okta
const oktaAuth = new OktaAuth({
    clientId: 'YOUR_CLIENT_ID', // Replace with your Okta Client ID
    issuer: 'https://YOUR_OKTA_DOMAIN/oauth2/default', // Replace with your Okta domain
    redirectUri: window.location.origin + '/callback.html',
    scopes: ['openid', 'profile', 'email'],
});

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginSection = document.getElementById('login-section');
const userInfoSection = document.getElementById('user-info');
const userNameSpan = document.getElementById('user-name');
const userEmailSpan = document.getElementById('user-email');

// Show login section
function showLogin() {
    loginSection.style.display = 'block';
    userInfoSection.style.display = 'none';
}

// Show user info section
function showUserInfo(user) {
    userNameSpan.textContent = user.name;
    userEmailSpan.textContent = user.email;
    loginSection.style.display = 'none';
    userInfoSection.style.display = 'block';
}

// Check if the user is authenticated
async function checkAuthentication() {
    const token = await oktaAuth.tokenManager.get('idToken');
    if (token) {
        showUserInfo(token.claims);
    } else {
        showLogin();
    }
}

// Login
loginBtn.addEventListener('click', async () => {
    await oktaAuth.signInWithRedirect();
});

// Logout
logoutBtn.addEventListener('click', async () => {
    await oktaAuth.signOut();
    showLogin();
});

// On page load
checkAuthentication();
