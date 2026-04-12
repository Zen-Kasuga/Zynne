function getAccounts() {
	return JSON.parse(localStorage.getItem("accounts")) || [];
}

const menuBtn = document.querySelector(".navLeft");
const menuBox = document.querySelector(".menuBox");

const loginBtn = document.querySelectorAll(".loginBtn");
const loginBox = document.querySelector(".loginBox");

const shopNow = document.getElementById("shopNow");

const womenBtn = document.querySelectorAll("#womenBtn");
const menBtn = document.querySelectorAll("#menBtn");
const kidsBtn = document.querySelectorAll("#kidsBtn");

const headerSignUp = document.getElementById("headerSignUp");

const mobileUser = document.getElementById("user");
const mobilePass = document.getElementById("pass");
const formBtn = document.getElementById("formBtn");
const changeBtn = document.getElementById("changeBtn");
const formLabel = document.querySelector(".formLabel");

const forgotBtn = document.getElementById("forgotPasswordBtn");
const mobileForgotBtn = document.getElementById("mobileForgotBtn");
const forgotBox = document.querySelector(".forgotPasswordBox");
const backToLogin = document.getElementById("backToLogin");
const resetPassBtn = document.getElementById("resetPassBtn");

const loggedInPanel = document.querySelector(".loggedIn");
const closeProfile = document.querySelector(".closeProfile");
const profilePic = document.getElementById("profilePic");
const profileUsername = document.getElementById("profileUsername");
const profileAddress = document.getElementById("profileAddress");
const logoutBtn = document.getElementById("logoutBtn");
const changePicBtn = document.getElementById("changePicBtn");
const pfpFileInput = document.getElementById("pfpFileInput");

const switchText = document.getElementById("switchText");
const mobileAddress = document.getElementById("address");

const container = document.getElementById("container");
const switchBtn = document.getElementById("switchBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signInBtn = document.getElementById("signInBtn");

// State
let isSignUpMode = true;
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
let currentUser = localStorage.getItem("currentUser") || null;

menuBtn.addEventListener("click", () => {
	menuBox.classList.toggle("active");
});


loginBtn.forEach(btn => 
	btn.addEventListener("click", () => {
		if (isLoggedIn) {
			showProfilePanel();
		} else {
			loginBox.classList.toggle("active");
		}
	})
);

window.addEventListener("resize", () => {
	if (window.innerWidth >= 600) {
		menuBox.classList.remove("active");
		loginBox.classList.remove("active");
	}
});

shopNow.addEventListener("click", () => {
	window.location.href = "Home.html";
});

womenBtn.forEach(btn => btn.addEventListener("click", (e) => {
	e.preventDefault();
	menuBox.classList.remove("active");
	window.location.href = "Home.html?category=women";
}));

menBtn.forEach(btn => btn.addEventListener("click", (e) => {
	e.preventDefault();
	menuBox.classList.remove("active");
	window.location.href = "Home.html?category=men";
}));

kidsBtn.forEach(btn => btn.addEventListener("click", (e) => {
	e.preventDefault();
	menuBox.classList.remove("active");
	window.location.href = "Home.html?category=kids";
}));

if (signUpBtn) {
	signUpBtn.addEventListener("click", () => {
		const username = document.getElementById("userSignUp").value;
		const password = document.getElementById("passSignUp").value;
		const address = document.getElementById("addressSignUp").value.trim();

		if (!username || !password || !address) {
			alert("Please fill all fields");
			return;
		}
		const exists = getAccounts().find(acc => acc.username === username);
		if (exists) {
			alert("Username already exists");
			return;
		}
			let accounts = getAccounts();
			accounts.push({ username, password, address });
			localStorage.setItem("accounts", JSON.stringify(accounts));
			alert("Account created!");
	});
}

if (signInBtn) {
	signInBtn.addEventListener("click", () => {
		const username = document.getElementById("userSignIn").value;
		const password = document.getElementById("passSignIn").value;
		let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

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
		} else {
			alert("Invalid username or password");
		}
	});
}

if (forgotBtn) {
	forgotBtn.addEventListener("click", () => {
		forgotBox.classList.add("active");
	});
}

if (mobileForgotBtn) {
	mobileForgotBtn.addEventListener("click", () => {
		forgotBox.classList.add("active");
	});
}

if (backToLogin) {
	backToLogin.addEventListener("click", () => {
		forgotBox.classList.remove("active");
	});
}

