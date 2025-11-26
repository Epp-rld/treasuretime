document.addEventListener("DOMContentLoaded", function () {
    fetch("session_status.php")
        .then(response => response.json())
        .then(data => {
            const authButtons = document.getElementById("auth-buttons");
            const homePage = document.getElementById("nav-link-id"); // Home nupp

            // Tühjenda eelnev sisu, aga säilita struktuur
            while (authButtons.firstChild) {
                    authButtons.removeChild(authButtons.firstChild);
            }

            const currentPage = window.location.pathname.split("/").pop();
            if (currentPage === "about.html" || currentPage === "rules.html") {
                if (homePage) homePage.classList.add("hidden");
            } else {
                if (homePage) homePage.classList.remove("hidden");
            }

            if (data.loggedIn) {
                // Kui kasutaja on sisse logitud, siis näita Log Out ja Dashboard nuppe
                const dashboardButton = document.createElement("a");
                dashboardButton.href = "dashboard.html";
                dashboardButton.classList.add("btn", "btn-dashboard");
                dashboardButton.textContent = "Dashboard";

                const logoutButton = document.createElement("a");
                logoutButton.href = "logout.php";
                logoutButton.classList.add("btn", "btn-logout");
                logoutButton.textContent = "Log Out";

                authButtons.appendChild(dashboardButton);
                authButtons.appendChild(logoutButton);

                // Kontrollige ja peida registreerimis- ja logimisnuppe (kui need on olemas)
                let loginBtn = document.getElementById("btn-login");
                let signupBtn = document.getElementById("btn-signup");
                if (loginBtn) loginBtn.classList.add("hidden");
                if (signupBtn) signupBtn.classList.add("hidden");
            } else {
                // Kui kasutaja pole sisse logitud, siis näita Log In ja Sign Up nuppe
                const signupButton = document.createElement("a");
                signupButton.href = "signup.html";
                signupButton.classList.add("btn", "btn-signup");
                signupButton.textContent = "Sign Up";

                const loginButton = document.createElement("a");
                loginButton.href = "login.html";
                loginButton.classList.add("btn", "btn-login");
                loginButton.textContent = "Log In";

                authButtons.appendChild(signupButton);
                authButtons.appendChild(loginButton);

                // Kontrollige ja peida Log Out ja Dashboard nuppe (kui need on olemas)
                let logoutBtn = document.getElementById("btn-logout");
                let dashboardBtn = document.getElementById("btn-dashboard");
                if (logoutBtn) logoutBtn.classList.add("hidden");
                if (dashboardBtn) dashboardBtn.classList.add("hidden");
            }

            // Kontrolli, kas struktuur on korrektne
            console.log(authButtons.innerHTML);
        })
        .catch(error => {
            console.error("Error checking session:", error);
        });
});


