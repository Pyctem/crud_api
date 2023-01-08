import http from "node:http";
import { deleteHandler, getHandler, postHandler, putHandler, errorHandler } from "./handlers/index.js";

export default http.createServer((req, res) => {
    try {
        if (req.method === 'GET') {
            return getHandler(req, res)
        } else if (req.method === 'PUT') {
            return putHandler(req, res)
        } else if (req.method === 'POST') {
            return postHandler(req, res)
        } else if (req.method === 'DELETE') {
            return deleteHandler(req, res)
        }
    } catch (e) {
        errorHandler(res, 500);
    }
});