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

export function postHandler (req, res) {
    const { pathname } = url.parse(req.url);
    const match = pathname.match(API_REGEX);

    if (!match) {
        return errorHandler(res, 404)
    }

    const [...other] = match[1]?.match(ID_REGEX) ?? [];

    if (other.length) {
        return errorHandler(res, 400);
    }

    const buffers = [];

    req
        .on('data', chunk => buffers.push(chunk))
        .on('end', () => {
            const buffer = Buffer.concat(buffers);
            const uuid = crypto.randomUUID();

            users.set(uuid, { ...JSON.parse(buffer.toString()), id: uuid });

            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.end(`{"message": "User ${uuid} has added"}`);
        })
}

export function deleteHandler (req, res) {
    const { pathname } = url.parse(req.url);
    const match = pathname.match(API_REGEX);

    if (!match) {
        return errorHandler(res, 404)
    }

    const [id, ...other] = match[1]?.match(ID_REGEX) ?? [];
    
    if (other.length) {
        return errorHandler(res, 400);
    }

    if (!id) {
        return errorHandler(res, 400);
    }

    const uuid = id.slice(1);

    if (!users.has(uuid)) {
        return errorHandler(res, 400);
    }

    users.delete(uuid);

    console.log(users);
    
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(`{"message": "User ${uuid} has deleted"}`);
}

function errorHandler (res, code) {
    res.statusCode = code;
    res.end(`<h1>${code}</h1><h2>${http.STATUS_CODES[code]}</h2>`);
}