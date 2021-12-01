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

## The permitted SchemaTypes are:

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



## Instance Methods

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



```js
const mongoose = require('mongoose');

main();

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
});

productSchema.methods.toggleOnSale = function() {
  this.isOnSale = !this.isOnSale;
  return this.save();
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({name: 'Tire Pump'});
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
}

findProduct();

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
{
  _id: new ObjectId("618a53dc6b6bd3a385e893f7"),
  name: 'Tire Pump',
  price: 20,
  isOnSale: false,
  categories: [ 'Bike' ],
  __v: 0
}

% node product.js
{
  _id: new ObjectId("618a53dc6b6bd3a385e893f7"),
  name: 'Tire Pump',
  price: 20,
  isOnSale: true,
  categories: [ 'Bike' ],
  __v: 0
}
```

We are taking our `productSchema` and adding a method called `toggleOnSale()` that will grab the  `productSchema`'s  `isOnSale` `Boolean` and toggle it. We then save the changes on the `productSchema` to take to effect. We are returning the `.save()` because it may take awhile inorder for the changes to save so, it's good to wait for that to finish.

`findProduct` will then try to find a product within the `Product` class and wait for the results to come back with `await`, because it could take awhile. After it finds a match or not, it will `console.log` the product and `await` the `toggleOnSale()` method, which returns a query that can be `.then()` or `await`.

The keyword `this` refers to each and every instance of the `Product` model.



## Static Methods

You can also add static functions to your model. There are two equivalent ways to add a static:

- Add a function property to `schema.statics`
- Call the [`Schema#static()` function](https://mongoosejs.com/docs/api.html#schema_Schema-static)

```javascript
// Assign a function to the "statics" object of our animalSchema
  animalSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
  };
  // Or, equivalently, you can call `animalSchema.static()`.
  animalSchema.static('findByBreed', function(breed) { return this.find({ breed }); });

  const Animal = mongoose.model('Animal', animalSchema);
  let animals = await Animal.findByName('fido');
  animals = animals.concat(await Animal.findByBreed('Poodle'));
```

Do **not** declare statics using ES6 arrow functions (`=>`). Arrow functions [explicitly prevent binding `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this), so the above examples will not work because of the value of `this`.

```js
const mongoose = require('mongoose');

main();

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
});

productSchema.statics.fireSale = function() {
  return this.updateMany({}, {onSale: true, price: 0});
}

const Product = mongoose.model('Product', productSchema);

Product.fireSale().then(res =>console.log(res));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
```

The `this` keyword refers to the `Product` model. 



## Query Helpers

You can also add query helper functions, which are like instance methods but for mongoose queries. Query helper methods let you extend mongoose's [chainable query builder API](https://mongoosejs.com/docs/queries.html).

```javascript
  animalSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') })
  };

  const Animal = mongoose.model('Animal', animalSchema);

  Animal.find().byName('fido').exec((err, animals) => {
    console.log(animals);
  });

  Animal.findOne().byName('fido').exec((err, animal) => {
    console.log(animal);
  });
```



## Virtuals

[Virtuals](https://mongoosejs.com/docs/api.html#schema_Schema-virtual) are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage.

```javascript
  // define a schema
  const personSchema = new Schema({
    name: {
      first: String,
      last: String
    }
  });

  // compile our model
  const Person = mongoose.model('Person', personSchema);

  // create a document
  const axl = new Person({
    name: { first: 'Axl', last: 'Rose' }
  });
```

Suppose you want to print out the person's full name. You could do it yourself:

```javascript
console.log(axl.name.first + ' ' + axl.name.last); // Axl Rose
```

But [concatenating](https://masteringjs.io/tutorials/fundamentals/string-concat) the first and last name every time can get cumbersome. And what if you want to do some extra processing on the name, like [removing diacritics](https://www.npmjs.com/package/diacritics)? A [virtual property getter](https://mongoosejs.com/docs/api.html#virtualtype_VirtualType-get) lets you define a `fullName` property that won't get persisted to MongoDB.

```javascript
personSchema.virtual('fullName').get(function() {
  return this.name.first + ' ' + this.name.last;
});
```

Now, mongoose will call your getter function every time you access the `fullName` property:

```javascript
console.log(axl.fullName); // Axl Rose
```



```js
const mongoose = require('mongoose');
main();

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual('fullName').get(function() {
  return `${this.first} ${this.last}`;
});

