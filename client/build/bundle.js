/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Bank = __webpack_require__( 1 );
	var sampleAccounts = __webpack_require__(2);
	var Account = __webpack_require__(3);
	var BankViewer = __webpack_require__( 4 )
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Bank = function(){
	  this.accounts = [];
	}
	
	Bank.prototype = {
	  addAccount: function(account){
	    this.accounts.push(account);
	  },
	  findAccountByOwnerName:function(ownerName){
	    var foundAccount = null;
	    for (account of this.accounts) {
	      if(account.owner === ownerName){
	        foundAccount = account;
	      }
	    }
	    return foundAccount;
	  },
	
	  filteredAccounts: function(type){
	    if(!type) return this.accounts
	    var filteredAccounts = [];
	    for (account of this.accounts) {
	      if(type === account.type)
	        filteredAccounts.push(account);
	    }
	    return filteredAccounts;
	  },
	
	  totalCash:function(type){
	    var total = 0;
	    for (account of this.filteredAccounts(type)) {
	      total += account.amount;
	    }
	    return total;
	  },
	
	  accountAverage:function(){
	    return this.totalCash()/this.accounts.length;
	  },
	
		addInterest: function(interest) {
			for (account of this.accounts) {
				account.amount += account.amount*interest/100;
			}
		}
	};
	
	
	module.exports = Bank;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = [
	  { "owner": "jay",
	    "amount": 125.50,
	    "type": "personal"
	  },
	  { "owner": "val",
	    "amount": 55125.10,
	    "type": "personal"
	  },
	  { "owner": "marc",
	    "amount": 400.00,
	    "type": "personal"
	  },
	  { "owner": "keith",
	    "amount": 220.25,
	    "type": "business"
	  },
	  { "owner": "rick",
	    "amount": 1.00,
	    "type": "business"
	  },
	]


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Account = function(params){
	  this.owner = params.owner;
	  this.amount = params.amount;
	  this.type = params.type;
	};
	
	module.exports = Account;


/***/ },
/* 4 */
/***/ function(module, exports) {

	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map