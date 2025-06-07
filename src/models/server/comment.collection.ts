import { IndexType, Permission } from "node-appwrite";

import { answerCollection, commentCollection, db } from "../name";

import { databases } from "./config"
export default async function createCommmentCollection() {
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Comment collection created")

    // creating attributes indexes

    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),
        databases.createStringAttribute(db, commentCollection, "authorId", 50, true),
        databases.createStringAttribute(db, commentCollection, "typeId", 50, true),

    ])
    console.log("Answer collection attributes created");

    // create index

    // await Promise.all([
    //     databases.createIndex(db, commentCollection, "title", IndexType.Fulltext, ['title'], ['asc']),
    //     databases.createIndex(db, commentCollection, "content", IndexType.Fulltext, ['content'], ['asc']),
    // ])
}
