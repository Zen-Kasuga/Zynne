// --- HELPERS ---
function getAccounts() {
	return JSON.parse(localStorage.getItem("accounts")) || [];
}

// --- SELECTORS ---
const menuBtn = document.querySelector(".navLeft");
const menuBox = document.querySelector(".menuBox");

const loginBtn = document.querySelector(".loginBtn");
const loginBox = document.querySelector(".loginBox");

const shopNow = document.getElementById("shopNow");

const clothesBtn = document.getElementById("clothesBtn");
const shoesBtn = document.getElementById("shoesBtn");
const othersBtn = document.getElementById("othersBtn");

const headerSignUp = document.getElementById("headerSignUp");

// Mobile form elements
const mobileUser = document.getElementById("user");
const mobilePass = document.getElementById("pass");
const formBtn = document.getElementById("formBtn");
const changeBtn = document.getElementById("changeBtn");
const formLabel = document.querySelector(".formLabel");

// PC form elements
const container = document.getElementById("container");
const switchBtn = document.getElementById("switchBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signInBtn = document.getElementById("signInBtn");

// State
let isSignUpMode = true;
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
let currentUser = localStorage.getItem("currentUser") || null;


// --- MENU TOGGLE ---
menuBtn.addEventListener("click", () => {
	menuBox.classList.toggle("active");
});


// --- LOGIN PANEL TOGGLE ---
loginBtn.addEventListener("click", () => {
	loginBox.classList.toggle("active");
});


// --- CLOSE ON RESIZE ---
window.addEventListener("resize", () => {
	if (window.innerWidth >= 600) {
		menuBox.classList.remove("active");
		loginBox.classList.remove("active");
	}
});


// --- SHOP NOW ---
shopNow.addEventListener("click", () => {
	window.location.href = "Home.html";
});


// --- CATEGORY FILTERS ---
clothesBtn.addEventListener("click", (e) => {
	e.preventDefault();
	window.location.href = "Home.html?category=clothes";
});

shoesBtn.addEventListener("click", (e) => {
	e.preventDefault();
	window.location.href = "Home.html?category=shoes";
});

othersBtn.addEventListener("click", (e) => {
	e.preventDefault();
	window.location.href = "Home.html?category=others";
});


// --- HEADER SIGN UP LINK ---
if (headerSignUp) {
	headerSignUp.addEventListener("click", (e) => {
		e.preventDefault();

		loginBox.classList.add("active");

		// Reset to Sign Up mode
		isSignUpMode = true;
		if (formLabel) formLabel.textContent = "Sign Up";
		if (formBtn) formBtn.textContent = "Sign Up";
		if (changeBtn) changeBtn.textContent = "Sign In";

		// PC: make sure the panel is on Sign Up side
		if (container) container.classList.remove("active");
		if (switchBtn) switchBtn.textContent = "Sign Up";
	});
}


// --- PC: SWITCH PANEL (Sign Up <-> Sign In) ---
if (switchBtn) {
	switchBtn.addEventListener("click", () => {
		container.classList.toggle("active");
		const isNowSignIn = container.classList.contains("active");
		switchBtn.textContent = isNowSignIn ? "Sign In" : "Sign Up";
	});
}


// --- PC: SIGN UP BUTTON ---
if (signUpBtn) {
	signUpBtn.addEventListener("click", () => {
		const username = document.getElementById("userSignUp").value.trim();
		const password = document.getElementById("passSignUp").value.trim();

		if (!username || !password) {
			alert("Please fill all fields");
			return;
		}

		const exists = getAccounts().find(acc => acc.username === username);
		if (exists) {
			alert("Username already exists");
			return;
		}

		const accounts = getAccounts();
		accounts.push({ username, password });
		localStorage.setItem("accounts", JSON.stringify(accounts));

		alert("Account created!");

		document.getElementById("userSignUp").value = "";
		document.getElementById("passSignUp").value = "";
	});
}


// --- PC: SIGN IN BUTTON ---
if (signInBtn) {
	signInBtn.addEventListener("click", () => {
		const username = document.getElementById("userSignIn").value.trim();
		const password = document.getElementById("passSignIn").value.trim();

		const user = getAccounts().find(acc =>
			acc.username === username && acc.password === password
		);

		if (user) {
			isLoggedIn = true;
			currentUser = username;

			localStorage.setItem("isLoggedIn", JSON.stringify(true));
			localStorage.setItem("currentUser", username);

			alert("Login successful!");
			loginBox.classList.remove("active");

			document.getElementById("userSignIn").value = "";
			document.getElementById("passSignIn").value = "";
		} else {
			alert("Invalid username or password");
		}
	});
}


// --- MOBILE: SIGN UP / SIGN IN FORM BUTTON ---
if (formBtn) {
	formBtn.addEventListener("click", () => {
		const username = mobileUser.value.trim();
		const password = mobilePass.value.trim();

		if (!username || !password) {
			alert("Please fill all fields");
			return;
		}

		// SIGN UP MODE
		if (isSignUpMode) {
			const exists = getAccounts().find(acc => acc.username === username);
			if (exists) {
				alert("Username already exists");
				return;
			}

			const accounts = getAccounts();
			accounts.push({ username, password });
			localStorage.setItem("accounts", JSON.stringify(accounts));

			alert("Account created!");
			mobileUser.value = "";
			mobilePass.value = "";

		// SIGN IN MODE
		} else {
			const user = getAccounts().find(acc =>
				acc.username === username && acc.password === password
			);

			if (user) {
				isLoggedIn = true;
				currentUser = username;

				localStorage.setItem("isLoggedIn", JSON.stringify(true));
				localStorage.setItem("currentUser", username);

				alert("Login successful!");
				loginBox.classList.remove("active");

				mobileUser.value = "";
				mobilePass.value = "";
			} else {
				alert("Invalid username or password");
			}
		}
	});
}


// --- MOBILE: TOGGLE BETWEEN SIGN UP AND SIGN IN ---
if (changeBtn) {
	changeBtn.addEventListener("click", () => {
		isSignUpMode = !isSignUpMode;

		if (isSignUpMode) {
			if (formLabel) formLabel.textContent = "Sign Up";
			if (formBtn) formBtn.textContent = "Sign Up";
			changeBtn.textContent = "Sign In";
		} else {
			if (formLabel) formLabel.textContent = "Sign In";
			if (formBtn) formBtn.textContent = "Sign In";
			changeBtn.textContent = "Sign Up";
		}
	});
}
