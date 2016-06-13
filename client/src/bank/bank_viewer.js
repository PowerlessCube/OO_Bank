
var BankViewer = function( bank ) {
	this.bank = bank;
};

BankViewer.prototype = {

	render: function( bank ) {
		console.log("We created a bank in the browser! ", bank);

		var totalDisplay = document.getElementById("total");
		totalDisplay.innerText = "Total: " + bank.totalCash().toFixed(2);

		var accountList = document.getElementById("accounts");
		for (account of bank.accounts) {
			var accountListItem = document.createElement("li");
			accountListItem.innerText = account.owner + ": £" + account.amount.toFixed(2);
			accountList.appendChild( accountListItem );
		}

		var totalBusinessAccountDisplay = document.getElementById( "business-total" );
		totalBusinessAccountDisplay.innerText = "Total: " + bank.totalCash("business").toFixed(2);

		var businessAccountList = document.getElementById("business-accounts");
		for (account of bank.filteredAccounts("business")) {
			var businessAccountListItem = document.createElement("li");
			businessAccountListItem.innerText = account.owner + ": £" + account.amount.toFixed(2);
			businessAccountList.appendChild( businessAccountListItem );
		}

		var totalPersonalAccountList = document.getElementById( "personal-total" );
		totalPersonalAccountList.innerText = "Total: " + bank.totalCash("personal").toFixed(2);

		var personalAccountList = document.getElementById("personal-accounts");
		for (account of bank.filteredAccounts("personal")) {
			var personalAccountListItem = document.createElement("li");
			personalAccountListItem.innerText = account.owner + ": £" + account.amount.toFixed(2);
			personalAccountList.appendChild( personalAccountListItem );
		}

		var interestButton = document.getElementById("interest");

		interestButton.onclick = function() {
			console.log("clicky, clicky good stuff");
			totalDisplay.innerText = "";
			accountList.innerHTML = "";
			businessAccountList.innerText = "";
			personalAccountList.innerText = "";
			bank.addInterest(10);
			this.render(bank);
			this.storeAccounts(bank.accounts);
		}.bind(this);

	},

	storeAccounts: function(accounts) {
		localStorage.setItem("storedAccounts", JSON.stringify(accounts));
	}



};

module.exports = BankViewer;