const Person = mongoose.model('Person', personSchema);
const tammy = new Person({first: 'Tammy', last: 'Chow'});
tammy.fullName = 'William Santos';
console.log(tammy.fullName);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
}
```

The `fullName` getter function grabs the `first` and `last` properties on the `Person` model and returns a string template literal of `first` and `last`. Remember that this property exists not in the database at all, but on the Mongoose in JavaScript.

You can see that you can't change what `fullName` is, why is that? It's because we haven't set up a setter function to that when we set a new value to `fullName` it sets it for us.

```js
const mongoose = require('mongoose');
main();

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual('fullName').get(function() {
    return this.first + ' ' + this.last;
}).set(function(newStr) {
  this.first = newStr.substr(0, newStr.indexOf(' '));
  this.last = newStr.substr(newStr.indexOf(' ') + 1);
});

const Person = mongoose.model('Person', personSchema);
const tammy = new Person({first: 'Tammy', last: 'Chow'});
tammy.fullName = 'William Santos';
console.log(tammy.fullName);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
}
```

Here the setter function has an parameter that gives you the thing you set `fullName` to, like this `Tammy.fullName = 'William Santos';`. In the setter function `name` will be 'William Santos' because that's what I'm setting `fullName` to be.

It then `this` grabs the `Person` model, which is `tammmy`, I'm calling `fullName` from and sets it's `first` and `last` properties to `name`. 



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

`insertMany()` in Mongoose, if anything does not pass validation, then nothing will be interested by default. 

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



# Middleware

Middleware (also called pre and post *hooks*) are functions which are passed control during execution of asynchronous functions. Middleware is specified on the schema level and is useful for writing [plugins](https://mongoosejs.com/docs/plugins.html).

## Types of Middleware

Mongoose has 4 types of middleware: document middleware, model middleware, aggregate middleware, and query middleware. Document middleware is supported for the following document functions. In document middleware functions, `this` refers to the document.

- [validate](https://mongoosejs.com/docs/api/document.html#document_Document-validate)
- [save](https://mongoosejs.com/docs/api/model.html#model_Model-save)
- [remove](https://mongoosejs.com/docs/api/model.html#model_Model-remove)
- [updateOne](https://mongoosejs.com/docs/api/document.html#document_Document-updateOne)
- [deleteOne](https://mongoosejs.com/docs/api/model.html#model_Model-deleteOne)
- [init](https://mongoosejs.com/docs/api/document.html#document_Document-init) (note: init hooks are [synchronous](https://mongoosejs.com/docs/middleware.html#synchronous))

### Query Middleware 

Query middleware is supported for the following Model and Query functions. In query middleware functions, `this` refers to the query.

- [count](https://mongoosejs.com/docs/api.html#query_Query-count)
- [countDocuments](https://mongoosejs.com/docs/api/query.html#query_Query-countDocuments)
- [deleteMany](https://mongoosejs.com/docs/api.html#query_Query-deleteMany)
- [deleteOne](https://mongoosejs.com/docs/api.html#query_Query-deleteOne)
- [estimatedDocumentCount](https://mongoosejs.com/docs/api/query.html#query_Query-estimatedDocumentCount)
- [find](https://mongoosejs.com/docs/api.html#query_Query-find)
- [findOne](https://mongoosejs.com/docs/api.html#query_Query-findOne)
- [findOneAndDelete](https://mongoosejs.com/docs/api.html#query_Query-findOneAndDelete)
- [findOneAndRemove](https://mongoosejs.com/docs/api.html#query_Query-findOneAndRemove)
- [findOneAndReplace](https://mongoosejs.com/docs/api/query.html#query_Query-findOneAndReplace)
- [findOneAndUpdate](https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate)
- [remove](https://mongoosejs.com/docs/api.html#model_Model.remove)
- [replaceOne](https://mongoosejs.com/docs/api/query.html#query_Query-replaceOne)
- [update](https://mongoosejs.com/docs/api.html#query_Query-update)
- [updateOne](https://mongoosejs.com/docs/api.html#query_Query-updateOne)
- [updateMany](https://mongoosejs.com/docs/api.html#query_Query-updateMany)

### Model Middleware

Model middleware is supported for the following model functions. In model middleware functions, `this` refers to the model.

- [insertMany](https://mongoosejs.com/docs/api.html#model_Model.insertMany)

All middleware types support pre and post hooks. How pre and post hooks work is described in more detail below.

## Pre

Pre middleware functions are executed one after another, when each middleware calls `next`.

```javascript
const schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  next();
});
```

In [mongoose 5.x](http://thecodebarbarian.com/introducing-mongoose-5.html#promises-and-async-await-with-middleware), instead of calling `next()` manually, you can use a function that returns a promise. In particular, you can use [`async/await`](http://thecodebarbarian.com/common-async-await-design-patterns-in-node.js.html).

```javascript
schema.pre('save', function() {
  return doStuff().
    then(() => doMoreStuff());
});

