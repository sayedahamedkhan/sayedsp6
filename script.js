const signInForm = document.getElementById("signInForm");

function signUp() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, phone }),
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
        document.getElementById("signUpForm").reset();
    })
    .catch((error) => console.error("Error:", error));
}

function showSignInForm() {
    signInForm.style.display = "block";
}

function signIn() {
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.user) {
            document.body.innerHTML = `
                <div class="container">
                    <h2>Welcome, ${data.user.username}!</h2>
                    <p>Email: ${data.user.email}</p>
                    <p>Phone: ${data.user.phone}</p>
                </div>
            `;
        } else {
            alert("Invalid credentials!");
        }
    })
    .catch((error) => console.error("Error:", error));
}










