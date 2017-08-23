"use strict";

// console.log("main.js");

$(document).ready(function() {

// ********** DEFINE VARIABLES TO HOLD INCOMING DATA ********** //
	let holdCategories;
	let holdTypes;
	let holdProducts;


// ********** LISTEN FOR CHANGE OF CATEGORY ********** //
$("#select-category").change(function() {
	let categorySelected = $("#select-category").val();

// ********** CLEAR INCOMING DATA VARIABLES********** //
	holdCategories = [];
	holdTypes = [];
	holdProducts = {};

// ********** CLEAR DOM COLUMNS ********** //
		$("#output-row-1").html("");
		$("#output-row-2").html("");
		$("#output-row-3").html("");

// ********** LOAD DATA, TRIGGER SORT, AND TRIGGER PRINT TO DOM ********** //
	loadCategories()
	.then((loadedCategories) => {
		holdCategories = loadedCategories;
		return loadTypes();
	})
	.then((loadedTypes) => {
		holdTypes = loadedTypes;
		return loadProducts();
	})
	.then((loadedProducts) => {
		holdProducts = loadedProducts;
		return sortProducts(categorySelected, holdCategories, holdTypes, holdProducts);
	})
	.then((sortedProducts) => {
		return printLoadedProducts(sortedProducts);		
	});
});


// ********** FUNCTION TO CONSTRUCT OBJECT OF PRODUCTS IN CHOSEN CATEGORY ********** //
function sortProducts (inputCategorySelected, inputCategories, inputTypes, inputProducts) {
	let productArray = [];

// ********** CHOOSE CATEGORY BASED ON DROP-DOWN CHOICE ********** //
	let selectedCategory = $.grep(inputCategories.categories, (element) => {
		let categoryName = element.name;
		console.log("categoryName", categoryName);
		return (categoryName === inputCategorySelected);
	}); 

// ********** GET ARRAY OF TYPES BY CATEGORY ********** //
	let selectedCategoryId = selectedCategory[0].id;
	let selectedTypes = $.grep(inputTypes.types, (element) => {
		let categoryOfType = element.category;
		return (categoryOfType === selectedCategoryId);
	});

// ********** CONSTRUCT SELECTED PRODUCS OBJECT BASED ON TYPE AND CATEGORY ********** //
	let selectedProducts = {};
	$.each(selectedTypes, (typesKey, typesValue) => {
		$.each(inputProducts.products[0], (productsKey, productsValue) => {
			if (productsValue.type === typesValue.id) {
				selectedProducts[productsKey] = productsValue;
				productsValue["category"] = inputCategorySelected;
				productsValue["type"] = typesValue.name;
				productsValue["type_description"] = typesValue.description;
			}
		});
	});
	return selectedProducts;
}


// ********** PRINT EACH PRODUCT TO DOM BASED ON ROW ID ********** //
function printLoadedProducts (loadedProducts) {
	let counter = 0;
	let rowNumber = 1;
	let rowID;

	$.each(loadedProducts, (key, value) => {
		rowID = "#output-row-" + rowNumber;
		$(rowID).append(`<div class="col-sm-4">
							<div><h3>${value.name}</h3></div>
							<div>${value.category}: ${value.type}</div>
							<div>${value.description}</div>
							</div>`);
		counter += 1;
		if (counter === 3) {
			rowNumber += 1;
			counter -= 3;
		}

	});
}


// ********** LOAD CATEGORIES DATA FROM JSON ********** //
function loadCategories() {
	return new Promise( function(resolve, reject) {
		$.ajax({
			url: "../javascripts/categories.json"
		})
		.done(function(loadedCategories) {
			resolve(loadedCategories)
		})
		.fail(function(error) {
			console.error("error", error);
		});
	});
}


// ********** LOAD TYPES DATA FROM JSON ********** //
function loadTypes(input) {
	return new Promise( function(resolve, reject) {
		$.ajax({
			url: "../javascripts/types.json"
		})
		.done(function(loadedTypes) {
			resolve(loadedTypes);
		})
		.fail(function(error) {
			console.error("error", error);
		});
	});
}


// ********** LOAD PRODUCTS DATA FROM JSON ********** //
function loadProducts(input) {
	return new Promise( function(resolve, reject) {
		$.ajax({
			url: "../javascripts/products.json"
		})
		.done(function(loadedProducts) {
			resolve(loadedProducts);
		})
		.fail(function(error) {
			console.error("error", error);
		});
	});
}


});