import crypto from "node:crypto";
import * as uuid from "uuid";

export function randomHex(n: number): string {
    console.time("randomHex");
    const result: string = crypto.randomBytes(n).toString("hex");
    console.timeEnd("randomHex");
    console.log(result);
    return result;
}

export function hashedPassword(password: string): string {
    const salt = randomHex(16);
    console.time("crypto.scryptSync");
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    console.timeEnd("crypto.scryptSync");
    console.log(password, salt, hash);
    return `${salt}-${hash}`;
}

export function passwordsMatch(
    proof: string,
    salt: string,
    hash: string
): boolean {
    const proofHash = crypto.scryptSync(proof, salt, 64).toString("hex");

    return crypto.timingSafeEqual(
        Buffer.from(proofHash, "hex"),
        Buffer.from(hash, "hex")
    );
}

export function uuidv4(): string {
    console.time("uuid:v4");
    const result = uuid.v4();
    console.timeEnd("uuid:v4");
    console.log("uuid:v4: " + result);
    return result;
}

export function now(): string {
    const datetime = new Date();

    const y = datetime.getUTCFullYear();
    const m = String(datetime.getUTCMonth()).padStart(2, "0");
    const d = String(datetime.getUTCDate()).padStart(2, "0");
    const h = String(datetime.getUTCHours()).padStart(2, "0");
    const i = String(datetime.getUTCMinutes()).padStart(2, "0");
    const s = String(datetime.getUTCSeconds()).padStart(2, "0");

    const result = `${y}-${m}-${d} ${h}:${i}:${s}`;

    console.log("now: " + result);
    return result;
}

export function newSessionKey(): string {
    return randomHex(128);
}