// Or, in Node.js >= 7.6.0:
schema.pre('save', async function() {
  await doStuff();
  await doMoreStuff();
});
```

If you use `next()`, the `next()` call does **not** stop the rest of the code in your middleware function from executing. Use [the early `return` pattern](https://www.bennadel.com/blog/2323-use-a-return-statement-when-invoking-callbacks-especially-in-a-guard-statement.htm) to prevent the rest of your middleware function from running when you call `next()`.

```javascript
const schema = new Schema(..);
schema.pre('save', function(next) {
  if (foo()) {
    console.log('calling next!');
    // `return next();` will make sure the rest of this function doesn't run
    /*return*/ next();
  }
  // Unless you comment out the `return` above, 'after next' will print
  console.log('after next');
});
```



### Use Cases

Middleware are useful for atomizing model logic. Here are some other ideas:

- complex validation
- removing dependent documents (removing a user removes all their blogposts)
- asynchronous defaults
- asynchronous tasks that a certain action triggers

### Erros in Pre Hooks

If any pre hook errors out, mongoose will not execute subsequent middleware or the hooked function. Mongoose will instead pass an error to the callback and/or reject the returned promise. There are several ways to report an error in middleware:

```javascript
schema.pre('save', function(next) {
  const err = new Error('something went wrong');
  // If you call `next()` with an argument, that argument is assumed to be
  // an error.
  next(err);
});

schema.pre('save', function() {
  // You can also return a promise that rejects
  return new Promise((resolve, reject) => {
    reject(new Error('something went wrong'));
  });
});

schema.pre('save', function() {
  // You can also throw a synchronous error
  throw new Error('something went wrong');
});

schema.pre('save', async function() {
  await Promise.resolve();
  // You can also throw an error in an `async` function
  throw new Error('something went wrong');
});

// later...

