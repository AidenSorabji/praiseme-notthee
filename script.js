// Array of quotes
const quotes = [
    ["PRAISE ME,", "FOR SHALL NO ONE PRAISE THEE"],
    ["THE PEOPLE WHO ARE CRAZY ENOUGH—", "TO THINK THEY CAN CHANGE THE WORLD,", "ARE THE ONES WHO DO"],
    ["GOOD THOUGHTS", "GOOD WORDS", "GOOD DEEDS"],
    ["HAPPINESS COMES FROM THOSE", "WHO SPREAD HAPPINESS"],
    ["ONE GOOD DEED IS WORTH A THOUSAND PRAYERS"]
];

let currentQuoteIndex = 0;
const quoteContainer = document.getElementById("quote-container");
const quoteLine1 = document.getElementById("quote-line1");
const quoteLine2 = document.getElementById("quote-line2");
const quoteLine3 = document.getElementById("quote-line3");
const copyNotification = document.getElementById("copy-notification");

// Function to display the current quote
function showQuote(index) {
    const quote = quotes[index];

    if (quote.length === 1) {
        // Single-line quote
        quoteLine1.textContent = quote[0];
        quoteLine2.style.display = "none";
        quoteLine3.style.display = "none";
    } else if (quote.length === 2) {
        // Two-line quote
        quoteLine1.textContent = quote[0];
        quoteLine2.textContent = quote[1];
        quoteLine2.style.display = "block";
        quoteLine3.style.display = "none";
    } else if (quote.length === 3) {
        // Three-line quote
        quoteLine1.textContent = quote[0];
        quoteLine2.textContent = quote[1];
        quoteLine3.textContent = quote[2];
        quoteLine2.style.display = "block";
        quoteLine3.style.display = "block";
    }
}

// Function to fade in the text
function fadeIn() {
    quoteContainer.classList.add("fade-in");
    quoteContainer.classList.remove("fade-out");
}

// Function to fade out the text
function fadeOut(callback) {
    quoteContainer.classList.add("fade-out");
    quoteContainer.classList.remove("fade-in");

    // Wait for the fade-out transition to finish
    setTimeout(callback, 500);
}

// Show the first quote on page load with a fade-in effect
document.addEventListener("DOMContentLoaded", () => {
    showQuote(currentQuoteIndex);
    fadeIn();
});

// Cycle to the next quote when clicking outside the text container
document.addEventListener("click", (event) => {
    if (!quoteContainer.contains(event.target)) {
        fadeOut(() => {
            // Update the quote index
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            // Show the next quote and fade it in
            showQuote(currentQuoteIndex);
            fadeIn();
        });
    }
});

// Copy the quote to clipboard when clicking directly on the text
quoteContainer.addEventListener("mousedown", (event) => {
    event.preventDefault(); // Prevents text selection

    // Combine all lines of the current quote into a single string
    const fullQuote = quotes[currentQuoteIndex].join(" ");

    // Copy to clipboard
    navigator.clipboard.writeText(fullQuote).then(() => {
        console.log("Quote copied to clipboard:", fullQuote);
        showCopyNotification(); // Show the "Copied!" notification
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
});

// Function to show the "Copied!" notification
function showCopyNotification() {
    copyNotification.style.opacity = "1";
    setTimeout(() => {
        copyNotification.style.opacity = "0";
    }, 1500); // Display for 1.5 seconds
}

const githubIcon = document.querySelector('.github-icon');

// Set the threshold distance (in pixels) from the bottom-left corner
const proximityThreshold = 100;

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate distance from the cursor to the bottom-left corner
    const distanceX = mouseX;
    const distanceY = windowHeight - mouseY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Toggle visibility based on proximity
    if (distance < proximityThreshold) {
        githubIcon.style.opacity = '1';
    } else {
        githubIcon.style.opacity = '0';
    }
});
