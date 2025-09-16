
document.addEventListener("DOMContentLoaded", () => {
    const reputationScore = document.getElementById("reputation-score");
    const refreshScoreBtn = document.getElementById("refresh-score");
    const flagForm = document.getElementById("flag-form");
    const networkTemplateBtn = document.getElementById("network-template");
    const jobTemplateBtn = document.getElementById("job-template");
    const learnMoreBtn = document.getElementById("learn-more");

    const loadReputation = () => {
        fetch("http://localhost:3000/api/reputation")
            .then(response => response.json())
            .then(data => {
                reputationScore.textContent = data.reputation;
            });
    };

    const loadMentorTips = () => {
        fetch("http://localhost:3000/api/mentor")
            .then(response => response.json())
            .then(data => {
                alert(data.tips.join("\n"));
            });
    };

    refreshScoreBtn.addEventListener("click", loadReputation);
    learnMoreBtn.addEventListener("click", loadMentorTips);
    loadReputation();

    flagForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("profile-url").value;
        const content = document.getElementById("content").value;
        const reason = document.getElementById("reason").value;
        const screenshot = document.getElementById("screenshot").files[0];

        const formData = new FormData();
        formData.append("profileUrl", url);
        formData.append("content", content);
        formData.append("reason", reason);
        if (screenshot) formData.append("screenshot", screenshot);

        fetch("http://localhost:3000/api/flag", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            flagForm.reset();
        })
        .catch(err => {
            console.error(err);
            alert("Error submitting flag.");
        });
    });

    networkTemplateBtn.addEventListener("click", () => {
        document.getElementById("content").value = "Hi [Name], I found your profile interesting and would love to connect!";
    });

    jobTemplateBtn.addEventListener("click", () => {
        document.getElementById("content").value = "Hi [Name], I’m exploring opportunities in [domain] and would appreciate any advice!";
    });
});
