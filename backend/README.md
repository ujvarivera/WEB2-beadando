# web2-22t-ujvarivera 
## Meals App v2
---

# Public routes
People without registration and jwt token can use and try out these routes.

## GET
1. `/api/heartbeat`
- You don't have to attach anything.
- If you successfully connected to the server, the response will be this:
`
{
    "connection": "true"
}`

2. `/api/meals`
- You don't have to attach any data.
- Response: Returns every meal (in json format) stored locally in `backend\src\meals.js`. Like this, but longer:
`
{"meals":[{"idMeal":"52768","strMeal":"Apple Frangipan Tart", ...}]}
`

This `meals.js` contains ca. 30 meals, which is from [The MealDB API](https://www.themealdb.com/api.php).

3. `/api/meals/:name`
- requested parameter is the name of the meal.
- Response: returns the data of the searched meal. It can be one or more meals, depends on how many meals' name contain what you searched for. (in json format).
If you search for this: `/api/meals/apple`, the response will be like the previous one:
`
{"meals":[{"idMeal":"52768","strMeal":"Apple Frangipan Tart", ...}]}
`
The search is not case-sensitive.

## POST

1. `/api/signup`
- You have to attach a username and a password to the body. e.g.:
`
{
    "username":"sample",
    "password":"sample"
}
`
- The response will be your id, if registration was successful. Something like this:
`
{
    "id": "622de77669324b091023955c"
}`

2. `/api/login`
-  You have to attach a username and a password to the body. e.g.:
`
{
    "username":"sample",
    "password":"sample"
}
`
- response on success: your jwt token, which expires after one hour. Something like this:
`
{
    "token": "a very long random token"
}
`

# Private Routes
You need to have a jwt token, if you want to use these routes. 
If you have a token, it will be attached through a middleware called authMW.
If you use Postman or something like that, you have to attach your token manually. (Authorization, type Bearer token)

## GET
1. `/api/myposts`
- Response: returns the posts of the user. Similar to this:
`
[{"_id":"62232a580b90ad31301e71e3","title":"First","content":"My first post","createdBy":"62123883eec7b336bc90d327","createdAt":"2022-03-05T09:16:08.522Z","__v":0}, ...]
`

2. `/api/posts`
- Response: returns all of the posts stored in the database. Similar to this:
`
[{"_id":"62232a580b90ad31301e71e3","title":"Second","content":"My second post","createdBy":{"_id":"62123883eec7b336bc90d327","username":"hello","__v":0},"createdAt":"2022-03-05T09:16:08.522Z","__v":0}, ...]
`

3. `/api/images`
- Response: returns your id with your avatar, which contains the url, but only, if you have already uploaded one. On success:
`
{"_id":"622dba5d572c2f2b783fb27c","avatar":"/api/files/62123883eec7b336bc90d327.jpg","userId":"62123883eec7b336bc90d327","__v":0}
`

## POST

1. `/api/posts`
- You have to attach a title and a content to the body, like this:
`
{
    "title":"sample",
    "content":"sample"
}
`
- Response: If posting was successful, it returns your new post. For example:
`
{"_id":"622dee5569324b0910239567","title":"sample","content":"sample","createdBy":"62123883eec7b336bc90d327","createdAt":"2022-03-13T13:15:01.909Z","__v":0}
` 

2. `/api/images`
- You have to attach an image to the body as a form-data. The key is image, and the value is your chosen image.
- Response: it returns the location of your profile pic, like this:
` "/api/files/621264fa956ce10e10e1f344.jpg" `
If you click to that, a GET method pops up, and it can show your image.

## PUT
1. `/api/posts/:id`
- you have to attach a post id to the params, like this:
`/api/posts/622df0e669324b0910239571`
- Also, you have to attach a new title and a new content  to the body like this:
`
{
    "title":"updated post",
    "content":"updated post"
}
`
- Response: A json, which contains the new information about the updated post. Something like this:
`
{
    "_id": "622df0e669324b0910239571",
    "title": "updated post",
    "content": "updated post",
    "createdBy": "621264fa956ce10e10e1f344",
    "createdAt": "2022-03-13T13:25:58.581Z",
    "__v": 0
}
`

## DELETE

1. `/posts/:id`
- You have to attach a post id to the params.
- Response on success: you get back the information about that deleted post.
`
{
    "_id": "622df0e669324b0910239571",
    "title": "deleted post",
    "content": "deleted post",
    "createdBy": "621264fa956ce10e10e1f344",
    "createdAt": "2022-03-13T13:25:58.581Z",
    "__v": 0
}
`

2. `/images/:id`
- you have to attach your user id to the params, in order to delete your profile pic.
- response on success:
` {
    "message": "You successfully deleted your profile pic"
}
`