// Changes will not be persisted to MongoDB because a pre hook errored out
myDoc.save(function(err) {
  console.log(err.message); // something went wrong
});
```

Calling `next()` multiple times is a no-op. If you call `next()` with an error `err1` and then throw an error `err2`, mongoose will report `err1`.



### Example

```js
const mongoose = require('mongoose');
main();

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.pre('save', async function() {
  this.first = 'Yo';
  this.last = 'Mama';
  console.log('ABOUT TO SAVE!!!');
});
personSchema.post('save', async function() {
  console.log('JUST SAVED!!!');
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
}
```

We have two middleware async function, `personSchema.pre()` and  `personSchema.post()`, that runs `pre('save')` and `post('save')`.

In the `pre('save')` meaning before saving, I set the `personSchema`, or who ever calls `.save()`, `first` and `last` properties to 'Yo' and 'Mama' to test out the pre saving.

For `post('save)` meaning after saving, I have set a `console.log()` to print out `SAVED!!` so that we know a `Person` model just called the `save()` method.

```js
const mongoose = require('mongoose');
main();

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.pre('save', async function() {
  this.first = 'Yo';
  this.last = 'Mama';
  console.log('ABOUT TO SAVE!!!');
});
personSchema.post('save', async function() {
  console.log('JUST SAVED!!!');
});

const Person = mongoose.model('Person', personSchema);

const nafee = new Person({first: 'Nafee', last: 'Wrld'});
const willy = new Person({first: 'William', last: 'Santos'});
nafee.save();
willy.save();
Person.find({}).exec(async (err, res) => await console.log(res));


async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
}
```

```shell
% node person.js
ABOUT TO SAVE!!!
ABOUT TO SAVE!!!
[]
JUST SAVED!!!
JUST SAVED!!!
```

You can see here the the `Person.find()` didn't print anything because `nafee` and `willy` wasn't saved to the db when `Person.find()` was executed. To fix this all we gotta do is wait for it to save.

```js
const mongoose = require('mongoose');
main();

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.pre('save', async function() {
    console.log(`About SAVE ${this.first}!!`);
    this.first = 'Yo';
    this.last = 'Mama';
});
personSchema.post('save', async function() {
    console.log(`JUST SAVED ${this.first}!!`);
});

const Person = mongoose.model('Person', personSchema);

const nafee = new Person({first: 'Nafee', last: 'Wrld'});
const willy = new Person({first: 'William', last: 'Santos'});

const print = async () => {
    await nafee.save();
    await willy.save();
    await Person.find({}).exec((err, res) => console.log(res));
}

print();



async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
}
```

```shell
% node person.js
About SAVE Nafee!!
JUST SAVED Yo!!
About SAVE William!!
JUST SAVED Yo!!
[
  {
    _id: new ObjectId("618d3bdb061e49ea164af857"),
    first: 'Yo',
    last: 'Mama',
    __v: 0
  },
  {
    _id: new ObjectId("618d3bdb061e49ea164af858"),
    first: 'Yo',
    last: 'Mama',
    __v: 0
  }
]
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

[
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f6fc"),
    title: 'Amelie',
    year: 2001,
    score: 8.3,
    rating: 'R',
    __v: 0
  },
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f6fd"),
    title: 'Alien',
    year: 1979,
    score: 8.1,
    rating: 'R',
    __v: 0
  },
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f6fe"),
    title: 'The Iron Giant',
    year: 1999,
    score: 7.5,
    rating: 'PG',
    __v: 0
  },
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f6ff"),
    title: 'Stand By Me',
    year: 1986,
    score: 8.6,
    rating: 'R',
    __v: 0
  },
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f700"),
    title: 'Moonrise Kingdom',
    year: 2012,
    score: 7.3,
    rating: 'PG-13',
    __v: 0
  }
]
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
	console.log(await Movie.find({_id: '6186e8a4b981bdf7b822f6fe'}).exec());
}

[
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f6fe"),
    title: 'The Iron Giant',
    year: 1999,
    score: 7.5,
    rating: 'PG',
    __v: 0
  }
]
```

This is one way of finding the `_id` which returns an array, but another option is `findById()`which you don't have to pass in an object. 

```js
movieSync();

async function movieSync() {
	console.log(await Movie.findById('6186e8a4b981bdf7b822f6fe').exec());
}

{
  _id: new ObjectId("6186e8a4b981bdf7b822f6fe"),
  title: 'The Iron Giant',
  year: 1999,
  score: 7.5,
  rating: 'PG',
  __v: 0
}
```



## Model.updateOne(filter, update, [options])

### Returns:

- «Query»

Same as `update()`, except it does not support the `multi` or `overwrite` options.

- MongoDB will update *only* the first document that matches `filter` regardless of the value of the `multi` option.
- Use `replaceOne()` if you want to overwrite an entire document rather than using atomic operators like `$set`

```js
const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
res.matchedCount; // Number of documents matched
res.modifiedCount; // Number of documents modified
res.acknowledged; // Boolean indicating everything went smoothly.
res.upsertedId; // null or an id containing a document that had to be upserted.
res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.
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
	console.log(await Movie.updateOne({title: 'Alien'}, {score: 9}).exec());
  console.log(await Movie.find({title: 'Alien'}));
}

{
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
[
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f6fd"),
    title: 'Alien',
    year: 1979,
    score: 9,
    rating: 'R',
    __v: 0
  }
]
```



## Model.updateMany(filter, update, [options])

### Returns:

- «Query»

Same as `update()`, except MongoDB will update *all* documents that match `filter` (as opposed to just the first one) regardless of the value of the `multi` option.

**Note** updateMany will *not* fire update middleware. Use `pre('updateMany')` and `post('updateMany')` instead.

#### Example:

```js
const res = await Person.updateMany({ name: /Stark$/ }, { isDeleted: true });
res.matchedCount; // Number of documents matched
res.modifiedCount; // Number of documents modified
res.acknowledged; // Boolean indicating everything went smoothly.
res.upsertedId; // null or an id containing a document that had to be upserted.
res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.
```

This function triggers the following middleware.

- `updateMany()`

## Example:

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
	console.log(await Movie.updateMany({title: {$in: ['Alien', 'The Iron Giant']}}, {score: 10}).exec());
  console.log(await Movie.find({title: {$in: ['Alien', 'The Iron Giant']}}));
}

{
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 2
}
[
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f6fd"),
    title: 'Alien',
    year: 1979,
    score: 10,
    rating: 'R',
    __v: 0
  },
  {
    _id: new ObjectId("6186e8a4b981bdf7b822f6fe"),
    title: 'The Iron Giant',
    year: 1999,
    score: 10,
    rating: 'PG',
    __v: 0
  }
]
```



## Model.findOneAndUpdate(conditions, update, [options])

### Returns:

- «Query»

Issues a mongodb findAndModify update command.

Finds a matching document, updates it according to the `update` arg, passing any `options`, and returns the found document (if any) to the callback. The query executes if `callback` is passed else a Query object is returned.

### Options:

- `new`: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
- `upsert`: bool - creates the object if it doesn't exist. defaults to false.
- `overwrite`: bool - if true, replace the entire document.
- `fields`: {Object|String} - Field selection. Equivalent to `.select(fields).findOneAndUpdate()`
- `maxTimeMS`: puts a time limit on the query - requires mongodb >= 2.6.0
- `sort`: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
- `runValidators`: if true, runs [update validators](https://mongoosejs.com/docs/validation.html#update-validators) on this command. Update validators validate the update operation against the model's schema.
- `setDefaultsOnInsert`: `true` by default. If `setDefaultsOnInsert` and `upsert` are true, mongoose will apply the [defaults](http://mongoosejs.com/docs/defaults.html) specified in the model's schema if a new document is created.
- `rawResult`: if true, returns the [raw result from the MongoDB driver](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findAndModify)
- `strict`: overwrites the schema's [strict mode option](http://mongoosejs.com/docs/guide.html#strict) for this update

#### Examples:

```js
A.findOneAndUpdate(conditions, update, options, callback) // executes
A.findOneAndUpdate(conditions, update, options)  // returns Query
A.findOneAndUpdate(conditions, update, callback) // executes
A.findOneAndUpdate(conditions, update)           // returns Query
A.findOneAndUpdate()                             // returns Query
```



### Examples:

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
  console.log(await Movie.findOneAndUpdate({title: 'The Iron Giant'}, {score: 7.0}).exec());
}

{
  _id: new ObjectId("6186e8a4b981bdf7b822f6fe"),
  title: 'The Iron Giant',
  year: 1999,
  score: 10,
  rating: 'PG',
  __v: 0
}
```

