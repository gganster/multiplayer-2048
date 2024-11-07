import { initializeApp, getApps } from "firebase/app";
import config from "../config";

let app = getApps().length === 0 ? initializeApp(config.firebase) : getApps()[0];

export default app;