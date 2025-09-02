# youtubeclonemern
Full Stack project - Youtube Clone with MERN stack

# youtubeclonemern
Full Stack project - Youtube Clone with MERN stack

Project Setup:
1.This project is a youtube clone made using MERN Stack.

2.This includes React,Node,Express,Mongodb.

3.React is used for front end development,Node and express is used to create backend 

application.

4.Mongodb is used to create database and retrieve collections accordingly.

5.all the required dependencies will be present in package.json file in both frontend 

and backend folders.

6.all the routes are defined in the "routes" folder inside "backend" folder which 

consists of protected andunprotected routes.

7.Functionalities of these routes are implement in "controllers" folder inside "backend"

folder

8.Each model's strucure is defined inside "models" folder inside "backend" folder.

9."frontend" folder includes all the react components including all the necessary icons.


Project Structure:
```
fullstack/
├── frontend/
│   ├── components/
│   ├── icons/
│   ├── public/
│   ├── src/
│   ├── storage/
│   └── .gitignore
│   ├── index
│   ├── package.json
│   ├── package-lock.json
│   └── youtube.png
│   └── vite.config
├── backend/
│   ├── authentication/
│   ├── controller/
│   ├── models/
│   ├── routes/
│   └── package.json
│   ├── package-lock.json
│   └── server.js
└── README.md
```


Features:
1.Below points describes all the necessary features that are implemented in the project

2.We can create a user with all the necessary information provided.

3.i've added dummy videos data to maintain the count of videos in the website.

4.User authentication is done using JWT-based authentication.

5.Create your own channel and manage the channelname,description,banner and profile picture.

6.Youtube channel consists of all the videos that are uploaded to that particular channel

7.once we are signed in we can edit and delete the videos in our youtube channel.

8.Comments can be added to any video in the database and comments can be only added to uploaded videos.They cannot 

be added to dummy videos.

9.We can also edit the comments for any particular video or delete it.

10.The main video page consists of all the necessary information of the video which
 
includes description,title,channelname,likes/dislikes,comments,no of subscribers etc.

11.features also includes likes/dislikes button.This features only works with uploaded videos but not with dummy 

data.

12.media queries are added to adjust according to any screen size which includes mobile,

laptop,desktop etc.

13.lazy loading is implemented to only load the components which are required.

14.i've also added "allchannels" page which displays all the channels in the database.

(readonly)


Usage:

1.navigate to "fullstack" folder after extracting rar file by using the command 
```
cd fullstack
```

2.both frontend and backend applications need to be running to use the youtube clone app.

3.after navigating to "fullstack" folder with "cd fullstack" command you can see two folders 1."frontend" 2."backend"

4.navigate to "frontend" folder using ```cd frontend``` and use command 

```npm run dev``` to start the front end application.

5.then open another terminal and type 

```cd backend``` and use command ```npm start``` to start the backend application.

6.Then navigate to backend folder using ```cd backend``` and use command ```npm start``` to start the backend application.

7.confirm if both backend and frontend applications are running without any issues.

8.then navigate to "http://localhost:5173"

9.from there you can perform all the features implemented in the project

Project By 

S Sreenivas.
Internshala.