I said update `score` to `7.1` not 10, why is it 10? It's giving the old version of the modified document. If you want the new moodified document then you must use the `new` option and set it to `true`.

```js
movieSync();

async function movieSync() {
  console.log(await Movie.findOneAndUpdate({title: 'The Iron Giant'}, {score: 2.0}, {new: true}).exec());
}

{
  _id: new ObjectId("6186e8a4b981bdf7b822f6fe"),
  title: 'The Iron Giant',
  year: 1999,
  score: 2,
  rating: 'PG',
  __v: 0
}
```



## Model.findOneAndDelete(conditions, [options])

### Returns:

- «Query»

Issue a MongoDB `findOneAndDelete()` command.

Finds a matching document, removes it, and passes the found document (if any) to the callback.

Executes the query if `callback` is passed.

This function triggers the following middleware.

- `findOneAndDelete()`

This function differs slightly from `Model.findOneAndRemove()` in that `findOneAndRemove()` becomes a [MongoDB `findAndModify()` command](https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/), as opposed to a `findOneAndDelete()` command. For most mongoose use cases, this distinction is purely pedantic. You should use `findOneAndDelete()` unless you have a good reason not to.

#### Options:

- `sort`: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
- `maxTimeMS`: puts a time limit on the query - requires mongodb >= 2.6.0
- `select`: sets the document fields to return, ex. `{ projection: { _id: 0 } }`
- `projection`: equivalent to `select`
- `rawResult`: if true, returns the [raw result from the MongoDB driver](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findAndModify)
- `strict`: overwrites the schema's [strict mode option](http://mongoosejs.com/docs/guide.html#strict) for this update

#### Examples:

```js
A.findOneAndDelete(conditions, options, callback) // executes
A.findOneAndDelete(conditions, options)  // return Query
A.findOneAndDelete(conditions, callback) // executes
A.findOneAndDelete(conditions) // returns Query
A.findOneAndDelete()           // returns Query
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
  console.log(await Movie.findOneAndDelete({title: 'Alien'}).exec());
}

{
  _id: new ObjectId("6186e8a4b981bdf7b822f6fd"),
  title: 'Alien',
  year: 1979,
  score: 10,
  rating: 'R',
  __v: 0
}
```



