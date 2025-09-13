// content.js
console.log("LinkedIn Flagging Extension content script loaded.");

// Function to get the main profile URL safely
function getProfileUrl() {
  // Only use the main window URL, ignore iframes
  return window.location.href;
}

// Optional: add a small flagging indicator on the page
function addFlagIndicator() {
  // Check if indicator already exists
  if (document.getElementById("linkedin-flag-extension")) return;

  const flagDiv = document.createElement("div");
  flagDiv.id = "linkedin-flag-extension";
  flagDiv.style.position = "fixed";
  flagDiv.style.bottom = "20px";
  flagDiv.style.right = "20px";
  flagDiv.style.width = "40px";
  flagDiv.style.height = "40px";
  flagDiv.style.borderRadius = "50%";
  flagDiv.style.backgroundColor = "#ff4d4f"; // red for attention
  flagDiv.style.display = "flex";
  flagDiv.style.alignItems = "center";
  flagDiv.style.justifyContent = "center";
  flagDiv.style.cursor = "pointer";
  flagDiv.style.zIndex = "9999";
  flagDiv.title = "Click to flag this profile";

  flagDiv.innerHTML = "⚑"; // small flag icon

  flagDiv.addEventListener("click", () => {
    // Open your popup.html in a new window
    window.open(chrome.runtime.getURL("popup.html"), "Flag Account", "width=400,height=500");
  });

  document.body.appendChild(flagDiv);
}

// Run when page loads
addFlagIndicator();
console.log("Flag indicator added for LinkedIn page:", getProfileUrl());
