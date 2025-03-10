document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    attachFormListeners();
});

function updateNavbar() {
    const authButtons = document.getElementById("auth-buttons");
    const token = localStorage.getItem("token");

    if (token) {
        authButtons.innerHTML = `<button class="btn" onclick="logout()">Logout</button>`;
    } else {
        authButtons.innerHTML = `
            <a href="login.html" class="btn">Login</a>
            <a href="register.html" class="btn">Signup</a>
        `;
    }
}


function attachFormListeners() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }
    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }
}


async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            updateNavbar(); // ✅ Update navbar after login
            window.location.href = "index.html"; // Redirect to home page
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
    }
}

async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("Something went wrong. Please try again.");
    }
}


function logout() {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    updateNavbar(); // 
    window.location.href = "index.html"; 
}
