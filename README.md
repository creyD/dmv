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

## Folder Structure

In the main directory should only be the following folders and files:

- README.md -- This file
- LICENSE -- Self explanatory
- .gitignore -- Files which git excludes
- drafts/ -- For drafting your solution (please don't create PRs for drafts)
- src/ -- Main source code directory
- src/dmv -- JS/ HTML/ CSS code for the Django Model Visualizer
- src/electron -- (FUTURE) Electron code
- docs/ -- Documentation separated for each folder in the `src/` directory
