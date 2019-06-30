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

function removeObject(id){
	var element = document.getElementById(id);
    element.parentNode.removeChild(element);
    return true;
}

function addAttribute(object_id){
	let attribute_list = document.getElementById(object_id + '_attribList');
	let attribute_count = attribute_list.childElementCount;

	let attrib = document.createElement('div');
	attrib.setAttribute('class', 'attribute')
	attrib.id = object_id + '_a_' + attribute_count;

	let type = document.createElement('span');
	type.id = object_id + '_a_' + attribute_count + '_type';
	type.innerHTML = 'TYPE';
	type.onclick = function() { edit_element(this.id, 'Enter new attribute type:'); };

	let span = document.createElement('span');
	span.id = object_id + '_a_' + attribute_count + '_name';
	span.innerHTML = 'Attribute ' + attribute_count;
	span.onclick = function() { edit_element(this.id, 'Enter new attribute name:'); };

	let deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'remove';
	deleteButton.onclick = function() { removeObject(this.parentNode.id); };

	attrib.appendChild(type);
	attrib.appendChild(span);
	attrib.appendChild(deleteButton);
	attribute_list.appendChild(attrib);
	return true;
}

function edit_element(element_id, prompt_text) {
	let existing = document.getElementById(element_id);
	let new_text = prompt(prompt_text, existing.innerHTML);

	if (new_text){
		existing.innerHTML = new_text;
		return true;
	} else{
		return false;
	}	
}

// BUTTONS
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
	heading.onclick = function() { edit_element(this.id, "Enter new object name:"); };
	heading.innerHTML = 'OBJECT ' + object_count;
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
