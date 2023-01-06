import url from "node:url";
import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import { users } from "../data/index.js";
import { API_REGEX, ID_REGEX } from "../constants.js";

export function getHandler (req, res) {
    const { pathname } = url.parse(req.url);
    const match = pathname.match(API_REGEX);

    if (!match) {
        return errorHandler(res, 404);
    }

    const [id, ...other] = match[1]?.match(ID_REGEX) ?? [];

    if (other.length) {
        return errorHandler(res, 400);
    }

    if (id) {
        const uuid = id.slice(1);
        if (users.has(uuid)) {
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            return res.end(JSON.stringify(users.get(uuid)));
        } else {
            return errorHandler(res, 404);
        }
    }

    const data = JSON.stringify(Array.from(users.values()));
    
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    return res.end(data);
}

function errorHandler (res, code) {
    res.statusCode = code;
    res.end(`<h1>${code}</h1><h2>${http.STATUS_CODES[code]}</h2>`);
}