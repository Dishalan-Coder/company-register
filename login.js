const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const loginMessage = document.getElementById("loginMessage");

const toggleLoginPassword = document.getElementById("toggleLoginPassword");

// Password Toggle
toggleLoginPassword.addEventListener("click", () => {
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
    toggleLoginPassword.textContent = "Hide";
  } else {
    loginPassword.type = "password";
    toggleLoginPassword.textContent = "Show";
  }
});

// Login Validation
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  loginEmailError.textContent = "";
  loginPasswordError.textContent = "";
  loginMessage.textContent = "";
  loginMessage.className = "text-center font-semibold";

  let isValid = true;

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (emailValue === "") {
    loginEmailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    loginEmailError.textContent = "Enter a valid email address";
    isValid = false;
  }

  if (passwordValue === "") {
    loginPasswordError.textContent = "Password is required";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Get registered companies from localStorage
  const companies =
    JSON.parse(localStorage.getItem("companies")) || [];

  // Find matching registered company
  const company = companies.find((item) => {
    return item.email === emailValue && item.password === passwordValue;
  });

  if (company) {
    // Save currently logged-in company
    localStorage.setItem(
      "loggedInCompany",
      JSON.stringify(company)
    );

    loginMessage.textContent = "Login successful!";
    loginMessage.classList.add("text-green-600");

    setTimeout(() => {
      window.location.href = "product.html";
    }, 1000);

  } else {
    loginMessage.textContent = "Invalid email or password";
    loginMessage.classList.add("text-red-500");
  }
});