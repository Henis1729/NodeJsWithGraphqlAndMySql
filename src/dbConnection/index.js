import { getConnectionDB, getPool } from "./getConnection";

const connectDB = async () => {
  getPool()
    .then((pool) => {
      console.log("Database connection successful");
      return pool;
    })
    .catch((err) => {
      console.log("err", err);
    });
};
export { connectDB };
