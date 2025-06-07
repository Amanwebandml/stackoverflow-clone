import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommmentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.get(db);
        console.log("database connected");

    } catch (error) {
        try {
            await databases.create(db, db);
            console.log("database created");
            // create collections
            await Promise.all([
                await createQuestionCollection(),
                await createAnswerCollection(),
                await createCommmentCollection(),
                await createVoteCollection()
            ])
            console.log("collections created");
            console.log("Database connected");


        } catch (error) {
            console.log("Error creating database or collections:", error);
        }
    }
    return databases
}