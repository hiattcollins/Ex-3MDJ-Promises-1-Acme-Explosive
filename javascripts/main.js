"use strict";

console.log("main.js");

// console.error("busted");

$(document).ready(function() {

	let holdCategories;
	let holdTypes;
	let holdProducts;

$("#select-category").change(function() {
	let categorySelected = $("#select-category").val();

	holdCategories = [];
	holdTypes = [];
	holdProducts = {};


// ********** ********** //

// ********** CLEAR DOM COLUMNS ********** //

		$("#output-row-1").html("");
		$("#output-row-2").html("");
		$("#output-row-3").html("");

	console.log("categorySelected", categorySelected);

	
	loadCategories()
	.then((loadedCategories) => {
		console.log("loadedCategories =", loadedCategories);
		holdCategories = loadedCategories;
		console.log("holdCategories", holdCategories);
		return loadTypes();
	})
	.then((loadedTypes) => {
		console.log("loadedTypes =", loadedTypes);
		holdTypes = loadedTypes;
		console.log("holdTypes", holdTypes);

		return loadProducts();
	})
	.then((loadedProducts) => {
		console.log("loadedProducts =", loadedProducts);
		holdProducts = loadedProducts;
		console.log("holdProducts", holdProducts);

		return sortProducts(categorySelected, holdCategories, holdTypes, holdProducts);
	})
	.then((sortedProducts) => {
		// console.log("loadedProducts in last then:", loadedProducts);
		console.log("The then after last promise call &&&");

		console.log("sortedProducts", sortedProducts);


		// logResults(holdCategories, holdTypes, holdProducts);
		return printLoadedProducts(sortedProducts);
		
	});
});

function sortProducts (inputCategorySelected, inputCategories, inputTypes, inputProducts) {

	console.log("inputCategorySelected", inputCategorySelected);
	console.log ("inputCategories.categories", inputCategories.categories);
	console.log("inputProducts.products", inputProducts.products);
	let productArray = [];

	let selectedCategory = $.grep(inputCategories.categories, (element) => {
		let categoryName = element.name;
		console.log("categoryName", categoryName);
		return (categoryName === inputCategorySelected);
	}); 

	console.log("selectedCategory", selectedCategory);

	let selectedCategoryId = selectedCategory[0].id;
	console.log("selectedCategoryId", selectedCategoryId);

	let selectedTypes = $.grep(inputTypes.types, (element) => {
		let categoryOfType = element.category;
		return (categoryOfType === selectedCategoryId);
	});

	console.log("selectedTypes", selectedTypes);

	console.log("inputProducts.products[0]", inputProducts.products[0]);


	let selectedProducts = {};

	$.each(selectedTypes, (typesKey, typesValue) => {

		$.each(inputProducts.products[0], (productsKey, productsValue) => {
		// console.log("productsKey:", productsKey, "productsValue.id", productsValue.id);

		if (productsValue.type === typesValue.id) {
			console.log("******* productsValue", productsValue);
			selectedProducts[productsKey] = productsValue;
			productsValue["category"] = inputCategorySelected;
			productsValue["type"] = typesValue.name;
			productsValue["type_description"] = typesValue.description;
			// console.log("selectedProducts[productsKey].productsValue", selectedProducts[productsKey].productsValue);
		}

		});

	});

	// console.log("selectedProducts", selectedProducts);

	return selectedProducts;
}



function printLoadedProducts (loadedProducts) {

	console.log("At printLoadedProducts-->");

	let counter = 0;
	let rowNumber = 1;
	let rowID;

	$.each(loadedProducts, (key, value) => {
		rowID = "#output-row-" + rowNumber;

		console.log("rowID", rowID);

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

// function logResults (input1, input2, input3) {
// 	console.log("holdCategories:", input1, "holdTypes:", input2, "holdProducts:", input3);
// }


// function printSomething(input1) {
// 	console.log("printSomething triggered");
// 	console.log("printSomething input1:", input1);
// 	$("#output-div").html(`<h2>${input1}</h2>`);
// }

function logCategories(input1, input2) {
	console.log("logCategories loadedCats", input1);
	console.log("logCategories inputCategorySelected", input2);

	// input1.find()
	// let keys = Object.keys(input1["categories"]);
	// console.log("keys", keys);


	var categoryObj = input1["categories"].find(getCategoryId);
	//  => {
	// 	return categoryObj.id
	// });

	function getCategoryId(categoryObj) {
		return categoryObj.name === input2;
	}

	console.log("categoryObj", categoryObj);

	var categoryId = categoryObj["id"];
	console.log("categoryId", categoryId);

	return categoryId;
}

// function lastToPrint ()

// function holdCategories (input) {

// }

function loadCategories() {
	return new Promise( function(resolve, reject) {
		$.ajax({
			url: "../javascripts/categories.json"
		})
		.done(function(loadedCategories) {
			console.log("loadedCats right after ajax done", loadedCategories);
			// var resultingCatId = logCategories(loadedCats, inputCategorySelected);
			// console.log("resultingCatId right before resolve", resultingCatId);
			// resolve(resultingCatId);
			resolve(loadedCategories)
		})
		.fail(function(error) {
			console.error("error", error);
		});
	});
}

function loadTypes(input) {
	return new Promise( function(resolve, reject) {
		$.ajax({
			url: "../javascripts/types.json"
		})
		.done(function(loadedTypes) {
			console.log("loadedTypes right after ajax done", loadedTypes);
			// var resultingCatId = logCategories(loadedCats, inputCategorySelected);
			// console.log("resultingCatId right before resolve", resultingCatId);
			resolve(loadedTypes);
		})
		.fail(function(error) {
			console.error("error", error);
		});
	});
}

function loadProducts(input) {
	return new Promise( function(resolve, reject) {
		$.ajax({
			url: "../javascripts/products.json"
		})
		.done(function(loadedProducts) {
			console.log("loadedProducts right after ajax done", loadedProducts);
			// var resultingCatId = logCategories(loadedCats, inputCategorySelected);
			// console.log("resultingCatId right before resolve", resultingCatId);
			resolve(loadedProducts);
		})
		.fail(function(error) {
			console.error("error", error);
		});
	});
}





});