if (resetPassBtn) {
	resetPassBtn.addEventListener("click", () => {
		const username = document.getElementById("forgotUser").value;
		const newPassword = document.getElementById("newPass").value;
			if (!username || !newPassword) {
			alert("Please fill all fields");
			return;
		}

		let accounts = getAccounts();
		const userIndex = accounts.findIndex(acc => acc.username === username);
		if (userIndex === -1) {
			alert("User not found");
			return;
		}

		accounts[userIndex].password = newPassword;

		localStorage.setItem("accounts", JSON.stringify(accounts));

		alert("Password successfully reset!");
		forgotBox.classList.remove("active");
	});
}

if (headerSignUp) {
	headerSignUp.addEventListener("click", (e) => {
		e.preventDefault();
		loginBox.classList.add("active");

		isSignUpMode = true;
		formLabel.textContent = "Sign Up";
		formBtn.textContent = "Sign Up";
		changeBtn.textContent = "Sign In";
		switchText.textContent = "Already have an account?";

		if (mobileAddress) mobileAddress.style.display = "block";
		if (mobileForgotBtn) mobileForgotBtn.style.display = "none";

		if (container) {
			container.classList.remove("active");
		}
	});
}

if (formBtn) {
	formBtn.addEventListener("click", () => {
		const username = mobileUser.value.trim();
		const password = mobilePass.value.trim();

		if (!username || !password) {
			alert("Please fill all fields");
			return;
		}

		if (isSignUpMode) {
			const exists = getAccounts().find(acc => acc.username === username);

			if (exists) {
				alert("Username already exists");
				return;
			}

			const address = mobileAddress.value.trim();

			if (!address) {
				alert("Please enter your address");
				return;
			}

			let accounts = getAccounts();

			accounts.push({ username, password, address });

			localStorage.setItem("accounts", JSON.stringify(accounts));

			alert("Account created!");

			mobileUser.value = "";
			mobilePass.value = "";
			mobileAddress.value = "";
		}

		else {
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

if (switchBtn && container) {
	switchBtn.addEventListener("click", () => {
		container.classList.toggle("active");

		const isSignIn = container.classList.contains("active");
		switchBtn.textContent = isSignIn ? "Sign In" : "Sign Up";
	});
}

if (changeBtn && formLabel && formBtn && switchText) {
	changeBtn.addEventListener("click", () => {

		isSignUpMode = !isSignUpMode;

		if (isSignUpMode) {
			formLabel.textContent = "Sign Up";
			formBtn.textContent = "Sign Up";
			changeBtn.textContent = "Sign In";
			switchText.textContent = "Already have an account?";

			if (mobileAddress) mobileAddress.style.display = "block"; 
			if (mobileForgotBtn) mobileForgotBtn.style.display = "none";

		} else {
			formLabel.textContent = "Sign In";
			formBtn.textContent = "Sign In";
			changeBtn.textContent = "Sign Up";
			switchText.textContent = "Don't have an account?";

			if (mobileAddress) mobileAddress.style.display = "none"; 
			if (mobileForgotBtn) mobileForgotBtn.style.display = "block";
		}
	});
}

function getSavedPfp(username) {
	return localStorage.getItem("pfp_" + username) || null;
}

function savePfp(username, dataUrl) {
	localStorage.setItem("pfp_" + username, dataUrl);
}

if (changePicBtn && pfpFileInput) {
	changePicBtn.addEventListener("click", () => pfpFileInput.click());

	pfpFileInput.addEventListener("change", () => {
		const file = pfpFileInput.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const dataUrl = e.target.result;
			const username = localStorage.getItem("currentUser");
			savePfp(username, dataUrl);
			profilePic.src = dataUrl;
		};
		reader.readAsDataURL(file);
		pfpFileInput.value = "";
	});
}

function showProfilePanel() {
	const username = localStorage.getItem("currentUser");
	profileUsername.textContent = username || "User";

	const accounts = getAccounts();
	const localUser = accounts.find(acc => acc.username === username);
	profileAddress.textContent = localUser?.address || "No address on file";

	const savedPfp = getSavedPfp(username);
	profilePic.src = savedPfp || "https://placehold.co/90x90?text=No+Photo";

	loggedInPanel.classList.add("active");
}

if (closeProfile) {
	closeProfile.addEventListener("click", () => loggedInPanel.classList.remove("active"));
}

if (logoutBtn) {
	logoutBtn.addEventListener("click", () => {
		localStorage.setItem("isLoggedIn", JSON.stringify(false));
		localStorage.removeItem("currentUser");
		isLoggedIn = false;
		currentUser = null;
		loggedInPanel.classList.remove("active");
	});
}


if (loggedInPanel) {
	loggedInPanel.addEventListener("click", (e) => {
		if (e.target === loggedInPanel) loggedInPanel.classList.remove("active");
	});
}


if (isLoggedIn) {
	loginBtn.forEach(btn => btn.title = "View Profile");
}