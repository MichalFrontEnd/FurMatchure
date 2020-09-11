# FurMatchure
Final project at Spiced Academy

### Description
My 1-week final project at Spiced Academy.
In this single-page app I experimented with Konva and React-Konva to create a color-matching app for home design.
The app user can drag & drop items, rescale them and color or pattern-fill them. Includes photo upload and image save for the final result.


### Technologies and libraries
Node (Express), PostgreSQL, React, Konva, React-Konva, React Color, Redux, AWS (S3), Socket.io.

### Feautures
* Drag & drop, rescaling
* Ordering (Layering)
* Random color generator
* Image upload, if users want to try a specific pattern. *ATM the user can decide whether or not to make the pattern public and add it to the site database, or to keep it private. As this is prone for bullying, I will make this feature available only upon registration.
* Dumping of temprory photo uploads upon leaving the site.
* Image save using DataURL. Does not work for pattern fills.

### Disclaimer
Some of the furniture images on this project were downloaded from google. 
I do not own the rights for them, and if the owners of the photos request it, they will be removed from the project.
In the future I plan to create my own furniture images.

### Known Issues
* As this is a Canvas/Konva based project, it doesn't run well on Firefox.
* Transforming (rescaling) doesn't work smoothly.
* Ordering affects the transforming as well.
* Saving button should disappear when there is a pattern-filled image on the canvas, and re-appear once there is no pattern. Does not function properly.

### TODOs and more features
* Complete furniture and pattern databases
* Write photo filter to remove white foreground from furniture images.
* Add toggable form with colour details. Form could appear on the side and be saveable or appear on the photo where it could be downloaded with the image.
* Add registration and make photo upload to db available only for logged in users.


### Preview
![alt text](https://github.com/MichalFrontEnd/FurMatchure/blob/master/public/FurMatchure%20Preview.gif "FurMatchure Preview Gif")
