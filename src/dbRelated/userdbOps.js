// local dependencies
import { sendResponse } from "../helpers/sendResponse.js";
import { dbClient } from "../lib/mongoClient.js";
import {
  createConnectionToDB,
  closeConnectionToDB,
} from "../helpers/dbHelpers.js";

// top level await to connect the MongoDB Atlas
// const client = await dbClient.connect();

// all the db related process variables
const {
  URI_TO_CONNECT_MONGODB,
  DB_NAME,
  COLLECTION_USER_STICKER,
  SUCCESS,
  SERVER_ERR,
  SUCCESS_CODE,
  ERROR_CODE,
} = process.env;

const getAllUsers = async () => {
  const client = await createConnectionToDB();
  try {
    // select the db, Collections are selected based on needs
    const db = client.db(DB_NAME);

    // query the collection for all users
    const data = await db
      .collection(COLLECTION_USER_STICKER)
      .find({})
      .toArray();

    const users = data.length > 0 ? [...data] : [];
    const res = { users };

    return sendResponse(SUCCESS_CODE, res);
  } catch (error) {
    // console.error("Error occurred", error);
    return sendResponse(ERROR_CODE, { error });
  } finally {
    // close the connection to MongoDB Atlas
    closeConnectionToDB(client);
  }
};

const addUserToDB = async () => {
  const client = await createConnectionToDB();
  try {
    // select the db, Collections are selected based on needs
    const db = client.db(DB_NAME);

    // query the collection for all users
    const data = await db
      .collection(COLLECTION_USER_STICKER)
      .find({})
      .toArray();

    const users = data.length > 0 ? [...data] : [];
    const res = { users };

    return sendResponse(SUCCESS_CODE, res);
  } catch (error) {
    // console.error("Error occurred", error);
    return sendResponse(ERROR_CODE, { error });
  } finally {
    // close the connection to MongoDB Atlas
    closeConnectionToDB(client);
  }
};

const deleteUserFromDB = async () => {
  const client = await createConnectionToDB();
  try {
    // select the db, Collections are selected based on needs
    const db = client.db(DB_NAME);

    // query the collection for all users
    const data = await db
      .collection(COLLECTION_USER_STICKER)
      .find({})
      .toArray();

    const users = data.length > 0 ? [...data] : [];
    const res = { users };

    return sendResponse(SUCCESS_CODE, res);
  } catch (error) {
    // console.error("Error occurred", error);
    return sendResponse(ERROR_CODE, { error });
  } finally {
    // close the connection to MongoDB Atlas
    closeConnectionToDB(client);
  }
};

const updateUserToDB = async () => {
  const client = await createConnectionToDB();
  try {
    // select the db, Collections are selected based on needs
    const db = client.db(DB_NAME);

    // query the collection for all users
    const data = await db
      .collection(COLLECTION_USER_STICKER)
      .find({})
      .toArray();

    const users = data.length > 0 ? [...data] : [];
    const res = { users };

    return sendResponse(SUCCESS_CODE, res);
  } catch (error) {
    // console.error("Error occurred", error);
    return sendResponse(ERROR_CODE, { error });
  } finally {
    // close the connection to MongoDB Atlas
    closeConnectionToDB(client);
  }
};

export { getAllUsers, addUserToDB, deleteUserFromDB, updateUserToDB };
