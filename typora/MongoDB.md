### What is Mongo?

Our First Database! According to Mongo's homepage, it is "the most popular database for modern applications". It is commonly used in combination with Node.

Mongo is a document database, which we can use to store and retrieve complex data from.

### Why use a database?

Instead of just saving to a file?

- Databases can handle large amounts of data efficiently and store it compactly
- They provide tools for easy insertion, querying, and updating of data
- They generally offer security features and control over access to data
- They (generally) scale well.
- 


### SQL VS NoSQL

There are really two broad categories for databases, SQL databases and NoSQL databases

#### SQL Databases

Structured Query Langauge databases are relational databases. We pre-define a schema of tables before we insert anything. 

##### Popular SQL Databases

- MySQL
- Postgres
- SQLite
- Oracle
- Microsoft SQL Server

SQL define tables predefined ahead of time before it does anything. Then SQL relate different tables together, often by referencing information from one table to another. 

Everything has to conform to a pattern. 

### POSTS

| id   | author | text      |
| :--- | ------ | --------- |
| 1    | colt   | blah blah |
| 2    | tyra   | hahahah   |
| 3    | jeeves | papapapa  |

So, I'm structuring my data for a SQL database and I want comments to relate to an individual blog post. The SQL way is to make a new table and relate it with what post they are commenting on.

### COMMENTS

| id   | text                     | post_id |
| ---- | ------------------------ | ------- |
| 1    | omg I love it!           | 3       |
| 2    | This is so funny         | 3       |
| 3    | this is not funny at all | 2       |
| 4    | please stop              | 2       |
| 5    | Ughhh                    | 2       |

SQL is a relational database, it works that we define these tables with posts, comments, tags, tweets, and whatever. We then connect them by referencing one another, often instead of different tables. So, every comment here is supposed to be assocaited with some post. The SQL way of relating the comments to the post is by having a `post_id` (or whatever you call it) that references a particular post. 



#### NoSQL Databases

NoSQL databases do not use SQL. There are many types of no-sql databases, including documents, key-value, and graph stores. NoSQL databases are newer. 

##### Popular NoSQL Databases

- MongoDB
- Couch DB
- Neo4j
- Cassandra
- Redis

NoSQL Databases don't use a structured query langauge. Instead they use things like document data stores, key value, even other tpyes of databases that don't use SQL. 

### Document-oriented database

Just store information in some format like JSON or XML. 

```json
[
  {
    "id": 1,
    "author": "Colt",
    "text": "papopopa",
    "comments": [
      "ok",
      "Lol that's good",
      "I need money",
    ]
  },
  {
    "id": 2,
    "author": "Tom",
    "text": "Ready?",
    "sdgsdgsdg": "asdsajs"
  },
]
```



### Why Learn Mongo

- Mongo is a very commonly used with Node and Express (MEAN & MERN stacks)
- It's easy to get started with (though it can be tricky to truly master)
- It plays particularly well with JavaScript
- It's popularity also means there is a strong community of developers using Mongo.

### The Mongo Shell

The Mongo Shell is just a JavaScript shell so, you can type JavaScript code in it. 

### db

Database, which is a variable that exist in the shell, is the database you will be using by default.

```shell
> db
test
```



### show

`show dbs` will show the databases names. `show databases` will also give you the same result. 

```shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> show databases
admin   0.000GB
config  0.000GB
local   0.000GB
```



### use

You can use the command `use` to create a new database and switch to existing databases. By default if you use the `use` command and it doesn't find a database with that name it will create one and switch the current database to the newly created one.

```shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use animalShelter
switched to db animalShelter
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db
animalShelter
```

Why is `animalShelter` not showing up? Mongo is going to wait until you insert acutal data to show it, but you can see that we are currently using the `animalShelter` database by using the `db` command. Mongo won't save the database if there is not acutal data in it. So, if you were to exit Mongo, ctrl + c, `animalShelter` or whatever database you create won't exist. 



### What is BSON?

Well JSON, JavaScript Object Notation, has quotes all over our keys value pairs. It has arrays,  strings, numbers, booleans, objects. JSON allows us to represent realatively complicated objects and nested structures. 

