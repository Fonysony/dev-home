# What is Mongoose?

Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Express web application framework. 

Mongoose is an Object Document Mapper (ODM). ODMs like Mongoose map documents coming from a database into usable JavaScript objects. Mongoose provides ways for us to model out our application data and define a schema. It offers easy way to validate data and build complex queries from the comfort of JS.

# Default MongoDB Port

The following table lists the default TCP ports used by MongoDB:

| Default Port | Description                                                  |
| :----------- | :----------------------------------------------------------- |
| `27017`      | The default port for [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod) and [`mongos`](https://docs.mongodb.com/manual/reference/program/mongos/#mongodb-binary-bin.mongos) instances. You can change this port with [`port`](https://docs.mongodb.com/manual/reference/configuration-options/#mongodb-setting-net.port) or [`--port`](https://docs.mongodb.com/manual/reference/program/mongod/#std-option-mongod.--port). |
| `27018`      | The default port for [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod) when running with [`--shardsvr`](https://docs.mongodb.com/manual/reference/program/mongod/#std-option-mongod.--shardsvr) command-line option or the `shardsvr` value for the [`clusterRole`](https://docs.mongodb.com/manual/reference/configuration-options/#mongodb-setting-sharding.clusterRole) setting in a configuration file. |
| `27019`      | The default port for [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod) when running with [`--configsvr`](https://docs.mongodb.com/manual/reference/program/mongod/#std-option-mongod.--configsvr) command-line option or the `configsvr` value for the [`clusterRole`](https://docs.mongodb.com/manual/reference/configuration-options/#mongodb-setting-sharding.clusterRole) setting in a configuration file. |

# Connections

You can connect to MongoDB with the `mongoose.connect()` method.

```javascript
mongoose.connect('mongodb://localhost:27017/myapp');
```

This is the minimum needed to connect the `myapp` database running locally on the default port (27017). If connecting fails on your machine, try using `127.0.0.1` instead of `localhost`.

You can also specify several more parameters in the `uri`:

```javascript
mongoose.connect('mongodb://username:password@host:port/database?options...');
```



## Error Handling

There are two classes of errors that can occur with a Mongoose connection.

- Error on initial connection. If initial connection fails, Mongoose will emit an 'error' event and the promise `mongoose.connect()` returns will reject. However, Mongoose will **not** automatically try to reconnect.
- Error after initial connection was established. Mongoose will attempt to reconnect, and it will emit an 'error' event.

To handle initial connection errors, you should use `.catch()` or `try/catch` with async/await.

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected!!');
})
.catch(err => {
    console.log('OH NOO ERRO!!');
    console.log(err);
})
```

This used to be the old way, but now it is deprecated, use a async function or this:

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieApp')
.then(() => {
  console.log('CONNECT!');
})
.catch(err => {
  console.log(err);
})
```

You can also do the async function way

```js
const mongoose = require('mongoose');

main();

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/movieApp');
        console.log('CONNECTED!');
    } catch (err) {
        console.log(err);
    }
}
```

Also `.then()` and `.catch()`

```js
const mongoose = require('mongoose');

main().then(() => {
  console.log('CONNECT!');
})
.catch(err => {
  console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}
```

# Schemas

A Schema is like a blueprint for MongoDB. Schema are mappings of different collection keys from MongoDB to different types in JavaScript. 

We are taking information from MongoDB, which has different data types that JavaScript has. 

```js
import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```

We're just defining out what a given blog in this case should look like or what a movie should look like. 

If you want to add additional keys later, use the [Schema#add](https://mongoosejs.com/docs/api.html#schema_Schema-add) method.

```js
{
  title: 'Amadeus',
  year: 1986,
  score: 9.2,
  rating: 'R',
}
```

This is the object or the blueprint we want to make for our Schema. Lets see how we do that with a Schema.

The permitted SchemaTypes are:

- [String](https://mongoosejs.com/docs/schematypes.html#strings)
- [Number](https://mongoosejs.com/docs/schematypes.html#numbers)
- [Date](https://mongoosejs.com/docs/schematypes.html#dates)
- [Buffer](https://mongoosejs.com/docs/schematypes.html#buffers)
- [Boolean](https://mongoosejs.com/docs/schematypes.html#booleans)
- [Mixed](https://mongoosejs.com/docs/schematypes.html#mixed)
- [ObjectId](https://mongoosejs.com/docs/schematypes.html#objectids)
- [Array](https://mongoosejs.com/docs/schematypes.html#arrays)
- [Decimal128](https://mongoosejs.com/docs/api.html#mongoose_Mongoose-Decimal128)
- [Map](https://mongoosejs.com/docs/schematypes.html#maps)

Read more about [SchemaTypes here](https://mongoosejs.com/docs/schematypes.html).

```js
const mongoose = require('mongoose');

main().then(() => {
  console.log('CONNECT!');
})
.catch(err => {
  console.log(err);
})

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}
```

We have defined a Schema which has nothing to do with the database, it's just a cocept on the JavaScript side. We now take this Schema and tell Mongoose we want to create a model.

# Models

Models are just JavaScript classes that we make with the assistance of Mongoose that represent information in a Mongo database collection. 

[Models](https://mongoosejs.com/docs/api.html#model-js) are fancy constructors compiled from `Schema` definitions. An instance of a model is called a [document](https://mongoosejs.com/docs/documents.html). Models are responsible for creating and reading documents from the underlying MongoDB database.

## Compiling your first model

When you call `mongoose.model()` on a schema, Mongoose *compiles* a model for you.

```javascript
const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', schema);
```

The first argument is the *singular* name of the collection your model is for. **Mongoose automatically looks for the plural, lowercased version of your model name.** Thus, for the example above, the model Tank is for the **tanks** collection in the database.

**Note:** The `.model()` function makes a copy of `schema`. Make sure that you've added everything you want to `schema`, including hooks, before calling `.model()`!

```javascript
const Kitten = mongoose.model('Kitten', kittySchema);
```

A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema. Let's create a kitten document representing the little guy we just met on the sidewalk outside:

```javascript
const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'
```

Kittens can meow, so let's take a look at how to add "speak" functionality to our documents:

```javascript
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model('Kitten', kittySchema);
```

Functions added to the `methods` property of a schema get compiled into the `Model` prototype and exposed on each document instance:

```javascript
const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
```

We have talking kittens! But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its [save](https://mongoosejs.com/docs/api.html#model_Model-save) method. The first argument to the callback will be an error if any occurred.

```javascript
await fluffy.save();
fluffy.speak();
```





## EXAMPLE!!!!

```js
const mongoose = require('mongoose');

main().then(() => {
  console.log('CONNECTED!!');
})
.catch(err => {
  console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}
```

Here we are including `mongoose` in our project by calling it with `require()`. We are opening a connection to the `movieApp` database on our local running instance of MongoDB. 

```js
const mongoose = require('mongoose');

main().then(() => {
  console.log('CONNECTED!!');
})
.catch(err => {
  console.log(err);
})

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}
```

Now we have created a movie Schema, we have the Schema properties of title, year, score, and rating. All of them have a permitted SchemaType.

```js
const mongoose = require('mongoose');

main().then(() => {
  console.log('CONNECTED!!');
})
.catch(err => {
  console.log(err);
})

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}
```

A model is a fancy class constructor which compiles our Schema. The first argument is the singluar name of the collection your model is for. It creates a plural, and lowercases it. 

The `.model()` then grabs our `movieSchema` and copies it. So, make sure you added everything you wanted in your Schema before you call `.model()`.

```js
const mongoose = require('mongoose');

main().then(() => {
  console.log('CONNECTED!!');
})
.catch(err => {
  console.log(err);
})

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);

const monsterInc = new Movie({title: 'Monster Inc', year: 2001, score: 8.1, rating: 'PG'});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}
```

We have a movie!!! The Movie class takes our Schema properties and uses them to create documents. When calling the Schema's properties, whatever we set our property SchemaType to, like `String` or `Number`, will set it as a string or number in JavaScript. 

Lets say I take title which is set to the `String` SchemaTypes and give it a number, our class `Movie` will take that and convert it into a JavaScipt string.

```js
const monsterInc = new Movie({title: 2, year: '2001', score: 8.1, rating: 'PG'});
{
  title: '2',
  year: 2009,
  score: 8.1,
  rating: 'PG',
  _id: new ObjectId("61865d3a8cc128454e8b1ac7")
}
```

If we took a string and added into the `Number` SchemaType then that property won't be used.

```js
const monsterInc = new Movie({title: 2, year: 'ok', score: 8.1, rating: 'PG'});
{
  title: '2',
  score: 8.1,
  rating: 'PG',
  _id: new ObjectId("61865e8a8793550b731211e6")
}
```



Alright so, we have that but we haven't saved our movie into MongoDB yet. Each document can be saved to the database by calling it's `save()` method. The first argument to the callback will be an error if any occurred.

```js
const mongoose = require('mongoose');

main().then(() => {
  console.log('CONNECTED!!');
})
.catch(err => {
  console.log(err);
})

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);

const monsterInc = new Movie({title: 'Monster Inc', year: 2001, score: 8.1, rating: 'PG'});
monsterInc.save();

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}
```



# insertMany()

You could type 5 movies and save them manual, but an easier and more efficient way is with `insertMany()`. You can create mutiple documents from a class using the `.insertMany()` method.

```js
const mongoose = require('mongoose');

main().then(() => {
  console.log('CONNECTED!!');
})
.catch(err => {
  console.log(err);
})

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);

Movie.insertMany([
  {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
  {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
  {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
  {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
  {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'},
]).then(data => {
  console.log(data);
})

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}
```

This will take some time so, `.insertMany()` returns a promise. We do not need to use the `.save()` method inorder to save our movies into MongoDB.





# Queries

A mongoose query can be executed in one of two ways. First, if you pass in a `callback` function, Mongoose will execute the query asynchronously and pass the results to the `callback`.

A query also has a `.then()` function, and thus can be used as a promise.

## Queries Are Not Promises

 Mongoose queries are **not** promises. They have a `.then()` function for [co](https://www.npmjs.com/package/co) and [async/await](http://thecodebarbarian.com/common-async-await-design-patterns-in-node.js.html) as a convenience. However, unlike promises, calling a query's `.then()` can execute the query multiple times.

For example, the below code will execute 3 `updateMany()` calls, one because of the callback, and two because `.then()` is called twice.

```javascript
const q = MyModel.updateMany({}, { isDeleted: true }, function() {
  console.log('Update 1');
});

q.then(() => console.log('Update 2'));
q.then(() => console.log('Update 3'));
```

Don't mix using callbacks and promises with queries, or you may end up with duplicate operations. That's because passing a callback to a query function immediately executes the query, and calling [`then()`](https://masteringjs.io/tutorials/fundamentals/then) executes the query again.

Mixing promises and callbacks can lead to duplicate entries in arrays. For example, the below code inserts 2 entries into the `tags` array, **not** just 1.

```javascript
const BlogPost = mongoose.model('BlogPost', new Schema({
  title: String,
  tags: [String]
}));

// Because there's both `await` **and** a callback, this `updateOne()` executes twice
// and thus pushes the same string into `tags` twice.
const update = { $push: { tags: ['javascript'] } };
await BlogPost.updateOne({ title: 'Introduction to Promises' }, update, (err, res) => {
  console.log(res);
});
```



## Model.exec()

Basically when using mongoose, documents can be retrieved using helpers. Every model method that accepts query conditions can be executed by means of a `callback` or the `exec` method.

`callback`:

```js
User.findOne({ name: 'daniel' }, function (err, user) {
  //
});
```

`exec`:

```js
User
  .findOne({ name: 'daniel' })
  .exec(function (err, user) {
      //
  });
```

Therefore when you don't pass a callback you can build a query and eventually execute it.

You can find additional info in the [mongoose docs](http://mongoosejs.com/docs/queries.html).

**UPDATE**

Something to note when using [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) in combination with Mongoose async operations is that Mongoose queries are **not** Promises. Queries do return a *thenable*, but if you need a *real* Promise you should use the `exec` method. More information can be found [here](http://mongoosejs.com/docs/promises.html).

## Should You Use `exec()` with await?

- `await Band.findOne();`
- `await Band.findOne().exec();`

As far as functionality is concerned, these two are equivalent. However, we recommend using `.exec()` because that gives you better stack traces.

```javascript
const doc = await Band.findOne({ name: "Guns N' Roses" }); // works

const badId = 'this is not a valid id';
try {
  await Band.findOne({ _id: badId });
} catch (err) {
  // Without `exec()`, the stack trace does **not** include the
  // calling code. Below is the stack trace:
  //
  // CastError: Cast to ObjectId failed for value "this is not a valid id" at path "_id" for model "band-promises"
  //   at new CastError (/app/node_modules/mongoose/lib/error/cast.js:29:11)
  //   at model.Query.exec (/app/node_modules/mongoose/lib/query.js:4331:21)
  //   at model.Query.Query.then (/app/node_modules/mongoose/lib/query.js:4423:15)
  //   at process._tickCallback (internal/process/next_tick.js:68:7)
  err.stack;
}

try {
  await Band.findOne({ _id: badId }).exec();
} catch (err) {
  // With `exec()`, the stack trace includes where in your code you
  // called `exec()`. Below is the stack trace:
  //
  // CastError: Cast to ObjectId failed for value "this is not a valid id" at path "_id" for model "band-promises"
  //   at new CastError (/app/node_modules/mongoose/lib/error/cast.js:29:11)
  //   at model.Query.exec (/app/node_modules/mongoose/lib/query.js:4331:21)
  //   at Context.<anonymous> (/app/test/index.test.js:138:42)
  //   at process._tickCallback (internal/process/next_tick.js:68:7)
  err.stack;
}
```



# API Model



## Model.find(filter, [projection], [options], [callback])

Finds documents. Mongoose casts the `filter` to match the model's schema before the command is sent.

```js
// find all documents
await MyModel.find({});

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// executes, passing results to callback
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// executes, name LIKE john and only selecting the "name" and "friends" fields
await MyModel.find({ name: /john/i }, 'name friends').exec();

// passing options
await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();
```



### Example:

```js
const Movie = mongoose.model('Movie', movieSchema);

Movie.insertMany([
  {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
  {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
  {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
  {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
  {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'},
]);
```

```js
movieSync();

async function movieSync() {
    console.log(await Movie.find({}).exec());
}
```



## Model.findOne([conditions], [projection], [options], [callback])

Finds one document.

The `conditions` are cast to their respective SchemaTypes before the command is sent.

*Note:* `conditions` is optional, and if `conditions` is null or undefined, mongoose will send an empty `findOne` command to MongoDB, which will return an arbitrary document. If you're querying by `_id`, use `findById()` instead.

### Return

Returns a Query. 

```js
// Finds the first document in the list
User.findOne().exec();
User.findOne({}).exec(); // Also finds first document
// Finds the first document with the name 'William'
User.findOne({name: 'William'}).exec();

// Using callback
User.findOne(), function (err, user) {});
```



### Example:

```js
const Movie = mongoose.model('Movie', movieSchema);

Movie.insertMany([
  {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
  {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
  {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
  {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
  {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'},
]);
```

```js
movieSync();

async function movieSync() {
  console.log(await Movie.findOne({}).exec());
}

{
  _id: new ObjectId("6186e8a4b981bdf7b822f6fc"),
  title: 'Amelie',
  year: 2001,
  score: 8.3,
  rating: 'R',
  __v: 0
}
```



## Model.findById()

Finds a single document by its _id field. `findById(id)` is almost* equivalent to `findOne({ _id: id })`. If you want to query by a document's `_id`, use `findById()` instead of `findOne()`.

The `id` is cast based on the Schema before sending the command.

This function triggers the following middleware.

- `findOne()`

\* Except for how it treats `undefined`. If you use `findOne()`, you'll see that `findOne(undefined)` and `findOne({ _id: undefined })` are equivalent to `findOne({})` and return arbitrary documents. However, mongoose translates `findById(undefined)` into `findOne({ _id: null })`.

### Return

Returns a Query.

```js
// Find the document with the given `id`, or `null` if not found
User.findById(id).exec();

// Using callback
User.findById(id, function(err, user) {});
```

