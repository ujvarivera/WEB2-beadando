# web2-22t-ujvarivera 
## Meals App v2
---

# To start the project
1. copy `backend/.env.temp` to `backend/.env` and fill in the data in `backend/.env`

```bash
cp backend/.env.temp backend/.env
```

2. And run

```bash
npm install
npm run start
```
# What kind of methods is the application using? 

- Register (POST method)
- Login (POST method)
- Only the members with token have access to the forum, where they can see their own, and other people's posts. (GET method)
- There, you can create new posts by adding title and content (both are required) (POST method)
- Update your posts (PUT method)
- Delete your posts (DELETE method)
- On the Profile, you can add a profile picture (POST method)
- Also, you can delete that avatar (DELETE method)
- When you go to the profile, the site gets your avatar url (if you already have) from the server by your id (GET method)

# What libraries and technologies does the app use?

Mainly, backend uses Express.js and MongoDB, while the frontend is using React.js.

It also uses:

- Axios (frontend)
- React Router (frontend)
- React Dropzone (frontend)
- React Icons (frontend)
- Mongoose (backend)
- JSON Web Tokens (JWT) (backend)
- Bcrypt (backend)
- Multer (backend)

MongoDB is used with it's cloud version ([MongoDB Atlas](https://www.mongodb.com/atlas/database)).
