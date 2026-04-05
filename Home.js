document.addEventListener("DOMContentLoaded", () => {

	function getAccounts() {
		return JSON.parse(localStorage.getItem("accounts")) || [];
	}

	const productContainer = document.querySelector(".onSaleCont");

	const menuBtn = document.querySelector(".navLeft");
	const menuBox = document.querySelector(".menuBox");

	const loginBtn = document.querySelectorAll(".loginBtn");
	const loginBox = document.querySelector(".loginBox");

	const cartBtn = document.querySelectorAll(".cartBtn");
	const addToCartPanel = document.querySelector(".addToCart");

	const container = document.getElementById("container");
	const switchBtn = document.getElementById("switchBtn");
	
	const searchBtn = document.querySelectorAll(".searchBtn");
	const searchBar = document.getElementById("searchBar");
	const closeSearchBtn = document.querySelectorAll(".closeSearchBtn");
	
	const cartItemsContainer = document.querySelector(".cartItems");
	const cartBadges = document.querySelectorAll(".cartBadge");
	const orderSummary = document.querySelector(".orderSummary");

	const popup = document.querySelector(".productPopup");
	const popupImg = document.getElementById("popupImg");
	const popupName = document.getElementById("popupName");
	const popupPrice = document.getElementById("popupPrice");
	const popupQty = document.getElementById("popupQty");
	const minusBtn = document.querySelector(".qtyMinus");
	const plusBtn = document.querySelector(".qtyPlus");
	const popupColor = document.getElementById("popupColor");
	const popupSize = document.getElementById("popupSize");
	const popupAddBtn = document.getElementById("popupAddBtn");
	const closePopup = document.querySelector(".closePopup");

	const clothesBtn = document.getElementById("clothesBtn");
	const devicesBtn = document.getElementById("devicesBtn");
	const othersBtn = document.getElementById("othersBtn");

	const headerSignUp = document.getElementById("headerSignUp");
	const signUpBtn = document.getElementById("signUpBtn");
	const signInBtn = document.getElementById("signInBtn");
	const shopNameBtn = document.getElementById("shopName");


	const mobileUser = document.getElementById("user");
	const mobilePass = document.getElementById("pass");
	const mobileAddress = document.getElementById("address");
	const pcAddress = document.getElementById("addressSignUp")
	const formBtn = document.getElementById("formBtn");
	const changeBtn = document.getElementById("changeBtn");
	const formLabel = document.querySelector(".formLabel");
	const switchText = document.getElementById("switchText");

	const forgotBtn = document.getElementById("forgotPasswordBtn");
	const forgotBox = document.querySelector(".forgotPasswordBox");
	const backToLogin = document.getElementById("backToLogin");
	const resetPassBtn = document.getElementById("resetPassBtn");

	let allCards = [];
	
	let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
	let isSignUpMode = true;
	let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
	let currentUser = localStorage.getItem("currentUser") || null;
	let selectedProduct = null;
	let allProducts = [];
	let cart = {};

	fetch('https://api.escuelajs.co/api/v1/products')
		.then(res => res.json())
		.then(products => {

			allProducts = products;

			renderProducts(products); 

		})
		.catch(err => console.log(err));

	function renderProducts(products) {
		productContainer.innerHTML = "";

		products.slice(1, 31).forEach(product => {

			const rating = Math.floor(Math.random() * 5) + 1;
			const starWidth = (rating / 5) * 100;

			const card = document.createElement("div");
			card.classList.add("cards");

			card.innerHTML = `
				<img class="product" src="${product.images[0]}" onerror="this.src='https://via.placeholder.com/150'">
				<div class="cardContent">
					<h3>${product.title}</h3>
					<div class="starsRatings">
						<div class="starsAmnt" style="width: ${starWidth}%;"></div>
					</div>
					<p class="price">₱${product.price}</p>
				</div>
			`;

			card.addEventListener("click", () => {
				selectedProduct = {
					name: product.title,
					price: "₱" + product.price,
					img: product.images[0]
				};

				popupImg.src = selectedProduct.img;
				popupName.innerText = selectedProduct.name;
				popupPrice.innerHTML = selectedProduct.price;

				popup.classList.add("active");
			});

			productContainer.appendChild(card);
		});

		allCards = document.querySelectorAll(".cards");
	}	

	if (mobileAddress) mobileAddress.style.display = "block";

	// --- MENU ---
	if (menuBtn) menuBtn.addEventListener("click", () => 
		menuBox.classList.toggle("active")
	);

	// --- LOGIN ---
	loginBtn.forEach(btn => 
		btn.addEventListener("click", () => 
			loginBox.classList.toggle("active")
		)
	);

	// --- CART PANEL ---
	cartBtn.forEach(btn => 
		btn.addEventListener("click", () =>
			addToCartPanel.classList.toggle("active")
		)
	);

	// --- SEARCH BAR ---
	searchBtn.forEach(btn => 
		btn.addEventListener("click", () => 
			searchBar.classList.add("active")
		)
	);

	closeSearchBtn.forEach(btn => 
		btn.addEventListener("click", () => 
			searchBar.classList.remove("active")
		)
	);

	// --- SWITCH LOGIN ---
	if (switchBtn) {
		switchBtn.addEventListener("click", () => {
			container.classList.toggle("active");

			const lightFormIsSignIn = container.classList.contains("active"); 
			switchBtn.textContent = lightFormIsSignIn ? "Sign In" : "Sign Up";
		});
	}

	// --- UPDATE CART BADGE ---
	function updateBadge() {
		const total = Object.values(cart).reduce((acc, item) => acc + item.qty, 0);
		cartBadges.forEach(b => b.innerText = total);
	}

	// --- CLEAR GREEN CHECK INDICATORS ---
	function clearIndicators() {
		document.querySelectorAll(".addedIndicator").forEach(el => el.remove());
	}

	// --- PARSE PRICE ---
	function getPriceNumber(priceString) {
		const clean = priceString.replace(/<[^>]*>/g, "").replace(/[₱,]/g, "").trim();
		return parseFloat(clean) || 0;
	}

	// --- UPDATE TOTAL ---
	function updateTotal() {
		let total = 0;

		Object.values(cart).forEach(item => {
			if (item.checked) {
				total += getPriceNumber(item.price) * item.qty;
			}
		});

		if (cartTotal) {
			cartTotal.innerText = `Total: ₱${total.toLocaleString()}`;
		}
	}

	function addCardIndicator(productName) {
		document.querySelectorAll(".cards").forEach(card => {
			const title = card.querySelector("h3")?.innerText;
			if (title === productName && !card.querySelector(".addedIndicator")) {
				const indicator = document.createElement("span");
				indicator.classList.add("addedIndicator");
				indicator.innerText = "✔"; 
				indicator.style.color = "white";
				indicator.style.backgroundColor = "green";
				indicator.style.borderRadius = "50%";
				indicator.style.width = "24px";
				indicator.style.height = "24px";
				indicator.style.display = "flex";
				indicator.style.justifyContent = "center";
				indicator.style.alignItems = "center";
				indicator.style.fontSize = "16px";
				indicator.style.fontWeight = "bold";

				indicator.style.position = "absolute";
				indicator.style.top = "10px";
				indicator.style.right = "10px";

				card.appendChild(indicator);
			}
		});
	}

	// ✅ Remove green check from a card
	function removeCardIndicator(productName) {
		document.querySelectorAll(".cards").forEach(card => {
			const title = card.querySelector("h3")?.innerText;
			if (title === productName) {
				const indicator = card.querySelector(".addedIndicator");
				if (indicator) indicator.remove();
			}
		});
	}

	// --- RENDER CART ---
	function renderCart() {
		if (!cartItemsContainer || !orderSummary) return;

		// Clear current items
		cartItemsContainer.innerHTML = "";

		Object.entries(cart).forEach(([key, item]) => {
			const div = document.createElement("div");
			div.classList.add("cartItemBox");
			div.innerHTML = `
				<div style="display:flex; gap:10px; align-items:center;">
					<img src="${item.img}" style="width:75px;height:75px;object-fit:cover;border-radius:10px;">
					<div>
						<p><b>${item.name}</b></p>
						<p>${item.price}</p>
						<div style="display:flex; gap:8px; align-items:center; margin-top:5px;">
							<button class="minus">-</button>
							<span class="qtyDisplay">${item.qty}</span>
							<button class="plus">+</button>
						</div>
					</div>
					<input type="checkbox" class="itemCheck" ${item.checked ? "checked" : ""}>
				</div>
			`;

			const minusBtn = div.querySelector(".minus");
			const plusBtn = div.querySelector(".plus");
			const qtyDisplay = div.querySelector(".qtyDisplay");
			const itemCheck = div.querySelector(".itemCheck");

			itemCheck.addEventListener("change", () => {
				item.checked = itemCheck.checked;
				updateTotal();
			});

			plusBtn.addEventListener("click", () => {
				item.qty++;
				qtyDisplay.innerText = item.qty;
				updateBadge();
				updateTotal();
			});

			minusBtn.addEventListener("click", () => {
				item.qty--;
				if (item.qty <= 0) {
					delete cart[key];
					removeCardIndicator(item.name); // remove green check if qty 0
				} else {
					qtyDisplay.innerText = item.qty;
				}
				updateBadge();
				renderCart();
			});

			cartItemsContainer.appendChild(div);
		});

		updateTotal();
	}



	// --- PlUS AND MINUS ---
	minusBtn.addEventListener("click", () => {
		let value = parseInt(popupQty.value) || 1;
		if (value > 1) popupQty.value = value - 1;
	});

	plusBtn.addEventListener("click", () => {
		let value = parseInt(popupQty.value) || 1;
		popupQty.value = value + 1;
	});

	// --- ADD TO CART ---
	document.querySelectorAll(".cards").forEach(card => {
		card.addEventListener("click", (e) => {

			// prevent button triggering
			if (e.target.classList.contains("addCartBtn")) return;

			const name = card.querySelector("h3").innerText;
			const price = card.querySelector(".price").innerHTML;
			const img = card.querySelector(".product").src;

			selectedProduct = { name, price, img };

			popupImg.src = img;
			popupName.innerText = name;
			popupPrice.innerHTML = price;

			popup.classList.add("active");
		});
	});

	

	//  CLOSE POPUP
	closePopup.addEventListener("click", () => {
		popup.classList.remove("active");
	});

	//  ADD TO CART FROM POPUP
	popupAddBtn.addEventListener("click", () => {
		if (!selectedProduct) return;

		const qty = parseInt(popupQty.value);
		const color = popupColor.value;
		const size = popupSize.value;
		const key = selectedProduct.name + color + size;

		if (cart[key]) {
			cart[key].qty += qty;
		} else {
			cart[key] = {
				name: selectedProduct.name + ` (${color}, ${size})`,
				price: selectedProduct.price,
				img: selectedProduct.img,
				qty: qty
			};
		}

		updateBadge();          // update the cart badge number
		renderCart();           // render the cart items
		addCardIndicator(selectedProduct.name); // ✅ show green check on the card
		popup.classList.remove("active");      // close popup
	});



	// --- CHECKOUT ---
	if (orderSummary) {
		orderSummary.addEventListener("click", (e) => {
			if (e.target.classList.contains("checkoutBtn")) {

				if (!isLoggedIn) {
					alert("You need to log in first before checking out.");
					loginBox.classList.add("active");
					return;
				}

				if (Object.keys(cart).length === 0) {
					alert("Your cart is empty!");
					return;
				}

				const checkedItems = Object.values(cart).filter(item => item.checked);
				if (checkedItems.length === 0) {
					alert("Please select at least one item to checkout.");
					return;
				}

				alert(`Checkout successful! Thank you, ${currentUser || "User"}!`);


				Object.keys(cart).forEach(key => {
					if (cart[key].checked) {
						removeCardIndicator(cart[key].name.split(" (")[0]);
						delete cart[key];
					}
				});

				updateBadge();
				renderCart();
			}
		});
	}

	// --- INIT ---
	updateBadge();
	renderCart();

	// --- REMOVE ACTIVE CLASSES ON RESIZE ---
	window.addEventListener("resize", () => {
		if (window.innerWidth >= 600) {
			menuBox.classList.remove("active");
			loginBox.classList.remove("active");
			searchBar.classList.remove("active");
			addToCartPanel.classList.remove("active");
		}
	});

	function resetDisplay() {
		allCards.forEach(card => card.style.display = "flex");
	}

	clothesBtn.addEventListener("click", (e) => {
		e.preventDefault();

		const filtered = allProducts
			.filter(product => product.category.name.toLowerCase().includes("clothes"))
			.slice(0, 13);

		renderProducts(filtered);
	});

	devicesBtn.addEventListener("click", (e) => {
		e.preventDefault();

		const filtered = allProducts
			.filter(product =>
				product.category.name.toLowerCase().includes("electronics")
			)
			.slice(0, 5);

		renderProducts(filtered);
	});

	othersBtn.addEventListener("click", (e) => {
		e.preventDefault();

		const filtered = allProducts.filter(product =>
			!product.category.name.toLowerCase().includes("clothes") &&
			!product.category.name.toLowerCase().includes("electronics")
		);

		renderProducts(filtered);
	});

	const searchInputs = [
		document.getElementById("search"),
		document.getElementById("searchInput")
	];

	searchInputs.forEach(input => {
		if (!input) return;

		input.addEventListener("input", () => {
			const value = input.value.toLowerCase();

			allCards.forEach(card => {
				if (card.style.display !== "none") {
					const name = card.querySelector("h3").innerText.toLowerCase();
					card.style.display = name.includes(value) ? "flex" : "none";
				}
			});
		});
	});

	function updateCardVisibility() {
		const searchValue = (document.getElementById("search")?.value || "").toLowerCase();
		allCards.forEach(card => {
			const name = card.querySelector("h3").innerText.toLowerCase();
			const matchesSearch = name.includes(searchValue);
			const isFiltered = card.style.display !== "none"; // currently visible after filter
			card.style.display = matchesSearch && isFiltered ? "flex" : "none";
		});
	}

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

			accounts = JSON.parse(localStorage.getItem("accounts")) || [];

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

	shopNameBtn.addEventListener("click", function(){
	window.location.href="Home.html";
	});

	if (forgotBtn) {
		forgotBtn.addEventListener("click", () => {
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

			if (container) {
				container.classList.remove("active");
			}
		});
	}

	// 🚀 HANDLE SIGN UP / SIGN IN
	if (formBtn) {
		formBtn.addEventListener("click", () => {
			const username = mobileUser.value.trim();
			const password = mobilePass.value.trim();

			if (!username || !password) {
				alert("Please fill all fields");
				return;
			}

			// 🔵 SIGN UP MODE
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

			// 🟢 SIGN IN MODE
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

	if (changeBtn && formLabel && formBtn && switchText) {
		changeBtn.addEventListener("click", () => {

			isSignUpMode = !isSignUpMode;

			if (isSignUpMode) {
				formLabel.textContent = "Sign Up";
				formBtn.textContent = "Sign Up";
				changeBtn.textContent = "Sign In";
				switchText.textContent = "Already have an account?";

				if (mobileAddress) mobileAddress.style.display = "block"; // ✅ ADD

			} else {
				formLabel.textContent = "Sign In";
				formBtn.textContent = "Sign In";
				changeBtn.textContent = "Sign Up";
				switchText.textContent = "Don't have an account?";

				if (mobileAddress) mobileAddress.style.display = "none"; // ✅ ADD
			}
		});
	}

});


