const form = document.getElementById("signupForm");

// email validation function
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

userEmail.addEventListener("blur", () => {
  if (userEmail.value.trim() === "") {
    emailError.textContent = "Email is required!";
  } else {
    emailError.textContent = "";
    // emailError.style.color = "red";
  }
});

userEmail.addEventListener("keydown", () => {
  if (!isValidEmail(userEmail.value)) {
    emailError.textContent = "Invalid email format!";
  } else {
    emailError.textContent = "";
  }
});

userPassword.addEventListener("input", () => {
  if (userPassword.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
  } else if (!/\d/.test(userPassword.value)) {
    passwordError.textContent = "Password must contain a number";
  } else {
    passwordError.textContent = "";
  }
});

form.addEventListener("submit", onFormSubmit);

// just prints an instance of the object, not the actual key:value pairs
function onFormSubmit(event) {
  event.preventDefault(); // stop reload
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  console.log(dataObject);
}

// traverse FormData with forEach()
function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  data.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
}

// Accessing Form Data by Name
function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const name = data.get("name");
  const email = data.get("email");
  console.log(`Name: ${name}, Email: ${email}`);

  const payload = Object.fromEntries(data.entries());

  fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// including FormValidation onsubmit (using boolean value: isValid as flag)
function validateSignupForm(form) {
  const email = form.querySelector("#userEmail").value.trim();
  const phone = form.querySelector("#userPhone").value.trim();
  const password = form.querySelector("#userPassword").value.trim();

  const emailError = form.querySelector("#emailError");
  const phoneError = form.querySelector("#phoneError");
  const passwordError = form.querySelector("#passwordError");

  emailError.textContent = "";
  phoneError.textContent = "";
  passwordError.textContent = "";

  let isValid = true;

  // Email validation
  if (!email) {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    emailError.textContent = "Enter a valid email";
    isValid = false;
  }

  // Phone validation
  if (!phone) {
    phoneError.textContent = "Phone number is required";
    isValid = false;
  } else if (!/^\d{11}$/.test(phone)) {
    phoneError.textContent = "Phone must be 11 digits";
    isValid = false;
  }

  // Password validation
  if (!password) {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
    isValid = false;
  }

  return isValid;
}
