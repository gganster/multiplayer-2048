import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import config from "../config";

let app = getApps().length === 0 ? initializeApp(config.firebase) : getApps()[0];
const db = getDatabase();

export {db};
export default app;