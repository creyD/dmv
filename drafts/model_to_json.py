"""
Django Model to JSON Converter

Converts a Django models.py to a json document

"""

# Importing json for saving the data into a json formated file
import json

file = open('models.py', 'r')
models = {}
current_model = {}
current_model_name = ''
new_class = False

ignore = False

for line in file:
    if not line.strip().startswith('#') and len(line) > 1:
        if line.strip().startswith('class') and 'models' in line:
            if not new_class:
                new_class = True
                current_model_name = line[6:-16]
            else:
                models[current_model_name] = current_model
                current_model = {}
                new_class = False

        elif new_class:
            if '=' in line and '(' in line:
                new_line = line.split('=', 1)
                attributes = new_line[1][8:-1].split('(', 1)
                new_field = {}
                new_attributes = {}
                for attrib in attributes[1].split(','):
                    if '=' in attrib:
                        new_attribute = attrib.split('=')
                        if new_attribute[1].endswith(')'):
                            new_attribute[1] = new_attribute[1][:-1]
                        new_attributes[new_attribute[0].strip()] = new_attribute[1].strip()
                    else:
                        new_attributes['foreign_reference'] = attrib
                new_field['typ'] = attributes[0]
                new_field['attributes'] = new_attributes
                current_model[new_line[0].strip()] = new_field

print(json.dumps(models))

# Known Issues:
# - Problems with MinMaxValidators and attribute splitting
