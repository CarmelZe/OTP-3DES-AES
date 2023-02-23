# CNS-Assignment-2
OTP-3DES-AES
Steps to Add Google Authentication on the app:
  1. I Created a new project on Google Cloud Console: I have gone to the Google Cloud Console, created a new project, and enabled the Google Sign-In API.
  
  2. After enabling the Google Sign-In API, I created OAuth credentials to get the Client ID. I added the authorized JavaScript origins and the redirect URI for my app.
  
  3. I installed the Google Sign-In SDK by adding the following script tag to the head of my HTML file:
  
  <script src="https://apis.google.com/js/platform.js" async defer></script>
  
  4. I initialized the Google Sign-In SDK with my Client ID. I did this by adding the following code to my client-side JavaScript file:
  
  window.gapi.load('auth2', function() {
    window.gapi.auth2.init({
      client_id: 'MY_CLIENT_ID'
    });
  });
  
  5. I added the Google Sign-In button to my app by adding the following HTML code to my login page:
  
  <div class="g-signin2" data-onsuccess="onSignIn"></div>
  
  6. When the user signs in with Google, I handle the response by adding the following code to my client-side JavaScript file:
  
  function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  // Send the id_token to my server to authenticate the user
  }
  
  7. On the server-side of the app, I authenticate the user with the id_token I received from the client-side. I used the library Passport.js to authenticate the user.
