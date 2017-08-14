"use strict";

console.log("main.js");

// console.error("busted");

$(document).ready(function() {

$("#select-category").change(function() {
	var categorySelected = $("#select-category").val();
	console.log("categorySelected", categorySelected);
	loadCategories(categorySelected);
});

function logCategories(input1, input2) {
	console.log("logCategories loadedCats", input1);
	console.log("logCategories inputCategorySelected", input2);

	// input1.find()
	// 
	



}

function loadCategories(inputCategorySelected) {
	return new Promise( function(resolve, reject) {
		$.ajax({
			url: "../javascripts/categories.json"
		})
		.done(function(loadedCats) {
			logCategories(loadedCats, inputCategorySelected);
			resolve(loadedCats);
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