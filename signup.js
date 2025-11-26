console.log("signup.js loaded!");

document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    console.log("Sign Up form submitted!");

    let formData = new FormData(this);

    console.log("Submitting form...");

    let response = await fetch("signup.php", {
        method: "POST",
        body: formData
    });

    console.log("Response received!"); // Tests if fetch() works

    let result = await response.json();
    console.log(result); // Test for JSON response

    let messageBox = document.getElementById("message-box");
    messageBox.innerHTML = "";

    if (!result.success) {
        if (result.errors) {
            result.errors.forEach(error => {
                messageBox.innerHTML += `<div class="alert alert-danger">${error}</div>`;
            });
        } else {
            messageBox.innerHTML = `<div class="alert alert-danger">${result.message}</div>`;
        }
    } else {
        messageBox.innerHTML = `<div class="alert alert-success">Sign up successful! Redirecting...</div>`;
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
});