## Model.deleteMany(conditions, [options])

### Returns:

- «Query»

Deletes all of the documents that match `conditions` from the collection. It returns an object with the property `deletedCount` containing the number of documents deleted. Behaves like `remove()`, but deletes all documents that match `conditions` regardless of the `single` option.

#### Example:

```js
await Character.deleteMany({ name: /Stark/, age: { $gte: 18 } }); // returns {deletedCount: x} where x is the number of documents deleted.
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
  console.log(await Movie.deleteMany({year: {$gte: 1999}}).exec());
}

{ deletedCount: 3 }

{ "_id" : ObjectId("618961449082c20b3995fe84"), "title" : "Alien", "year" : 1979, "score" : 8.1, "rating" : "R", "__v" : 0 }
{ "_id" : ObjectId("618961449082c20b3995fe86"), "title" : "Stand By Me", "year" : 1986, "score" : 8.6, "rating" : "R", "__v" : 0 }
```





# Mongoose Schema Validations

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    isOnSale: Boolean
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

This is the shorthand way of making `name` to be a `String` SchemaType and `price` to be a `Number`. If you use an object you can use the built-in validations that come with Mongoose. 

By default the shorthand SchemaTypes are set to the `type` property. 

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    isOnSale: Boolean,
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```



## [SchemaType Options](https://mongoosejs.com/docs/schematypes.html#schematype-options)

- `required`: boolean or function, if true adds a [required validator](https://mongoosejs.com/docs/validation.html#built-in-validators) for this property
- `default`: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
- `select`: boolean, specifies default [projections](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/) for queries
- `validate`: function, adds a [validator function](https://mongoosejs.com/docs/validation.html#built-in-validators) for this property
- `get`: function, defines a custom getter for this property using [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
- `set`: function, defines a custom setter for this property using [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
- `alias`: string, mongoose >= 4.10.0 only. Defines a [virtual](https://mongoosejs.com/docs/guide.html#virtuals) with the given name that gets/sets this path.
- `immutable`: boolean, defines path as immutable. Mongoose prevents you from changing immutable paths unless the parent document has `isNew: true`.
- `transform`: function, Mongoose calls this function when you call [`Document#toJSON()`](https://mongoosejs.com/docs/api/document.html#document_Document-toJSON) function, including when you [`JSON.stringify()`](https://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript) a document.

## Indexes

