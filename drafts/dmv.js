// GLOBAL VARIABLES
var objectCount = 0;

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
function removeObject(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
  return true;
}

// Thanks to https://stackoverflow.com/questions/40195766/lowercase-all-letters-in-a-string-except-the-first-letter-and-capitalize-first-l
function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseAllWordsExceptFirstLetters(string) {
  return string.replace(/\w\S*/g, function(word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
}

// Edits text in a specific element
function edit_element(element_id, prompt_text, style = True) {
  let existing = document.getElementById(element_id);
  let new_text = prompt(prompt_text, existing.innerHTML);
  new_text = new_text.replace(/\s/g, "_");

  if (new_text) {
    switch (style) {
      case "upperCase":
        existing.innerHTML = new_text.toUpperCase();
        break;
      case "lowerCase":
        existing.innerHTML = new_text.toLowerCase();
        break;
      case "firstUpper":
        existing.innerHTML = upperCaseFirstLetter(
          lowerCaseAllWordsExceptFirstLetters(new_text)
        );
        break;
      default:
        existing.innerHTML = new_text;
    }
    return true;
  } else {
    return false;
  }
}

// Adds an attribute to an object
function addAttribute(object_id) {
  let attributeList = document.getElementById(object_id + "_attribList");
  let attribute_count = attributeList.childElementCount;

  let attrib = document.createElement("div");
  attrib.setAttribute("class", "attribute");
  attrib.id = object_id + "_a_" + attribute_count;

  let type = document.createElement("span");
  type.id = object_id + "_a_" + attribute_count + "_type";
  type.innerHTML = "TYPE";
  type.onclick = function() {
    edit_element(this.id, "Enter new attribute type:", "upperCase");
  };

  let span = document.createElement("span");
  span.id = object_id + "_a_" + attribute_count + "_name";
  span.innerHTML = "attribute_" + attribute_count;
  span.onclick = function() {
    edit_element(this.id, "Enter new attribute name:", "lowerCase");
  };

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "remove";
  deleteButton.onclick = function() {
    removeObject(this.parentNode.id);
  };

  attrib.appendChild(type);
  attrib.appendChild(span);
  attrib.appendChild(deleteButton);
  attributeList.appendChild(attrib);
  return true;
}

// BUTTON FUNCTIONALITY
function addObject() {
  let canvas = document.getElementById("canvas");

  // Create outer container
  let container = document.createElement("div");
  container.id = "o_" + objectCount;
  container.setAttribute("class", "object");

  // Create top bar options
  let options = document.createElement("div");
  options.setAttribute("class", "menubar");
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "BTN_delete_object");
  let addAttrib = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.onclick = function() {
    removeObject(this.parentNode.parentNode.id);
  };
  addAttrib.innerHTML = "Add Attribute";
  addAttrib.setAttribute("class", "BTN_add_attrib");
  addAttrib.onclick = function() {
    addAttribute(this.parentNode.parentNode.id);
  };
  options.appendChild(deleteButton);
  options.appendChild(addAttrib);
  container.appendChild(options);

  // Create the heading
  let heading = document.createElement("span");
  heading.id = "o_" + objectCount + "_title";
  heading.onclick = function() {
    edit_element(this.id, "Enter new object name:", "firstUpper");
  };
  heading.innerHTML = "Object_" + objectCount;
  heading.setAttribute("class", "object_header");
  container.appendChild(heading);

  // Create the body
  let body = document.createElement("div");
  body.setAttribute("class", "object_body");
  body.id = "o_" + objectCount + "_attribList";

  // Finalize
  container.appendChild(body);
  objectCount++;
  canvas.appendChild(container);
}

function cls() {
  let canvas = document.getElementById("canvas");
  if (confirm("Do you really want to clear the screen?")) {
    canvas.innerHTML = "";
  }
  return true;
}

function convertToJSON() {
  let canvas = document.getElementById("canvas").children;
  let data = {};

  for (let i = 0; i < canvas.length; i++) {
    let attributes = {};
    let attribs = document.getElementById(canvas[i].id + "_attribList")
      .children;
    for (let j = 0; j < attribs.length; j++) {
      attributes["o_" + i + "_a_" + j] = {
        type: document.getElementById("o_" + i + "_a_" + j + "_type").innerHTML,
        name: document.getElementById("o_" + i + "_a_" + j + "_name").innerHTML
      };
    }
    data["o_" + i] = {
      name: document.getElementById("o_" + i + "_title").innerHTML,
      attributes: attributes
    };
  }
  return JSON.stringify(data);
}

function save_json() {
  convertToJSON();
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(convertToJSON())
  );
  element.setAttribute("download", "data_model.json");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function load_json() {}

function export_models() {}

function import_models() {}
