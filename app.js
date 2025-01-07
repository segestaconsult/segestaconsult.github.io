const oktaAuth = new OktaAuth({
    clientId: '0oamegaffqBBErZsU5d7', // Replace with your Okta Client ID
    issuer: 'https://dev-86025507.okta.com/oauth2/default', // Replace with your Okta Issuer URL
    redirectUri: window.location.origin + '/callback.html',
    scopes: ['openid', 'profile', 'email'],
});

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfoSection = document.getElementById('user-info');
const loginSection = document.getElementById('login-section');
const userNameSpan = document.getElementById('user-name');
const userEmailSpan = document.getElementById('user-email');

// Helper Functions
async function checkAuthentication() {
    const token = await oktaAuth.tokenManager.get('idToken');
    if (token) {
        showUserInfo(token.claims);
    } else {
        showLogin();
    }
}

function showLogin() {
    userInfoSection.style.display = 'none';
    loginSection.style.display = 'block';
}

function showUserInfo(user) {
    userNameSpan.textContent = user.name;
    userEmailSpan.textContent = user.email;
    userInfoSection.style.display = 'block';
    loginSection.style.display = 'none';
}

// Event Listeners
loginBtn.addEventListener('click', async () => {
    const transaction = await oktaAuth.signInWithRedirect();
});

logoutBtn.addEventListener('click', async () => {
    await oktaAuth.signOut();
    showLogin();
});

// On Page Load
checkAuthentication();
