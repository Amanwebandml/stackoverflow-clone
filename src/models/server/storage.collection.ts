import { Permission } from "node-appwrite";

import { questionAttachmentBucket } from "../name";

import { storage } from "./config"

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("stroage connected");

    } catch (error) {
        try {
            await storage.createBucket(
                questionAttachmentBucket,
                questionAttachmentBucket,
                [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.update("users"),
                    Permission.delete("users"),
                    Permission.read("users"),

                ],
                false,
                undefined,
                undefined,
                ["jpg", "png", "gif", "jpeg", "webp", "heic"],

            );
            console.log("storage created");
            console.log("Storage connected");

        } catch (error) {
            console.log("Error creating storage:", error);
        }
    }
}