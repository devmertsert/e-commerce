import mongoose from "mongoose";

export default (db: string) => {
  const connect = () => {
    mongoose.set('useCreateIndex', true)
    
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.log(`Successfully connected to mongodb`);
      })
      .catch(error => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnected", connect);
};