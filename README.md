# Backend Social Network 💻

This project is the backend of a social network using node, express and mongoose. 
The main objective of the project was to use the mongoose ODM to simulate a simple social network in which there are users, posts and post comments.
This backend has been pushed to production, so you can use the url ' https://backend-social-network.vercel.app/ ' to test the endpoints.

## Endpoints 🔨

- Users (/users)
- Posts (/posts)
- Comments (/comments)

Each of these endpoints makes use of GET, POST, PUT, and DELETE requests. 
Most of these requests make use of JWT tokens for the authentication of the user who creates, modifies or deletes posts and comments
To see more information about the endpoints, use the API documentation.

## Api Documentation 📃

![image](/assets/SwaggerUI.gif)


An API documentation has been made using Swagger. 
In order to see this documentation, it is necessary to see it locally by downloading this repository because swager does not work well in production due to security issues.
In localhost use the path '{{local-url}}/api-docs' in your browser to see the documentation with all the requests and you can even test it from there.

I have also posted [here](https://documenter.getpostman.com/view/19130008/2s8YmNPN4P), a Postman collection with all the requests. 
If you don't want to download this repository, to test the endpoints you can import this collection and use the production url.

## Technologies used 🛠
- NodeJS and Express
- MondoDB with mongoose
- Multer
- Bcrypt + JWT
- Nodemailer

## Pre-requirements 📣

If you want to use the repository locally follow these steps:

0 - You need to have Node and MongoDB installed on your computer.

1 - In order to start the project first make a git clone of this project.

2 - Once the project is cloned, you must install the necessary modules with npm:
> npm install

3 - You should rename the ".env.example" file to ".env".
Then complete the fields that are in the file with your data so that everything works correctly. Nodemailer uses an email and an application password. 
I recommend using port 8080 since that is the one I used.

4 - The project is ready to start
> npm start

Made by [Alex Jiménez](https://github.com/radikalex) 😁
