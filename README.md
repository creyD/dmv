# Django Model Visualizer (DMV)

## Scope

This Open-Source Project shall one day rise and shine as a data model creator
which can export directly into a functional Django 'models.py' file. On the
other hand it should also import the 'models.py' files and give a handy
visualization.

The tool could be used to interact with databases in general - but specifically
with Django databases very easily. It could be written in JS, so one can host
a system if he wants to but everyone could use it fairly simple on a computer
without internet access as JS can be executed by every browser. Furthermore an
Electron application could be an option in the future.

When this project goes into beta, a server will be provided to test everything.

## Folder Structure

- README.md -- Overview over the project
- LICENSE.md -- License of all the code in this repository
- CONTRIBUTING.md -- Please read this guide if you consider contributing to this project
- .gitignore -- Files which git excludes

- drafts/ -- For drafting your solution (please don't create PRs for drafts)
- src/ -- Source Code of the Django Model Visualizer
- docs/ -- Documentation separated for each folder in the `src/` directory
- github/ -- Files for GitHub like Issue Templates

# Contributors

Nobody is listed here at the moment.

# Future

Like mentioned before this project could be integrated in an electron app as it
is mainly JavaScript based. Furthermore it could be provided as a Django module
even if that is probably only useful for viewing the data model because edits
couldn't be applied on the server if the server is running. This project will
be hosted once finished and can therefore be used as an online tool.
