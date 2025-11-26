document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    let formData = new FormData(this);

    let response = await fetch("login.php", {
        method: "POST",
        body: formData
    });

    let result = await response.json();
    let messageBox = document.getElementById("message-box");
    messageBox.innerHTML = ""; // Clear previous messages

    if (!result.success) {
        messageBox.innerHTML = `<div class="alert alert-danger">${result.message}</div>`;
    } else {
        messageBox.innerHTML = `<div class="alert alert-success">Log In successful! Redirecting...</div>`;
        setTimeout(() => {
            window.location.href = "dashboard.html"; // Redirect after login
        }, 2000);
    }
});
