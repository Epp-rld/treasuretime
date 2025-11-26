document.addEventListener("DOMContentLoaded", function () {
    const crystalCountElem = document.getElementById("crystal-count");
    const moneyValueElem = document.getElementById("money-value");
    const crystalContainer = document.getElementById("crystal-container");
    const crystalPrice = 0.50;

    // Default value
    let crystalCount = 10;

    // Function for updating UI                                                                                                                              
    function updateUI() {
        crystalCountElem.textContent = crystalCount;
        moneyValueElem.textContent = (crystalCount * crystalPrice).toFixed(2);

        // Update crystal's appearance
        crystalContainer.innerHTML = "";
        let crystalSize = crystalCount > 10 ? "40px" : "60px";
        for (let i = 0; i < crystalCount; i++) {
            const img = document.createElement("img");
            img.src = "/images/TimeTreasure_CrystalPNG.png";
            img.alt = "Crystal";
            img.classList.add("crystal-img");
            img.style.width = crystalSize;
            crystalContainer.appendChild(img);
        }

        // Update in DB
        updateTokenCountInDB();
    }

    // Function for earing crystals
    window.addCrystal = function () {
        crystalCount++;
        updateUI();
        sendTokenUpdate("earn");
    };

    // Function for spending crystals
    window.removeCrystal = function () {
        if (crystalCount > 0) {
            crystalCount--;
            updateUI();
            sendTokenUpdate("spend");
        }
    };

    // Function for sending an update request to the server when tokens are earned or spent
    function sendTokenUpdate(action) {
        const data = { action: action };

        fetch("update_tokens.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Tokens updated:", data.tokens);
            } else {
                console.error("Error:", data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    // Function for updating crystals (tokens)
    function updateTokenCountInDB() {
        fetch("update_tokens.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "update",
                tokens: crystalCount
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.error("Error saving token count to DB", data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    // Update UI
    updateUI();

    // Get user data
    fetch("get_user.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                window.location.href = "login.html";
            } else {
                document.getElementById("username").textContent = data.name;
                crystalCount = data.tokens;
                updateUI();
            }
        })
        .catch(error => {
            console.error("Error loading user data:", error);
            alert("Error loading user data! Please try again.");
        });

    const createReportBtn = document.getElementById("create-report-btn");
    if (createReportBtn) {
        createReportBtn.addEventListener("click", function () {
            window.location.href = "report.html"; // Redirect - report.html
        });
    }
});