```json
{
  "_id": 1,
  "name" : { "first" : "John", "last" : "Backus" },
  "contribs" : [ "Fortran", "ALGOL", "Backus-Naur Form", "FP" ],
  "awards" : [
    {
      "award" : "W.W. McDowell Award",
      "year" : 1967,
      "by" : "IEEE Computer Society"
    }, {
      "award" : "Draper Prize",
      "year" : 1993,
      "by" : "National Academy of Engineering"
    }
  ]
}
```

JSON shows up in many different cases:

- APIs

- Configuration files

- Log messages

- Database storage

  

  However, there are several issues that make JSON less than ideal for usage inside of a database.

  1. JSON is a text-based format, and text parsing is very slow
  2. JSON’s readable format is far from space-efficient, another database concern
  3. JSON only supports a limited number of basic data types

  In order to make MongoDB JSON-first, but still high-performance and general-purpose, BSON was invented to bridge the gap: a binary representation to store data in JSON format, optimized for speed, space, and flexibility. It’s not dissimilar from other interchange formats like protocol buffers, or thrift, in terms of approach.



### BSON

BSON simply stand for 'Binary JSON'. Since its initial formulation, BSON has been extended to add some optional non-JSON-native data types, like dates and binary data, without which MongoDB would have been missing some valuable support.

Languages that support any kind of complex mathematics typically have different sized integers (ints vs longs) or various levels of decimal precision (float, double, decimal128, etc.).

Not only is it helpful to be able to represent those distinctions in data stored in MongoDB, it also allows for comparisons and calculations to happen directly on data in ways that simplify consuming application code.

### Does MongoDB use BSON, or JSON?

MongoDB stores data in BSON format both internally, and over the network, but that doesn’t mean you can’t think of MongoDB as a JSON database. Anything you can represent in JSON can be natively stored in MongoDB, and retrieved just as easily in JSON.

The following are some example documents (in JavaScript / Python style syntax) and their corresponding BSON representations.

```json
{"hello": "world"} →
\x16\x00\x00\x00           // total document size
\x02                       // 0x02 = type String
hello\x00                  // field name
\x06\x00\x00\x00world\x00  // field value
\x00                       // 0x00 = type EOO ('end of object')
```



## CRUD With MongoDB

### Data Types Of BSON

| Type                       | Number | Alias                 | Notes                      |
| :------------------------- | :----- | :-------------------- | :------------------------- |
| Double                     | 1      | "double"              |                            |
| String                     | 2      | "string"              |                            |
| Object                     | 3      | "object"              |                            |
| Array                      | 4      | "array"               |                            |
| Binary data                | 5      | "binData"             |                            |
| Undefined                  | 6      | "undefined"           | Deprecated.                |
| ObjectId                   | 7      | "objectId"            |                            |
| Boolean                    | 8      | "bool"                |                            |
| Date                       | 9      | "date"                |                            |
| Null                       | 10     | "null"                |                            |
| Regular Expression         | 11     | "regex"               |                            |
| DBPointer                  | 12     | "dbPointer"           | Deprecated.                |
| JavaScript                 | 13     | "javascript"          |                            |
| Symbol                     | 14     | "symbol"              | Deprecated.                |
| JavaScript code with scope | 15     | "javascriptWithScope" | Deprecated in MongoDB 4.4. |
| 32-bit integer             | 16     | "int"                 |                            |
| Timestamp                  | 17     | "timestamp"           |                            |
| 64-bit integer             | 18     | "long"                |                            |
| Decimal128                 | 19     | "decimal"             | New in version 3.4.        |
| Min key                    | -1     | "minKey"              |                            |
| Max key                    | 127    | "maxKey"              |                            |



### Inserting With Mongo

#### Databases

