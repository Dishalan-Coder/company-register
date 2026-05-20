const form = document.getElementById("registerForm");

const companyName = document.getElementById("companyName");
const companyEmail = document.getElementById("companyEmail");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const successMessage = document.getElementById("successMessage");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// Show / Hide Password
togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// Show / Hide Confirm Password
toggleConfirmPassword.addEventListener("click", () => {
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        toggleConfirmPassword.textContent = "Hide";
    } else {
        confirmPassword.type = "password";
        toggleConfirmPassword.textContent = "Show";
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear old errors
    document.getElementById("companyNameError").textContent = "";
    document.getElementById("companyEmailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";
    successMessage.textContent = "";

    let isValid = true;

    const nameValue = companyName.value.trim();
    const emailValue = companyEmail.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // Company Name Validation
    if (nameValue === "") {
        document.getElementById("companyNameError").textContent =
            "Company name is required";
        isValid = false;
    }

    // Email Validation
    if (emailValue === "") {
        document.getElementById("companyEmailError").textContent =
            "Company email is required";
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        document.getElementById("companyEmailError").textContent =
            "Enter a valid email address";
        isValid = false;
    }

    // Password Validation
    if (passwordValue === "") {
        document.getElementById("passwordError").textContent =
            "Password is required";
        isValid = false;
    } else if (!passwordPattern.test(passwordValue)) {
        document.getElementById("passwordError").textContent =
            "Password must have uppercase, lowercase, number, special character and minimum 8 characters";
        isValid = false;
    }

    // Confirm Password Validation
    if (confirmPasswordValue === "") {
        document.getElementById("confirmPasswordError").textContent =
            "Confirm password is required";
        isValid = false;
    } else if (passwordValue !== confirmPasswordValue) {
        document.getElementById("confirmPasswordError").textContent =
            "Passwords do not match";
        isValid = false;
    }

    // Get old registered companies
    const companies = JSON.parse(localStorage.getItem("companies")) || [];

    // Check duplicate email
    const alreadyRegistered = companies.find((company) => {
        return company.email === emailValue;
    });

    if (alreadyRegistered) {
        document.getElementById("companyEmailError").textContent =
            "This email is already registered";
        isValid = false;
    }

    if (isValid) {
        const newCompany = {
            id: Date.now().toString(),
            companyName: nameValue,
            email: emailValue,
            password: passwordValue,
        };

        companies.push(newCompany);

        localStorage.setItem("companies", JSON.stringify(companies));

        successMessage.textContent = "Registration successful!";

        form.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    }
});
