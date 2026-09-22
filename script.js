// ══════════════════════════════
// SECTION 1 — RUNS ON EVERY PAGE
// ══════════════════════════════

// Navbar auth switch
const authLink = document.getElementById("authLink");
const user = sessionStorage.getItem("firstName");
if (authLink) {
    if (user) {
        authLink.innerHTML = `<a href="profile.html">Profile</a>`;
    } else {
        authLink.innerHTML = `<a href="signup.html">Sign Up</a>`;
    }
}

// Active link highlight
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links li a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});


// ══════════════════════════════
// SECTION 2 — SIGNUP PAGE ONLY
// ══════════════════════════════

const form = document.getElementById("signupForm");

if (form) {   // ← only runs if signup form exists on the page

    function showError(id, message) {
        const group = document.getElementById(id).closest(".input-group");
        const error = document.getElementById(id + "Error");
        error.innerText = message;
        group.classList.add("has-error");
        group.classList.remove("is-valid");
    }

    function showValid(id) {
        const group = document.getElementById(id).closest(".input-group");
        const error = document.getElementById(id + "Error");
        error.innerText = "";
        group.classList.remove("has-error");
        group.classList.add("is-valid");
    }

    document.getElementById("firstName").addEventListener("blur", function () {
        const val = this.value.trim();
        if (val === "") showError("firstName", "First name is required.");
        else if (!/^[A-Za-z ]+$/.test(val)) showError("firstName", "Only letters allowed.");
        else showValid("firstName");
    });

    document.getElementById("lastName").addEventListener("blur", function () {
        const val = this.value.trim();
        if (val === "") showError("lastName", "Last name is required.");
        else if (!/^[A-Za-z ]+$/.test(val)) showError("lastName", "Only letters allowed.");
        else showValid("lastName");
    });

    document.getElementById("email").addEventListener("blur", function () {
        const val = this.value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val === "") showError("email", "Email is required.");
        else if (!pattern.test(val)) showError("email", "Enter a valid email like name@example.com");
        else showValid("email");
    });

    document.getElementById("password").addEventListener("blur", function () {
        const val = this.value;
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
        if (val === "") showError("password", "Password is required.");
        else if (!pattern.test(val)) showError("password", "Min 8 chars, include A-Z, a-z, 0-9 & a special character.");
        else showValid("password");
    });

    document.getElementById("confirmPassword").addEventListener("blur", function () {
        const val = this.value;
        const original = document.getElementById("password").value;
        if (val === "") showError("confirmPassword", "Please confirm your password.");
        else if (val !== original) showError("confirmPassword", "Passwords do not match.");
        else showValid("confirmPassword");
    });

    document.getElementById("password").addEventListener("input", function () {
        const confirmVal = document.getElementById("confirmPassword").value;
        if (confirmVal !== "") {
            if (this.value !== confirmVal) showError("confirmPassword", "Passwords do not match.");
            else showValid("confirmPassword");
        }
    });

    document.getElementById("phone").addEventListener("blur", function () {
        const val = this.value.trim();
        if (val === "") showError("phone", "Phone number is required.");
        else if (!/^[0-9]{10}$/.test(val)) showError("phone", "Enter a valid 10-digit number.");
        else showValid("phone");
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName   = document.getElementById("firstName").value.trim();
        const lastName    = document.getElementById("lastName").value.trim();
        const email       = document.getElementById("email").value.trim();
        const password    = document.getElementById("password").value;
        const confirmPass = document.getElementById("confirmPassword").value;
        const countryCode = document.getElementById("countryCode").value;
        const phone       = document.getElementById("phone").value.trim();

        let valid = true;

        if (!firstName || !/^[A-Za-z ]+$/.test(firstName)) { showError("firstName", "Enter a valid first name."); valid = false; }
        else showValid("firstName");

        if (!lastName || !/^[A-Za-z ]+$/.test(lastName)) { showError("lastName", "Enter a valid last name."); valid = false; }
        else showValid("lastName");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("email", "Enter a valid email."); valid = false; }
        else showValid("email");

        if (password === "") { showError("password", "Password is required."); valid = false; }
	else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(password)) { showError("password", "Min 8 chars, include A-Z, a-z, 0-9 & a special character."); valid = false; }
	else showValid("password");

        if (confirmPass === "") { showError("confirmPassword", "Please confirm your password."); valid = false; }
	else if (password !== confirmPass) { showError("confirmPassword", "Passwords do not match."); valid = false; }
	else showValid("confirmPassword");

        if (phone === "") { showError("phone", "Phone number is required."); valid = false; }
	else if (!/^[0-9]{10}$/.test(phone)) { showError("phone", "Enter a valid 10-digit number."); valid = false; }
	else showValid("phone");

        if (valid) {
            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("phone", countryCode + phone);
            window.location.href = "profile.html";
        }
    });
}


// ══════════════════════════════
// SECTION 3 — PROFILE PAGE ONLY
// ══════════════════════════════

const profileName = document.getElementById("profileName");

if (profileName) {   // ← only runs if profile page elements exist

    // Page guard
    if (!sessionStorage.getItem("firstName")) {
        window.location.href = "signup.html";
    }

    const storedFirst = sessionStorage.getItem("firstName");
    const storedLast  = sessionStorage.getItem("lastName");
    const storedEmail = sessionStorage.getItem("email");
    const storedPhone = sessionStorage.getItem("phone");

    document.getElementById("profileName").innerText  = storedFirst + " " + storedLast;
    document.getElementById("profileEmail").innerText = storedEmail;
    document.getElementById("firstName").innerText    = storedFirst;
    document.getElementById("lastName").innerText     = storedLast;
    document.getElementById("email").innerText        = storedEmail;
    document.getElementById("phone").innerText        = storedPhone;
}

// ── HOME PAGE GUARD ──
const isHomePage = document.getElementById("products");
if (isHomePage && !sessionStorage.getItem("firstName")) {
    window.location.href = "signup.html";
}