In MongoDB, databases hold one or more collections of documents. To select a database to use, in [`mongosh`](https://docs.mongodb.com/mongodb-shell/#mongodb-binary-bin.mongosh), issue the `use <db>` statement, as in the following example:

```shell
> use myDB
```

#### Create a Database

If a database does not exist, MongoDB creates the database when you first store data for that database. As such, you can switch to a non-existent database and perform the following operation in [`mongosh`](https://docs.mongodb.com/mongodb-shell/#mongodb-binary-bin.mongosh):

```shell
> use myNewDB
switched to db myNewDB
> db.myNewCollection1.insertOne( { x: 1 } );
```

The [`insertOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne) operation creates both the database `myNewDB` and the collection `myNewCollection1` if they do not already exist. Be sure that both the database and collection names follow MongoDB [Naming Restrictions](https://docs.mongodb.com/manual/reference/limits/#std-label-restrictions-on-db-names).

#### Collections

MongoDB stores documents in collections. Collections are analogous to tables in relational databases.

![A collection of MongoDB documents.](https://docs.mongodb.com/manual/images/crud-annotated-collection.bakedsvg.svg)

click to enlarge

### Create a Collection

If a collection does not exist, MongoDB creates the collection when you first store data for that collection.

```shell
> db.myNewCollection2.insertOne( { x: 1 } )
> db.myNewCollection3.createIndex( { y: 1 } )
```

Both the [`insertOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne) and the [`createIndex()`](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#mongodb-method-db.collection.createIndex) methods create their respective collection if they do not already exist. Be sure that the collection name follows MongoDB [Naming Restrictions](https://docs.mongodb.com/manual/reference/limits/#std-label-restrictions-on-db-names).

#### db.collection.insert()

```shell
> db.dogs.insert({name: 'Wyatt', breed: "Golden", age: 14});
WriteResult({ "nInserted" : 1 })

> db.cats.insert([{name: 'Blue Steele', breed: 'Black', age: 10}, {name: 'Ginger', breed: 'Ginger', age: 7}]);
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 2,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

If the collection does not exist, then the [`insert()`](https://docs.mongodb.com/manual/reference/method/db.collection.insert/#mongodb-method-db.collection.insert) method will create the collection.

  #####  `_id` Field

If the document does not specify an [_id](https://docs.mongodb.com/manual/reference/glossary/#std-term-_id) field, then MongoDB will add the `_id` field and assign a unique [`ObjectId()`](https://docs.mongodb.com/manual/reference/method/ObjectId/#mongodb-method-ObjectId) for the document before inserting. Most drivers create an ObjectId and insert the `_id` field, but the [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod) will create and populate the `_id` if the driver or application does not.

If the document contains an `_id` field, the `_id` value must be unique within the collection to avoid duplicate key error.



#### db.collection.find(query, projection)

| Parameter                                                    | Type     | Description                                                  |
| :----------------------------------------------------------- | :------- | :----------------------------------------------------------- |
| `query`                                                      | document | Optional. Specifies selection filter using [query operators](https://docs.mongodb.com/manual/reference/operator/). To return all documents in a collection, omit this parameter or pass an empty document (`{}`). |
| [projection](https://docs.mongodb.com/manual/reference/method/db.collection.find/#std-label-method-find-projection) | document | Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see [Projection](https://docs.mongodb.com/manual/reference/method/db.collection.find/#std-label-find-projection). |

cursor: A pointer to the result set of a [query](https://docs.mongodb.com/manual/reference/glossary/#std-term-query). Clients can iterate through a cursor to retrieve results. By default, cursors not opened within a session automatically timeout after 10 minutes of inactivity. Cursors opened under a session close with the end or timeout of the session. See [Iterate a Cursor in `mongosh`](https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/#std-label-read-operations-cursors).

Returns: A [cursor](https://docs.mongodb.com/manual/reference/glossary/#std-term-cursor) to the documents that match the `query` criteria. When the [`find()`](https://docs.mongodb.com/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method "returns documents," the method is actually returning a cursor to the documents.



```shell
> db.cats.find()
{ "_id" : ObjectId("61803071f4dfbebfacc14f11"), "name" : "Blue Steele", "breed" : "black", "age" : 10 }
{ "_id" : ObjectId("61803071f4dfbebfacc14f12"), "name" : "Ginger", "breed" : "Ginger", "age" : 7 }
```

There is two documents with the `cats` collection. If you use `.find()` with no arugments, it reads the whole collection for you, but you can add some criteria that will find based upon it, this optional parameter is called `query`. 

```shell
> db.cats.find({breed: 'Ginger'});
{ "_id" : ObjectId("61803071f4dfbebfacc14f11"), "name" : "Blue Steele", "breed" : "Ginger", "age" : 10 }
{ "_id" : ObjectId("61803071f4dfbebfacc14f12"), "name" : "Ginger", "breed" : "Ginger", "age" : 7 }
> db.cats.find({breed: 'Ginger', age: 10});
{ "_id" : ObjectId("61803071f4dfbebfacc14f11"), "name" : "Blue Steele", "breed" : "Ginger", "age" : 10 }
```

When using `.find()`, be aware that it is case-sensitive.

##### db.collection.findOne()

Returns one document that satisfies the specified query criteria on the collection or [view](https://docs.mongodb.com/manual/core/views/). If multiple documents satisfy the query, this method returns the first document according to the [natural order](https://docs.mongodb.com/manual/reference/glossary/#std-term-natural-order) which reflects the order of documents on the disk. In [capped collections](https://docs.mongodb.com/manual/reference/glossary/#std-term-capped-collection), natural order is the same as insertion order. If no document satisfies the query, the method returns null.



#### db.collection.updateOne(filter, update, options)

##### Parameter

The [`db.collection.updateOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne) method takes the following parameters:

| Parameter                                                    | Type                 | Description                                                  |
| :----------------------------------------------------------- | :------------------- | :----------------------------------------------------------- |
| [filter](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-update-one-filter) | document             | The selection criteria for the update. The same [query selectors](https://docs.mongodb.com/manual/reference/operator/query/#std-label-query-selectors) as in the [`find()`](https://docs.mongodb.com/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method are available.Specify an empty document `{ }` to update the first document returned in the collection. |
| [update](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-update-one-update) | document or pipeline | The modifications to apply. Can be one of the following:[Update document](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-update-one-method-update-document)Contains only [update operator expressions](https://docs.mongodb.com/manual/reference/operator/update/#std-label-update-operators).For more information, see [Update with an Update Operator Expressions Document](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-updateOne-behavior-update-expressions) [Aggregation pipeline](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-update-one-method-agg-pipeline) (*Starting in MongoDB 4.2*)Contains only the following aggregation stages:[`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields) and its alias [`$set`](https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set)[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) and its alias [`$unset`](https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset)[`$replaceRoot`](https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/#mongodb-pipeline-pipe.-replaceRoot) and its alias [`$replaceWith`](https://docs.mongodb.com/manual/reference/operator/aggregation/replaceWith/#mongodb-pipeline-pipe.-replaceWith).For more information, see [Update with an Aggregation Pipeline](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-updateOne-behavior-aggregation-pipeline).To update with a replacement document, see [`db.collection.replaceOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#mongodb-method-db.collection.replaceOne). |
|                                                              |                      |                                                              |



##### Returns

The method returns a document that contains:

- `matchedCount` containing the number of matched documents
- `modifiedCount` containing the number of modified documents
- `upsertedId` containing the `_id` for the upserted document.
- A boolean `acknowledged` as `true` if the operation ran with [write concern](https://docs.mongodb.com/manual/reference/glossary/#std-term-write-concern) or `false` if write concern was disabled

##### Behavior

[`db.collection.updateOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne) finds the first document that matches the [filter](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-update-one-filter) and applies the specified [update](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-update-one-update) modifications.

For the [update specifications](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-update-one-update), the [`db.collection.updateOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne) method can accept a document that only contains [update operator](https://docs.mongodb.com/manual/reference/operator/update/#std-label-update-operators) expressions.

For example:

```shell
> db.collection.updateOne(
   <query>,
   { $set: { status: "D" }, $inc: { quantity: 2 } },
   ...
)
```

##### Upsert

If `upsert: true` and no documents match the `filter`, [`db.collection.updateOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne) creates a new document based on the `filter` criteria and `update` modifications. See [Update with Upsert](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-updateOne-example-update-with-upsert).

If you specify `upsert: true` on a sharded collection, you must include the full shard key in the [filter](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-update-one-filter). For additional [`db.collection.updateOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne) behavior on a sharded collection, see [Sharded Collections](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#std-label-updateOne-sharded-collection).

```shell
> db.cats.find({name: 'Ginger'});
{ "_id" : ObjectId("61803071f4dfbebfacc14f12"), "name" : "Ginger", "breed" : "Ginger", "age" : 7 }
> db.cats.updateOne({name: "Ginger"}, {$set: {age: 5}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.cats.find({name: 'Ginger'});
{ "_id" : ObjectId("61803071f4dfbebfacc14f12"), "name" : "Ginger", "breed" : "Ginger", "age" : 5 }
```

```shell
> db.cats.updateOne({name: 'Ginger'}, {$set: {age: 3}, $currentDate: {lastModified: true }});
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.cats.find({name: 'Ginger'});
{ "_id" : ObjectId("61803071f4dfbebfacc14f12"), "name" : "Ginger", "breed" : "Ginger", "age" : 3, "lastModified" : ISODate("2021-11-02T00:56:12.530Z") }
```



#### db.collection.updateMany(filter, update, options)

##### Behavior

[`updateMany()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany) updates all matching documents in the collection that match the `filter`, using the `update` criteria to apply modifications.

##### Upsert

If `upsert: true` and no documents match the `filter`, [`db.collection.updateMany()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany) creates a new document based on the `filter` and `update` parameters.

```shell
> db.humans.insert([{name: 'William', age: 20, breed: 'Human', relationship: false, skill: 'Programming'}, {name: 'Justin', age: 20, breed: 'Human', relationship: false, skill: 'Korean'}, {name: 'Aaron', age: 20, breed: 'Human', relationship: true, skill: 'Music'}, {name: 'Matt', age: 21, breed: 'Human', relationship: false, skill: 'Music'}, {name: 'Jared', age: 20, breed: 'Human', relationship: true, skill: 'Skateboard'}, {name: 'David', age: 20, breed: 'Human', relationship: true, skill: 'Board Games'}]);
```

```shell
> db.humans.updateMany({name: 'Dylan', age: 20, breed: 'Human'}, {$set: {skill: 'Game Master'}}, {upsert: true});
> db.humans.find()
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a6"), "name" : "William", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Programming" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a7"), "name" : "Justin", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Korean" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a8"), "name" : "Aaron", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Music" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a9"), "name" : "Matt", "age" : 21, "breed" : "Human", "relationship" : false, "skill" : "Music" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37aa"), "name" : "Jared", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Skateboard" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37ab"), "name" : "David", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Board Games" }
{ "_id" : ObjectId("61813000b83c4737b731c962"), "age" : 20, "breed" : "Human", "name" : "Dylan", "skill" : "Game Master" }
```



#### db.collection.replaceOne(filter, replacement, options)

Replaces a single document within the collection based on the filter.

| Parameter                                                    | Type     | Description                                                  |
| :----------------------------------------------------------- | :------- | :----------------------------------------------------------- |
| [filter](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#std-label-replace-one-filter) | document | The selection criteria for the update. The same [query selectors](https://docs.mongodb.com/manual/reference/operator/query/#std-label-query-selectors) as in the [`find()`](https://docs.mongodb.com/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method are available.Specify an empty document `{ }` to replace the first document returned in the collection. |
| `replacement`                                                | document | The replacement document.Cannot contain [update operators](https://docs.mongodb.com/manual/reference/operator/update/). |

##### Behavior

If `upsert: true` and no documents match the `filter`, [`db.collection.replaceOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#mongodb-method-db.collection.replaceOne) creates a new document based on the `replacement` document.

If you specify `upsert: true` on a sharded collection, you must include the full shard key in the `filter`. For additional [`db.collection.replaceOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#mongodb-method-db.collection.replaceOne) behavior on a sharded collection, see [Sharded Collections](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#std-label-replaceOne-sharded-collection).

See [Replace with Upsert](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#std-label-replaceOne-example-replace-with-upsert).

`replaceOne()` can be used to complelely replace the contents of a document while still keeping the ObjectId `_id` the same. 

```shell
> > db.humans.replaceOne(name: 'William', {});
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.humans.find()
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a6"), "name" : "William", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Programming" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a7"), "name" : "Richard", "age" : 10 }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a8"), "name" : "Aaron", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Music" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a9"), "name" : "Matt", "age" : 21, "breed" : "Human", "relationship" : false, "skill" : "Music" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37aa"), "name" : "Jared", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Skateboard" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37ab"), "name" : "David", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Board Games" }
{ "_id" : ObjectId("61813000b83c4737b731c962"), "age" : 20, "breed" : "Human", "name" : "Dylan", "skill" : "Game Master" }
```

You can see here that it grabbed the first name with 'William' set to it and gave it an entire new object with the same `_id` as it was. 



#### db.collection.deleteOne()

Removes a sing document from a collection.

| [filter](https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#std-label-deleteOne-filter) | document | Specifies deletion criteria using [query operators](https://docs.mongodb.com/manual/reference/operator/).Specify an empty document `{ }` to delete the first document returned in the collection. |
| ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| [writeConcern](https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#std-label-deleteOne-wc) | document | Optional. A document expressing the [write concern](https://docs.mongodb.com/manual/reference/write-concern/). Omit to use the default write concern.Do not explicitly set the write concern for the operation if run in a transaction. To use write concern with transactions, see [Transactions and Write Concern](https://docs.mongodb.com/manual/core/transactions/#std-label-transactions-write-concern). |

##### Behavior

###### Deletion Order

[`db.collection.deleteOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#mongodb-method-db.collection.deleteOne) deletes the first document that matches the filter. Use a field that is part of a [unique index](https://docs.mongodb.com/manual/reference/glossary/#std-term-unique-index) such as `_id` for precise deletions.

```shell
> db.humans.insert([{name: 'William', age: 20, breed: 'Human', relationship: false, skill: 'Programming'}, {name: 'Justin', age: 20, breed: 'Human', relationship: false, skill: 'Korean'}, {name: 'Aaron', age: 20, breed: 'Human', relationship: true, skill: 'Music'}, {name: 'Matt', age: 21, breed: 'Human', relationship: false, skill: 'Music'}, {name: 'Jared', age: 20, breed: 'Human', relationship: true, skill: 'Skateboard'}, {name: 'David', age: 20, breed: 'Human', relationship: true, skill: 'Board Games'}]);
```

```shell
> db.humans.deleteOne({name: 'Jared'});
{ "acknowledged" : true, "deletedCount" : 1 }
> db.humans.find()
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a6"), "name" : "William", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Programming" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a7"), "name" : "Richard", "age" : 10 }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a8"), "name" : "Aaron", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Music" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a9"), "name" : "Matt", "age" : 21, "breed" : "Human", "relationship" : false, "skill" : "Music" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37ab"), "name" : "David", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Board Games" }
{ "_id" : ObjectId("61813000b83c4737b731c962"), "age" : 20, "breed" : "Human", "name" : "Dylan", "skill" : "Game Master" }
```



#### db.collection.deleteMany()

Removes all documents that match the `filter` from a collection.

| Parameter                                                    | Type     | Description                                                  |
| :----------------------------------------------------------- | :------- | :----------------------------------------------------------- |
| [filter](https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/#std-label-deleteMany-filter) | document | Specifies deletion criteria using [query operators](https://docs.mongodb.com/manual/reference/operator/).To delete all documents in a collection, pass in an empty document (`{ }`). |
| [writeConcern](https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/#std-label-deleteMany-wc) | document | Optional. A document expressing the [write concern](https://docs.mongodb.com/manual/reference/write-concern/). Omit to use the default write concern.Do not explicitly set the write concern for the operation if run in a transaction. To use write concern with transactions, see [Transactions and Write Concern](https://docs.mongodb.com/manual/core/transactions/#std-label-transactions-write-concern). |

##### Behavior

[`db.collection.deleteMany()`](https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/#mongodb-method-db.collection.deleteMany) throws a `WriteError` exception if used on a [capped collection](https://docs.mongodb.com/manual/reference/glossary/#std-term-capped-collection). To remove all documents from a capped collection, use [`db.collection.drop()`](https://docs.mongodb.com/manual/reference/method/db.collection.drop/#mongodb-method-db.collection.drop).

```shell
> db.humans.insert([{name: 'William', age: 20, breed: 'Human', relationship: false, skill: 'Programming'}, {name: 'Justin', age: 20, breed: 'Human', relationship: false, skill: 'Korean'}, {name: 'Aaron', age: 20, breed: 'Human', relationship: true, skill: 'Music'}, {name: 'Matt', age: 21, breed: 'Human', relationship: false, skill: 'Music'}, {name: 'Jared', age: 20, breed: 'Human', relationship: true, skill: 'Skateboard'}, {name: 'David', age: 20, breed: 'Human', relationship: true, skill: 'Board Games'}]);
```

```shell
> db.humans.deleteMany({relationship: false});
{ "acknowledged" : true, "deletedCount" : 2 }
> db.humans.find()
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a7"), "name" : "Richard", "age" : 10 }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37a8"), "name" : "Aaron", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Music" }
{ "_id" : ObjectId("61812ff68cc9c9e7feec37ab"), "name" : "David", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Board Games" }
{ "_id" : ObjectId("61813000b83c4737b731c962"), "age" : 20, "breed" : "Human", "name" : "Dylan", "skill" : "Game Master" }
```

```shell
> db.humans.deleteMany({});
{ "acknowledged" : true, "deletedCount" : 4 }
> db.humans.find()
>
```

You can see that if you pass in an empty object with the `.deleteMany()` method, it will delete the whole entire collection. 

##### $set (aggregation)

Adds new fields to documents. `$set` outputs documents that contain all existing fields from the input documents and newly added fields. [`$set`](https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) appends new fields to existing documents. You can include one or more `$set` stages in an aggregation operation.

```shell
> { $set: { <newField>: <expression>, ... } }
```

#### $currentDate 

The `$currentDate` operator sets the value of a field to the current date, either as a Date or a timestamp. The default type is Date.

The `$currentDate` operator has the form:

```shell
> { $currentDate: { <field1>: <typeSpecification1>, ... } }
```

<typeSpecification> can be either:

a boolean true to set the field value to the current date as a Date, or
a document { $type: "timestamp" } or { $type: "date" } which explicitly specifies the type. The operator is case-sensitive and accepts only the lowercase "timestamp" or the lowercase "date".
To specify a <field> in an embedded document or in an array, use dot notation.



MongoDB provides the [`db.createCollection()`](https://docs.mongodb.com/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) method to explicitly create a collection with various options, such as setting the maximum size or the documentation validation rules. If you are not specifying these options, you do not need to explicitly create the collection since MongoDB creates new collections when you first store data for the collections.

To modify these collection options, see [`collMod`](https://docs.mongodb.com/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod).

#### show collections

`show collections` show the collection that are in the current db. Collections are just a group of similar data. 



### Addtional Operators

```shell
> db.humans.insert([{name: 'William', age: 20, breed: 'Human', relationship: false, skill: 'Programming', personality: { catFriendly: true, dogFriendly: false, childFriendly: false }}, {name: 'Justin', age: 20, breed: 'Human', relationship: false, skill: 'Korean', personality: { catFriendly: true, dogFriendly: true, childFriendly: false }}, {name: 'Aaron', age: 20, breed: 'Human', relationship: true, skill: 'Music', personality: { catFriendly: false, dogFriendly: true, childFriendly: false }}, {name: 'Matt', age: 21, breed: 'Human', relationship: false, skill: 'Music', personality: { catFriendly: true, dogFriendly: true, childFriendly: true }}, {name: 'Jared', age: 20, breed: 'Human', relationship: true, skill: 'Skateboard', personality: { catFriendly: false, dogFriendly: true, childFriendly: false }}, {name: 'David', age: 20, breed: 'Human', relationship: true, skill: 'Board Games', personality: { catFriendly: false, dogFriendly: false, childFriendly: false }}]);
```



#### Nested Property

```shell
> db.humans.find({'personality.catFriendly': true});
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ac"), "name" : "William", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Programming", "personality" : { "catFriendly" : true, "dogFriendly" : false, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ad"), "name" : "Justin", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Korean", "personality" : { "catFriendly" : true, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37af"), "name" : "Matt", "age" : 21, "breed" : "Human", "relationship" : false, "skill" : "Music", "personality" : { "catFriendly" : true, "dogFriendly" : true, "childFriendly" : true } }
```

If you have a nested property you must use quotes and the dot opertator to access the nested property. 



#### $gt

*Syntax*: `{field: {$gt: value} }`

[`$gt`](https://docs.mongodb.com/manual/reference/operator/query/gt/#mongodb-query-op.-gt) selects those documents where the value of the `field` is greater than (i.e. `>`) the specified `value`.

```shell
> db.humans.find({age: {$gt: 20}});
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37af"), "name" : "Matt", "age" : 21, "breed" : "Human", "relationship" : false, "skill" : "Music", "personality" : { "catFriendly" : true, "dogFriendly" : true, "childFriendly" : true } }
```



#### $gte

*Syntax*: `{field: {$gte: value} }`

[`$gte`](https://docs.mongodb.com/manual/reference/operator/query/gte/#mongodb-query-op.-gte) selects the documents where the value of the `field` is greater than or equal to (i.e. `>=`) a specified value (e.g. `value`.)

```shell
> db.humans.find({age: {$gte: 21}});
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37af"), "name" : "Matt", "age" : 21, "breed" : "Human", "relationship" : false, "skill" : "Music", "personality" : { "catFriendly" : true, "dogFriendly" : true, "childFriendly" : true } }
```



#### $lt

*Syntax*: `{field: {$lt: value} }`

[`$lt`](https://docs.mongodb.com/manual/reference/operator/query/lt/#mongodb-query-op.-lt) selects the documents where the value of the `field` is less than (i.e. `<`) the specified `value`.

```shell
> db.humans.find({age: {$lt: 21}});
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ac"), "name" : "William", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Programming", "personality" : { "catFriendly" : true, "dogFriendly" : false, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ad"), "name" : "Justin", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Korean", "personality" : { "catFriendly" : true, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ae"), "name" : "Aaron", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Music", "personality" : { "catFriendly" : false, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37b0"), "name" : "Jared", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Skateboard", "personality" : { "catFriendly" : false, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37b1"), "name" : "David", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Board Games", "personality" : { "catFriendly" : false, "dogFriendly" : false, "childFriendly" : false } }
```



#### $lte

*Syntax*: `{ field: { $lte: value} }`

[`$lte`](https://docs.mongodb.com/manual/reference/operator/query/lte/#mongodb-query-op.-lte) selects the documents where the value of the `field` is less than or equal to (i.e. `<=`) the specified `value`.

```shell
> db.humans.find({age: {$lte: 20}});
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ac"), "name" : "William", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Programming", "personality" : { "catFriendly" : true, "dogFriendly" : false, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ad"), "name" : "Justin", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Korean", "personality" : { "catFriendly" : true, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ae"), "name" : "Aaron", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Music", "personality" : { "catFriendly" : false, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37b0"), "name" : "Jared", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Skateboard", "personality" : { "catFriendly" : false, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37b1"), "name" : "David", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Board Games", "personality" : { "catFriendly" : false, "dogFriendly" : false, "childFriendly" : false } }
```



#### $in

The [`$in`](https://docs.mongodb.com/manual/reference/operator/query/in/#mongodb-query-op.-in) operator selects the documents where the value of a field equals any value in the specified array. To specify an [`$in`](https://docs.mongodb.com/manual/reference/operator/query/in/#mongodb-query-op.-in) expression, use the following prototype:

```shell
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
```

If the `field` holds an array, then the [`$in`](https://docs.mongodb.com/manual/reference/operator/query/in/#mongodb-query-op.-in) operator selects the documents whose `field` holds an array that contains at least one element that matches a value in the specified array (for example, `<value1>`, `<value2>`, and so on).

```shell
> db.humans.find({age: {$in: [20, 21]}});
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ac"), "name" : "William", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Programming", "personality" : { "catFriendly" : true, "dogFriendly" : false, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ad"), "name" : "Justin", "age" : 20, "breed" : "Human", "relationship" : false, "skill" : "Korean", "personality" : { "catFriendly" : true, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37ae"), "name" : "Aaron", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Music", "personality" : { "catFriendly" : false, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37af"), "name" : "Matt", "age" : 21, "breed" : "Human", "relationship" : false, "skill" : "Music", "personality" : { "catFriendly" : true, "dogFriendly" : true, "childFriendly" : true } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37b0"), "name" : "Jared", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Skateboard", "personality" : { "catFriendly" : false, "dogFriendly" : true, "childFriendly" : false } }
{ "_id" : ObjectId("6183a7ef8cc9c9e7feec37b1"), "name" : "David", "age" : 20, "breed" : "Human", "relationship" : true, "skill" : "Board Games", "personality" : { "catFriendly" : false, "dogFriendly" : false, "childFriendly" : false } }
```



