const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");
const ZIPField = document.getElementById("ZIP");
const zipError = document.querySelector(".zipError");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");
const passwordError = document.querySelector(".passwordError");
const passwordMatchError = document.querySelector(".password-match-error");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
  } else showError();
});

function showError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Did you accidentally sit on your keyboard?";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email shorter than hobbit. characters ${email.value.length}. (${email.minLength}) `;
  }
}

password.addEventListener("input", (e) => {
  if (password.validity.valid) {
    passwordError.textContent = "";
  } else showPasswordError();
});

function showPasswordError() {
  const passwordField = document.getElementById("password");

  const lengthRegex = /^.{8,}$/;
  const lowercaseRegex = /^(?=.*[a-z])/;
  const uppercaseRegex = /^(?=.*[A-Z])/;
  const digitRegex = /^(?=.*\d)/;
  const specialCharRegex = /^(?=.*[!@#$%^&*])/;

  if (!lengthRegex.test(passwordField.value)) {
    passwordError.textContent = "Password must be at least 8 characters long. ";
    return false;
  }

  if (!lowercaseRegex.test(passwordField.value)) {
    passwordError.textContent =
      "Password must contain at least one lowercase letter. ";
    return false;
  }

  if (!uppercaseRegex.test(passwordField.value)) {
    passwordError.textContent =
      "Password must contain at least one uppercase letter. ";
    return false;
  }

  if (!digitRegex.test(passwordField.value)) {
    passwordError.textContent = "Password must contain at least one digit. ";
    return false;
  }

  if (!specialCharRegex.test(passwordField.value)) {
    passwordError.textContent =
      "Password must contain at least one special character. ";
    return false;
  }
}
//////////////////////////////////////////////////////////////////////////////
function checkZIP() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    us: [
      "^(US-)?\\d{5}$",
      "US ZIP codes must have exactly 5 digits: e.g. 90210",
    ],
  };
  const country = document.getElementById("Country").value;
  const constraint = new RegExp(constraints[country][0], "");

  if (constraint.test(ZIPField.value)) {
    ZIPField.setCustomValidity("");
    zipError.textContent = "";
  } else {
    ZIPField.setCustomValidity(constraints[country][1]);
    zipError.textContent = "Invalid Zip";
  }
}

window.onload = () => {
  document.getElementById("Country").onchange = checkZIP;
  document.getElementById("ZIP").oninput = checkZIP;
};
/////////////////////////////////////////////////////////

passwordConfirm.addEventListener("input", (event) => {
  if (passwordConfirm.value === password.value) {
    alert("true");
  } else errorPasswordMatch();
});

function errorPasswordMatch() {
  passwordMatchError.textContent = "password not matching";
}

form.addEventListener("submit", (e) => {
  if (
    !password.validity.valid ||
    !email.validity.valid ||
    !ZIPField.validity.valid
  ) {
    e.preventDefault();
    showPasswordError();
    showError();
    checkZIP();
    errorPasswordMatch();
  }
});
