# HalMe4Py or Halstead Metrics for Python

This application allows to calculate the halstead metrics, entering as input a python text file, on which is performed a processing and classification of tokens, to obtain the occurrence of each of these tokens and perform the necessary operations to obtain the halstead metrics.

## Prerequisites

- Nodejs installed
- Ionic CLI installed
- Android Studio installed

## Preconditions
- It is assumed that only syntactically and semantically valid text file entries are entered.

## Limitations and known issues: 
- Metric calculation is only supported for python
- The applications cannot classify the multiline strigns or remove multiline comments

## Installation

1. Fork and clone this repo.
2. Globally install **node**
You can download and install it from the official site https://nodejs.org/es/
3. The project has two variants, one for CLI with node and the version with the mobile application, to start using either of the two you must move to the directory path you want from the command line and perform the next step
4. Setup the project:
Run `npm install` in the root directory of the project to install the dependencies.

### How to run the CLI version

You can run it with the following commands

- For development: 
```
npm run dev
```
- For a quick start: 
```
npm run start
```
- For production: 
```
npm run build
```

### How to run the mobile application

The HalMe4Py app is just like any other Ionic Angular app. 
See [the docs](https://ionicframework.com/docs/) for more info.

- `ionic build` to build web assets
- `ionic serve` to run web version in your browser
- `ionic cap sync`
- `ionic cap run <platform>` (also w/ livereload: just add `-l --external --host=YOUR_IP` flags)

You can also opt-out of the Ionic CLI and use npm scripts the scripts defined by me:

- `npm run pre`: "ionic build && ionic capacitor add android && ionic capacitor copy android",
- `npm run dev`: "ionic capacitor run android -l --host=192.168.100.8",
- `npm run preprod`: "ionic build && ionic capacitor copy android && npx cap sync android && npx cap open android",
- `npm run prod`: "ionic capacitor build android"
