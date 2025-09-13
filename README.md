# LinkedIn Flagging Extension ✅

A Chrome extension that allows users to flag suspicious LinkedIn profiles for **fake job postings**, **severe flirting**, or **spam content**. The extension uses **OCR.space API** to extract text from uploaded screenshots and **Gemini API** to analyze the content for potential issues.

This is a prototype extension built for demonstration purposes and does not track users or display detailed information about flags.

---

## 📌 Features

- ✅ Add a flag icon (gray or red) on LinkedIn profiles based on selected reasons.
- ✅ Upload screenshots to extract text using OCR.space API.
- ✅ Analyze extracted text using Gemini API for abusive language, flirting, or fake job content.
- ✅ Display verification results after analyzing the content.
- ✅ Prototype implementation that shows flags only to the current user and does not store or share data.

---

## 🚀 How It Works

1. The user selects a reason (**Fake Job** or **Flirty Message**) from the dropdown.
2. The user uploads a screenshot related to the profile.
3. The extension sends the screenshot to **OCR.space API**, which extracts the text from the image.
4. The extracted text is sent to **Gemini API**, which classifies the content.
5. Based on the classification, the extension shows the appropriate flag icon and message.

---

## 📦 Setup Instructions

1. Clone or download this repository.
2. Get your **OCR.space API Key** from [https://ocr.space/ocrapi](https://ocr.space/ocrapi).
3. Get your **Gemini API Key** from Google Cloud Console.
4. Add the API keys in the `popup.js` file:
   ```javascript
   const OCR_API_KEY = "<YOUR_OCR_SPACE_API_KEY>";
   const GEMINI_API_KEY = "<YOUR_GEMINI_API_KEY>";
