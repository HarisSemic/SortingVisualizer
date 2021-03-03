# SortingVisualizer

This web app visualizes the following sorting algorithms: bubble sort, selection sort, insertion sort, merge sort, quick sort and heap sort.

This app is deployed with Netlify and can be accessed here: https://sortalgovisualizer.netlify.app/. I hope you have fun playing around with it.

## Purpose of this project

I wanted to improve my skills with javascript and revise my knowledge on sorting algorithms. The app was built from the ground up, and the entirety of the desing, html, javascript, and sass/css, were done by me.

## Code organization

The ```src``` directory contains the following three subdirectories. 

* ```js``` - Each functionality (eg. sorting algorithm) is contained within its own view file. Each sorting algorithm view contains sorting code, animation generation code, and event publisher for triggering the animations, and extends from the SortView class. Animations are universally handled by the ```animate()``` function contained within the SortView, which means that any additional sorting algorithm can be coded up and plugged in, without touching the rest of the code. Event subscribers are implemented within the controller, and model contains state variables necessary for the app.
* ```sass``` - Contains the following subdirectories:
  * ```abstracts``` - contains sass mixins and variables.
  * ```base``` - base, typography and utilities.
  * ```components``` - separate sass code for each component.
  * ```layout``` - code for header, main, footer and grid (row and column implemented via flexbox).
* ```img``` - contains images used within the app.

## Bundling

Project was bundled using Parcel2.0.
