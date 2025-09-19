document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "http://localhost:5000";

document.getElementById("checkReputation").addEventListener("click", () => {
  const profileUrl = document.getElementById("profileUrl").value;
  if (!profileUrl) {
    document.getElementById("reputationResult").textContent = "Please enter a LinkedIn profile URL.";
    return;
  }
  const score = Math.floor(Math.random() * 81) + 10;
  document.getElementById("reputationResult").textContent = `Reputation Score: ${score}`;
  const scoreInput = document.getElementById("scoreInput");
  if (scoreInput) scoreInput.value = score;
});

function getUserScore() {
  const scoreInput = document.getElementById("scoreInput");
  return scoreInput && scoreInput.value ? parseInt(scoreInput.value, 10) : 0;
}
  // ✅ Submit a Flag
  document.getElementById("submitFlag").addEventListener("click", async () => {
    const url = document.getElementById("flagUrl").value;
    const content = document.getElementById("flagContent").value;
    const reason = document.getElementById("flagReason").value;
    const file = document.getElementById("flagScreenshot").files[0];

    if (!url || !content || !reason) {
      return alert("Please fill all fields (screenshot optional)");
    }

    const formData = new FormData();
    formData.append("profileUrl", url);
    formData.append("content", content);
    formData.append("reason", reason);
    if (file) formData.append("screenshot", file);

    try {
      const res = await fetch(`${API_BASE}/flag`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      document.getElementById("flagResult").textContent = data.message;
    } catch (err) {
      console.error(err);
      alert("Error submitting flag");
    }
  });

  // ✅ Templates (copy to clipboard)
  document.querySelectorAll(".templateBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-text");
      navigator.clipboard.writeText(text).then(() => {
        document.getElementById("templateMsg").textContent = "Copied: " + text;
      });
    });
  });

  // ✅ Mentor Tips
  document.getElementById("getMentorTips").addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_BASE}/mentorTips`);
      const data = await res.json();
      document.getElementById("mentorResult").textContent = data.tips;
    } catch (err) {
      console.error(err);
      alert("Error fetching mentor tips");
    }
  });
});