You can also define [MongoDB indexes](https://docs.mongodb.com/manual/indexes/) using schema type options.

- `index`: boolean, whether to define an [index](https://docs.mongodb.com/manual/indexes/) on this property.
- `unique`: boolean, whether to define a [unique index](https://docs.mongodb.com/manual/core/index-unique/) on this property.
- `sparse`: boolean, whether to define a [sparse index](https://docs.mongodb.com/manual/core/index-sparse/) on this property.

## String

- `lowercase`: boolean, whether to always call `.toLowerCase()` on the value
- `uppercase`: boolean, whether to always call `.toUpperCase()` on the value
- `trim`: boolean, whether to always call [`.trim()`](https://masteringjs.io/tutorials/fundamentals/trim-string) on the value
- `match`: RegExp, creates a [validator](https://mongoosejs.com/docs/validation.html) that checks if the value matches the given regular expression
- `enum`: Array, creates a [validator](https://mongoosejs.com/docs/validation.html) that checks if the value is in the given array.
- `minLength`: Number, creates a [validator](https://mongoosejs.com/docs/validation.html) that checks if the value length is not less than the given number
- `maxLength`: Number, creates a [validator](https://mongoosejs.com/docs/validation.html) that checks if the value length is not greater than the given number
- `populate`: Object, sets default [populate options](https://mongoosejs.com/docs/populate.html#query-conditions)

## Number

- `min`: Number, creates a [validator](https://mongoosejs.com/docs/validation.html) that checks if the value is greater than or equal to the given minimum.
- `max`: Number, creates a [validator](https://mongoosejs.com/docs/validation.html) that checks if the value is less than or equal to the given maximum.
- `enum`: Array, creates a [validator](https://mongoosejs.com/docs/validation.html) that checks if the value is strictly equal to one of the values in the given array.
- `populate`: Object, sets default [populate options](https://mongoosejs.com/docs/populate.html#query-conditions)

## Type

`type` is a special property in Mongoose schemas. When Mongoose finds a nested property named `type` in your schema, Mongoose assumes that it needs to define a SchemaType with the given type.

Naively, you might define your schema as shown below:

```javascript
const holdingSchema = new Schema({
  // You might expect `asset` to be an object that has 2 properties,
  // but unfortunately `type` is special in Mongoose so mongoose
  // interprets this schema to mean that `asset` is a string
  asset: {
    type: String,
    ticker: String,
  }
});
```

However, when Mongoose sees `type: String`, it assumes that you mean `asset` should be a string, not an object with a property `type`. The correct way to define an object with a property `type` is shown below.

```javascript
const holdingSchema = new Schema({
  asset: {
    // Workaround to make sure Mongoose knows `asset` is an object
    // and `asset.type` is a string, rather than thinking `asset`
    // is a string.
    type: { type: String },
    ticker: String,
  }
});
```



#### Example:

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    isOnSale: Boolean,
});

const bike = new Product({ price: 599 });
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log(`Error: ${err.errors.name.properties.message}`);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
Error: Path `name` is required.
```

You can see that because of the `required` SchemaType option being set to `true` it's required to fill in name.

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    isOnSale: Boolean,
});

const bike = new Product({ name: 'Fast', price: 'NO!' });
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log(`Error: ${err.errors.name.properties.message}`);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```js
% node product.js
TypeError: Cannot read properties of undefined (reading 'properties')
```

So, it was unable to convert `price` to a number, but it tried. If we use number within strings it can be coverted into a number.

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    isOnSale: Boolean,
});

const bike = new Product({name: 'Fast', price: '117'});
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
IT WORKED!
{
  name: 'Fast',
  price: 117,
  _id: new ObjectId("6189d360cde8e179fddfeedf"),
  __v: 0
}
```

Now you can see that it coverted `price` to a number even though we provided a string with numbers it it. What would have if we added another property that wasn't in the Schema?

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    isOnSale: Boolean,
});

const bike = new Product({name: 'Fast', price: '117', color: 'red'});
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
IT WORKED!
{
  name: 'Fast',
  price: 117,
  _id: new ObjectId("6189d4339764a557013b68be"),
  __v: 0
}
```

You can here that is ignored the `color` property that wasn't in the Schema. Also, `isOnSale` isn't included and doesn't have to be incuded because the `required` SchemaType option is set to `false` by default. 

## Default

`default`: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
  	categories: {
      type: [String],
      default: ['Bike'],
    },
});

const bike = new Product({name: 'Fast'});
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
IT WORKED!
{
  name: 'Fast',
  price: 0,
  isOnSale: false,
  categories: ['Bike'],
  _id: new ObjectId("618a4c5494b60c46bedbe714"),
  __v: 0
}
```



## Number.min

`min`: Number, creates a [validator](https://mongoosejs.com/docs/validation.html) that checks if the value is greater than or equal to the given minimum.

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
  	categories: {
      type: [String],
      default: ['Bike'],
    },
});

const bike = new Product({name: 'Fast', price: -19});
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
Error: ValidationError: price: Path `price` (-19) is less than minimum allowed value (0).
```

You can see here that it won't allow me to set `price` to -19 cause the `min` is set to 0.



### Validating Mongoose Updates

The way Mongoose is set up when you update, a document won't apply validations that are used by default when creating a document with validations. To be able to use the validations of the Schema use the `runValidators` options in `findOneAndUpdate()` and set it to `true`.

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
  	categories: {
      type: [String],
      default: ['Bike'],
    },
});

const bike = new Product({name: 'Tire Pump', price: 19.50});
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

Make sure you create a Tire Pump product inorder to test this.



```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
  	categories: {
      type: [String],
      default: ['Bike'],
    },
});

Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -20}, {new: true})
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
{
  _id: new ObjectId("618a53dc6b6bd3a385e893f7"),
  name: 'Tire Pump',
  price: -20,
  isOnSale: false,
  categories: [ 'Bike' ],
  __v: 0
}
```

You can see that it didn't yell at use for have the price be lower than the `min` option. So, lets use `runValidators` and set it to true.

```js
const mongoose = require('mongoose');

main();

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
  	categories: {
      type: [String],
      default: ['Bike'],
    },
});

Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -20}, {new: true, runValidators: true})
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}
```

```shell
% node product.js
price: ValidatorError: Path `price` (-20) is less than minimum allowed value (0).
```

