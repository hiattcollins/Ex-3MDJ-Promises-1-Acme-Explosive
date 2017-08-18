"use strict";

console.log("main.js");

// console.error("busted");

$(document).ready(function() {



$("#select-category").change(function() {
	let categorySelected = $("#select-category").val();
	let holdCategories;
	let holdTypes;
	let holdProducts;


	console.log("categorySelected", categorySelected);

	// var resultFromLoadCategories = 

	// loadCategories(categorySelected)
	// .then(resultingCatId => {
	// 	console.log("** resultingCatId after loadCategories", resultingCatId);
	// 	printSomething(resultingCatId);
	// }).then(loadTypes())
	// .then();



	// loadedTypes => {
	// 	console.log("** loadedTypes", loadedTypes);
	// 	loadProducts();

	// }).then(loadedProducts => {
	// 	console.log("** loadedProducts", loadedProducts);
	// 	// logResults(loadedTypes, loadedProducts);
	// });


	// console.log("resultFromLoadCategories", resultFromLoadCategories);

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

		

		// return "ham";
	})
	.then(() => {
		// console.log("loadedProducts in last then:", loadedProducts);
		console.log("The then after last promise call");

		// logResults(holdCategories, holdTypes, holdProducts);

		sortProducts(categorySelected, holdCategories, holdTypes, holdProducts);
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

	console.log("selectedProducts", selectedProducts);


	

	// let selectedProducts = $.grep(inputProducts.products[0], (element) => {
	// 	// $.each(selectedTypes, (key, value) => {
	// 	// 	if (value.)
	// 	// });
	// 	console.log("element", element);
	// 	return element;
	// });

	// console.log("selectedProducts", selectedProducts);

	// let selectedProducts = $.grep(inputProducts.products[0])

	// $.each(inputCategories.categories, (key, value) => {
	// 	console.log("key:", key, "value:", value);
	// 	console.log("value.name", value.name);
	// 	let categoryName = value.name;

	// 	if (categoryName === inputCategorySelected) {
	// 		let categoryId = value.id;
	// 		console.log("categoryId", categoryId);

	// 		$.each(inputTypes.types, (key, value) => {
	// 			console.log("inputTypes key:", key, "inputTypes value:", value);

	// 			let typeCategory = value.category;
	// 			let typeId = value.id;

	// 			if (typeCategory === categoryId) {

	// 				console.log("correct cat inputTypes key:", key, "correct cat inputTypes value:", value);

	// 				// $.each(inputProducts.products, (key, value) => {
	// 				// 	// console.log("products key:", key, "products value:", value);

	// 				// 	if (){

	// 				// 	}
	// 				// });
	// 			}


	// 		});
	// 	}
	// });
}

function logResults (input1, input2, input3) {
	console.log("holdCategories:", input1, "holdTypes:", input2, "holdProducts:", input3);
}


function printSomething(input1) {
	console.log("printSomething triggered");
	console.log("printSomething input1:", input1);
	$("#output-div").html(`<h2>${input1}</h2>`);
}

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




//load data ajax
// bakery.loadInventory = () => {
//   return new Promise( function(resolve, reject) {
//     $.ajax({
//       url: 'https://general-purpose-31b59.firebaseio.com/items.json?orderBy="typeId"&equalTo="${val}"`'
//     })
//     .done(function(data) {
//       fillInventory(data);
//       //console.log('inventory', data);
//       resolve(data);
//     })
//     .fail(reject);
//   });
// };

// window.loadSongs = function(callBackToInvoke) { 
//   $.ajax({
//       url:"songs.json"
//     }).done(callBackToInvoke)
//       .fail(function(error) {
//         console.log("Error:", error);
//   });

// }


});