# File Sharing App

A file sharing app if in which you can upload any of your files and then share the links of those files with any other user.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)

## Features

1. Anyone can safely upload their files since there is an safe authentication system.
2. When you share the files your information such as email is not recoverable as it will be encrypted.
3. Uploaded files will remain on the app so you can access them again in the future safely.
4. You can download, view and delete the uploaded files.
5. Files can be shared with anyone on the internet you want.

## Technologies

1. In front-end React.js is used along with tailwindcss for styling.
2. User Authentication system is implemented using firebase in front-end only(within react).
3. In backend Express.js is used for setting up the server which will be serving build version of react files.
4. For storing the files a local directory is used using Multer.js.
5. For database MongoDB is used and is integrated in the server using mongoose.js.

## Installation

1. Clone the repository: `git clone  https://github.com/AdoshSingh/weather_app.git` run this in terminal in your desired folder.
2. Install dependencies: `npm install` run this in the client folder and the server folder, it will install the dependencies required in the project.
3. Firebase setup: To apply the user authentication you would need to setup your own firebase.js file in the `/client/src` folder. For this you just need to login to your firebase account and set up your own user authentication web app. Remember add only email and username authentication system for authentication. Now just find the firebase-config code for web (</>) and paste this code in the `/client/src/firebase.js` (you would need to make this file first). Now it should look like this:
   
```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_STORAGE_BUCKET",
messagingSenderId: "YOUR_MESSAGING_SENDING_ID",
appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```
4. Run the project: first run `nodemon index` in the `/server/src` and then run `npm run start` in the `/client`.

## Usage

1. Sign Up to the application by entering email and username (You can just use a sample email: sample@sample.com).
2. Once you sign up, go to the login page and enter those details.
3. Now you will be redirected to the upload page, you can upload any files that you want, now you can view, download and delete them.
4. Click on the `Share this link` and now you see the shared files, you can send the current url to any other user to share the files.
5. Shared files can only be viewed and downloaded, cannot be deleted.
6. When you are done just logout.

## Demo

Deployed Link - [https://file-nexus.onrender.com/](https://file-nexus.onrender.com/)

