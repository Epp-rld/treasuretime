document.addEventListener("DOMContentLoaded", function () {
    // Loads the data
    fetch("get_report_data.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            // Function for converting hours to hours and minutes
            function formatTime(minutes) {
                const hours = Math.floor(minutes / 60);
                const remainingMinutes = minutes % 60;

                let hourText = hours === 1 ? "hour" : "hours";
                let minuteText = "minutes";

                if (hours > 0 && remainingMinutes >= 0) {
                    return `${hours} ${hourText} ${remainingMinutes} ${minuteText}`;
                } else {
                    return `${hours} ${hourText} ${remainingMinutes} ${minuteText}`;
                }
            }

            const screenTimeMinutes = data.spent_tokens * 30;
            const readingTimeMinutes = data.earned_tokens * 30;

            // Displays the data
            document.getElementById("spent-tokens").textContent = data.spent_tokens;
            document.getElementById("earned-tokens").textContent = data.earned_tokens;
            document.getElementById("screen-time-used").textContent = formatTime(screenTimeMinutes);
            document.getElementById("reading-time").textContent = formatTime(readingTimeMinutes);
            document.getElementById("money-saved").textContent = data.money_saved;
        })
        .catch(error => console.error("Error:", error));

    // Function of reset button
document.getElementById("reset-button").addEventListener("click", function () {
        fetch("reset_tokens.php", {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("spent-tokens").textContent = "0";
                document.getElementById("earned-tokens").textContent = "0";
                document.getElementById("screen-time-used").textContent = "0";
                document.getElementById("reading-time").textContent = "0";
                document.getElementById("money-saved").textContent = "0";

                document.getElementById("reset-message").style.display = "block";
            }
        })
        .catch(error => console.error("Reset error:", error));
    });

    // Redirects back to dashboard
    document.getElementById("back-to-dashboard").addEventListener("click", function () {
        window.location.href = "dashboard.html";
    });
});

