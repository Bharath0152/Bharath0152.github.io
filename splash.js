// This script runs only on the splash screen (index.html)

window.addEventListener('DOMContentLoaded', () => {

    console.log("Splash screen script loaded. Waiting 5 seconds...");

    // setTimeout executes a function after a specified number of milliseconds
    setTimeout(() => {
        
        console.log("5 seconds have passed. Redirecting now to main.html");
        
        // This line changes the browser's URL to 'main.html'
        window.location.href = 'main.html';

    }, 5000); // 5000 milliseconds = 5 seconds

});