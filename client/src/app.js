var Bank = require( "./bank/bank.js" );
var sampleAccounts = require("./sample.json");
var Account = require("./bank/account.js");
var BankViewer = require( "./bank/bank_viewer.js" )

window.onload = function() {
	console.log("sample accounts ", sampleAccounts);
	var storedAccounts = JSON.parse(localStorage.getItem("storedAccounts")) || sampleAccounts;

	var bank = new Bank();
	for ( accountData of storedAccounts ) {
		bank.addAccount(new Account(accountData));
	}
	var bankViewer = new BankViewer( bank );
	bankViewer.render( bank );
};
