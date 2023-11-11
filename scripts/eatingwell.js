// Calculate the cost of ordering and display the total
function calcTotal() {
	// declare variables
    let menuTotal = 0;
    let totalWithTax = 0;
    let orderTax = 0;
	let menuPrice = 0;
    let tax = 0.05;
	let subtotal = 0;
	let today = new Date();

	// Get user information from form elements
    let menus = document.getElementsByClassName("menuorder");
	let customer = document.getElementById("cstName").value;
	let phone = document.getElementById("phoneNum").value;
	let date = document.getElementById("delivDate").value;
	let time = document.getElementById("delivTime").value;

	let order = document.getElementById("cart");
	order.style.display = "block";
	
	// Declare the table that shows order information
	let table = "<table>";
    table += "<tr><th>Qty</th><th>Product</th><th>U. Price</th><th>T. Price</th></tr>"; 	
	
	// Variable for quantity order
	let quantity = getQuantity();
	
	// Iteraction into menus to get order result
	for (let i = 0; i < menus.length; i++) {
        if (menus[i].checked) {
            menuPrice = (menus[i].value * 1) / 100;
			menuPrice = parseFloat(menuPrice).toFixed(2);
			console.log(menuPrice);
		    menuTotal = menuPrice * quantity[i];
			menuTotal = menuTotal.toFixed(2);
	        subtotal += parseFloat(menuTotal);
		    orderTax = subtotal * tax;
		    totalWithTax = subtotal + orderTax;
		    table += "<tr>";
            table += "<td>" + quantity[i] + "</td><td>" + menus[i].name + "</td><td> $" + menuPrice + "</td><td> $" + menuTotal + "</td>";
	        table += "</tr>";
        }
    }
	// Inserting order results into table rows
	table += "<tr>"
	table += "<td></td>" + "<td>Subtotal</td><td>............</td><td> $" +  subtotal.toFixed(2) + "</td>";
	table += "</tr>";
	
	table += "<tr>"
	table += "<td></td>" + "<td>Tax (5%)</td><td>............</td><td> $" +  orderTax.toFixed(2) + "</td>";
	table += "</tr>";
	
	table += "<tr>"
	table += "<td></td><td>Total </td><td>..........</td><td> $" +  totalWithTax.toFixed(2) + "</td>"; 
	table += "</tr>";
    
	// Insert order result into table
    order.innerHTML += table;
	
    // Display the payment order form
	let payment = document.getElementById("paymentOrder");
	payment.style.display = "block";
 
    // Prevent the form from submitting and validate fields
    let isFormValid = true;
    const form = document.getElementById("paymentOrder");
    form.addEventListener("submit", function handleSubmit(event) {
		event.preventDefault();

		let cards = document.getElementsByName("paymentcard");
		if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
			// verify that a card is checked
			alert("Please select a card");
		}
	
		// Submit the form if it is valid
		if (isFormValid) {
			let thetable = document.getElementById("cart");
			thetable.style.marginLeft = "25px";
			thetable.style.marginBottom = "30px";
			// Variable to open a new window for final order information
			let newSheet = window.open("", "", "width=300,height=400");
			newSheet.document.write("<strong style='font-size:18px; color:tomato;'>Eating Well</strong><br>Order n° 00" + today.getHours() + today.getMinutes() + "<br>Customer: " + customer + "<br>Telephone: " + phone + "<br>Delivery Date: " + date + "<br>Delivery Time: " + time + "<hr><br>" + thetable.outerHTML);
			newSheet.document.write("<p style='text-align:center; font-size:20px; color:tomato;'>Thank you for the preference!</p>");
		}

		// Empty input values on the order and payment forms
        const inputs = document.querySelectorAll('#cstName, #phoneNum, #delivDate, #delivTime, #qty1, #qty2, #qty3, #qty4, #qty5, #qty6, #qty7, #qty8, #cardname, #cardnumber, #month, #year, #cvv');
		inputs.forEach(input => {
			input.value = "";
		});

		let checkBoxSelected = false;
	    let checkBox = document.getElementsByClassName("menuorder");
	    for (let i = 0; i < checkBox.length; i++) {
		    if (checkBox[i].checked === true) {
			    checkBoxSelected = true;
		    }
		    checkBox[i].checked = false;
	    }
	    checkBoxSelected = false;

		let cardSelected = false;
	    let card = document.getElementsByClassName("card");
	    for (let i = 0; i < card.length; i++) {
		    if (card[i].checked === true) {
			    cardSelected = true;
		    }
		    card[i].checked = false;
	    }
	    cardSelected = false;
		hidePayment();
		emptyCart();	
	});
	form.disabled = true;
};

// Get quantity value from check boxes
function getQuantity() {
	let allQuantities = [];
	let quantity = document.getElementsByClassName("meal");
	for (let i = 0; i < quantity.length; i++) {
		allQuantities.push(quantity[i].value);
	}
	return allQuantities;
}

// Get cart order empty on the document
function emptyCart() {
    document.getElementById('cart').innerHTML = "";
}

// Get payment order hidden on the document
function hidePayment() {
    let payment = document.getElementById('paymentOrder');
    payment.style.display='none';
}

// Get current year
function updateYear() {
	let now = new Date();
	let theYear = now.getFullYear();
	document.getElementById("ye").innerHTML = theYear;
}

// Active link showed on the page navigation
$('.nav-link').click(function() {
    $('.nav-link').removeClass("active");
    $('li.nav-item.active').removeClass("active");
    $(this).addClass("active"); 
})

// Open and close menu for mobile nav
$('.menu').click(function() {
    if ($('.navbar').parent().hasClass('mobile-nav')) {
        $('.navbar').parent().removeClass('mobile-nav')
        $('.menu').attr("src", "./images/menu3.jpg")
    }
    else {
        $('.navbar').parent().addClass('mobile-nav')
        $('.menu').attr("src", "./images/close.jpg")
    }
});


// Create events to display on the document
function createEventListeners() { 
	let calButton = document.getElementById("calculate");
	calButton.addEventListener("click", calcTotal);

    // Prevent the form from submitting and validate fields
    let isFormValid = true;
    const form = document.getElementById("orderForm");
    form.addEventListener("submit", function handleSubmit(event) {
		event.preventDefault();
		
		// Submit the form if it is valid
		if (isFormValid) {
			return true;
		}
	})
	
	hidePayment();
	updateYear();
}

// Loading window from events created 
window.addEventListener("load", createEventListeners);
