import crypto from "node:crypto";

export const users = new Map();

[
    { username: "test_name 1", age: 20, hobbies: ["games", "movies"] },
    { username: "test_name 2", age: 23, hobbies: ["books", "flowers"] },
    { username: "test_name 3", age: 18, hobbies: ["chess", "football"] },
    { username: "test_name 4", age: 31, hobbies: ["swimming", "travel"] },
].forEach(user => {
    const uuid = crypto.randomUUID();
    users.set(uuid, { id: uuid, ...user });
})