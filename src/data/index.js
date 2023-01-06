import crypto from "node:crypto";

export const users = new Map();

[
    { username: "test_name1", age: 20, hobbies: ["games", "movies"] },    
    { username: "test_name3", age: 28, hobbies: ["books", "flowers"] },
    { username: "test_name4", age: 16, hobbies: ["chess", "football"] },
    { username: "test_name2", age: 30, hobbies: ["swimming", "travel"] },
].forEach(user => {
    const uuid = crypto.randomUUID();
    users.set(uuid, { id: uuid, ...user });
})