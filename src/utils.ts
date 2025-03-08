import crypto from "node:crypto";
import * as uuid from "uuid";

export function randomHex(n: number): string {
    return crypto.randomBytes(n).toString("hex");
}

export function hashedPassword(password: string): string {
    const salt = randomHex(16);
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
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
    return uuid.v4();
}

export function now(): string {
    const datetime = new Date();

    const y = datetime.getUTCFullYear();
    const m = String(datetime.getUTCMonth()).padStart(2, "0");
    const d = String(datetime.getUTCDate()).padStart(2, "0");
    const h = String(datetime.getUTCHours()).padStart(2, "0");
    const i = String(datetime.getUTCMinutes()).padStart(2, "0");
    const s = String(datetime.getUTCSeconds()).padStart(2, "0");

    return `${y}-${m}-${d} ${h}:${i}:${s}`;
}
