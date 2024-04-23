
import { Account , Client, Databases } from 'appwrite';

const client = new Client();
client
.setEndpoint(import.meta.env.VITE_APPWRITE_URL)
.setProject(import.meta.env.VITE_APPWRITE_ID)

const account = new Account(client);
export const database = new Databases(client)

export default account;

