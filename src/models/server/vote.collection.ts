import { IndexType, Permission } from "node-appwrite";

import { db, voteCollection } from "../name";

import { databases } from "./config"
export default async function createVoteCollection() {
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("vote collection created");

    // creating attributes indexes

    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
        databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvote", "downvote"], true),
        databases.createStringAttribute(db, voteCollection, "voteById", 50, true),
    ])
    console.log("vote collection attributes created");

    // create index

    // await Promise.all([
    //     databases.createIndex(db, voteCollection, "title", IndexType.Fulltext, ['title'], ['asc']),
    //     databases.createIndex(db, voteCollection, "content", IndexType.Fulltext, ['content'], ['asc']),
    // ])
}
