import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) {
    return db;
  }

  if (!client) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    client = new MongoClient(uri);
  }

  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }

  db = client.db('jobcy-data');
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
  }
}
