"use strict";
// GLOBAL VARIABLES
var object_count = 0;

// HELPER
// Remove all children of a given element
function removeChildren(element) {
	var child = element.lastElementChild;
	while (child) {
		element.removeChild(child);
		child = element.lastElementChild;
	}
	return true;
}

// Remove an object by it's ID
function removeObject(id){
	var element = document.getElementById(id);
    element.parentNode.removeChild(element);
    return true;
}

// Thanks to https://stackoverflow.com/questions/40195766/lowercase-all-letters-in-a-string-except-the-first-letter-and-capitalize-first-l
function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\w\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
}

// Adds an attribute to an object
function addAttribute(object_id){
	let attribute_list = document.getElementById(object_id + '_attribList');
	let attribute_count = attribute_list.childElementCount;

	let attrib = document.createElement('div');
	attrib.setAttribute('class', 'attribute')
	attrib.id = object_id + '_a_' + attribute_count;

	let type = document.createElement('span');
	type.id = object_id + '_a_' + attribute_count + '_type';
	type.innerHTML = 'TYPE';
	type.onclick = function() { edit_element(this.id, 'Enter new attribute type:', 'upperCase'); };

	let span = document.createElement('span');
	span.id = object_id + '_a_' + attribute_count + '_name';
	span.innerHTML = 'attribute_' + attribute_count;
	span.onclick = function() { edit_element(this.id, 'Enter new attribute name:', 'lowerCase'); };

	let deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'remove';
	deleteButton.onclick = function() { removeObject(this.parentNode.id); };

	attrib.appendChild(type);
	attrib.appendChild(span);
	attrib.appendChild(deleteButton);
	attribute_list.appendChild(attrib);
	return true;
}

// Edits text in a specific element
function edit_element(element_id, prompt_text, style = 'default') {
	let existing = document.getElementById(element_id);
	let new_text = prompt(prompt_text, existing.innerHTML);
	new_text = new_text.replace(/\s/g, '_');

	if (new_text){
		if (style === 'default'){
			existing.innerHTML = new_text;
		} else if (style === 'upperCase'){
			existing.innerHTML = new_text.toUpperCase();
		} else if (style === 'lowerCase'){
			existing.innerHTML = new_text.toLowerCase();
		} else if (style === 'firstUpper'){
			existing.innerHTML = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(new_text));
		}
		return true;
	} else{
		return false;
	}	
}

// BUTTON FUNCTIONALITY
function addObject(){
	let canvas = document.getElementById('canvas');

	// Create outer container
	let container = document.createElement('div');
	container.id = 'o_' + object_count;
	container.setAttribute('class', 'object');

	// Create top bar options
	let options = document.createElement('div');
	options.setAttribute('class', 'menubar');
	let deleteButton = document.createElement('button');
	deleteButton.setAttribute('class', 'BTN_delete_object');
	let addAttrib = document.createElement('button');
	deleteButton.innerHTML = 'Delete';
	deleteButton.onclick = function() { removeObject(this.parentNode.parentNode.id); };
	addAttrib.innerHTML = 'Add Attribute';
	addAttrib.setAttribute('class', 'BTN_add_attrib');
	addAttrib.onclick = function() { addAttribute(this.parentNode.parentNode.id); };
	options.appendChild(deleteButton);
	options.appendChild(addAttrib);
	container.appendChild(options);

	// Create the heading
	let heading = document.createElement('span');
	heading.id = 'o_' + object_count + '_title';
	heading.onclick = function() { edit_element(this.id, "Enter new object name:", 'firstUpper'); };
	heading.innerHTML = 'Object_' + object_count;
	heading.setAttribute('class', 'object_header');
	container.appendChild(heading);

	// Create the body
	let body = document.createElement('div');
	body.setAttribute('class', 'object_body');
	body.id = 'o_' + object_count + '_attribList';

	// Finalize
	container.appendChild(body);
	object_count++;
	canvas.appendChild(container);
}

function cls(){
	let canvas = document.getElementById('canvas');
	if (confirm("Do you really want to clear the screen?")){
		canvas.innerHTML = '';
	}	
	return true;
}

function save_json(){

}

function load_json(){

}

function export_models(){

}

function import_models(){

}
