// ----------------------------
// CONFIGURATION
// ----------------------------
const FIREBASE_API_KEY = "YOUR_FIREBASE_API_KEY";
const FIREBASE_PROJECT_ID = "YOUR_PROJECT_ID";
const API_KEY = "YOUR_VISION_GEMINI_API_KEY";

const FLAG_COLLECTION_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/flags?key=${FIREBASE_API_KEY}`;

// ----------------------------
// DOM elements
const reasonSelect = document.getElementById("reason");
const flagIcon = document.getElementById("flagIcon");
const screenshotInput = document.getElementById("screenshot");
const flagBtn = document.getElementById("flagBtn");
const messageDiv = document.getElementById("message");


// ----------------------------
// Flag Icon Update
// ----------------------------
function updateFlagIcon() {
  const reason = reasonSelect.value;
  if (reason === "fake_job") {
    flagIcon.innerHTML = `<svg width="20" height="20" fill="gray" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8"/></svg>`;
  } else {
    flagIcon.innerHTML = `<svg width="20" height="20" fill="red" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8"/></svg>`;
  }
}

updateFlagIcon();
reasonSelect.addEventListener("change", updateFlagIcon);

// ----------------------------
// FLAG ACCOUNT HANDLER
// ----------------------------
flagBtn.addEventListener("click", () => {
  const reason = reasonSelect.value;
  const file = screenshotInput.files[0];

  if (!reason || !file) {
    messageDiv.textContent = "Select a reason and upload a screenshot.";
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const base64Screenshot = reader.result.split(",")[1];
    const profileUrl = window.location.href;

    const data = {
      fields: {
        profileUrl: { stringValue: profileUrl },
        reason: { stringValue: reason },
        screenshot: { stringValue: base64Screenshot },
        verified: { booleanValue: false },
        timestamp: { timestampValue: new Date().toISOString() }
      }
    };

    try {
      // Submit to Firestore
      const response = await fetch(FLAG_COLLECTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log("Flag submitted:", result);
      messageDiv.textContent = "Flag submitted. Checking via AI...";

      const flagId = result.name.split("/").pop();
      await verifyFlag(flagId, base64Screenshot);

    } catch (error) {
      console.error("Error submitting flag:", error);
      messageDiv.textContent = "Failed to submit flag.";
    }
  };

  reader.readAsDataURL(file);
});

// ----------------------------
// VERIFY FLAG FUNCTION
// ----------------------------
async function verifyFlag(flagId, base64Screenshot) {
  try {
    console.log("verifyFlag started for ID:", flagId);

    // -------- OCR via Vision API --------
    const visionResponse = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{
          image: { content: base64Screenshot },
          features: [{ type: "TEXT_DETECTION", maxResults: 1 }]
        }]
      })
    });

    const visionResult = await visionResponse.json();
    const detectedText = visionResult.responses[0]?.fullTextAnnotation?.text || "";
    console.log("Detected Text:", detectedText);

    if (!detectedText) {
      console.warn("No text detected, skipping AI verification.");
      return;
    }

    // -------- Gemini Classification --------
    const prompt = {
      contents: [{
        parts: [{ text: `Check if this text contains abusive/flirty messages or fake job content:\n\n${detectedText}` }]
      }]
    };

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, temperature: 0.2, topP: 0.95, maxOutputTokens: 500 })
    });

    const geminiResult = await geminiResponse.json();
    const classificationText = geminiResult.candidates?.[0]?.content?.[0]?.text || "";
    console.log("Gemini Classification:", classificationText);

    // -------- Verify based on keywords --------
    const keywords = ["fake", "abuse", "flirty", "inappropriate"];
    const isVerified = keywords.some(k => classificationText.toLowerCase().includes(k));

    if (isVerified) {
      // PATCH Firestore document to mark verified
      await fetch(`https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/flags/${flagId}?updateMask.fieldPaths=verified&key=${FIREBASE_API_KEY}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: { verified: { booleanValue: true } } })
      });
      console.log("Flag verified by AI!");
      messageDiv.textContent = "Flag verified by AI!";
    } else {
      console.log("Flag pending AI verification.");
      messageDiv.textContent = "Flag submitted, pending AI verification.";
    }

  } catch (err) {
    console.error("Error in verifyFlag:", err);
    messageDiv.textContent = "AI verification failed. Check console.";
  }
}
