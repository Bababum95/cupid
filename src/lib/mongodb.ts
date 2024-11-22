// import mongoose, { ConnectOptions } from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;

// type MongooseCache = {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// };

// declare global {
//   // eslint-disable-next-line no-var
//   var mongoose: MongooseCache | undefined;
// }

// let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// if (!cached) {
//   cached = { conn: null, promise: null };
//   global.mongoose = cached;
// }

// async function dbConnect() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       } as ConnectOptions)
//       .then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;
