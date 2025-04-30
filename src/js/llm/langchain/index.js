import { model } from "./src/model.js";

const messages = [{ role: "user", content: "write a poem on javascript" }];

const res = await model.invoke(messages);

console.log(res.content);
