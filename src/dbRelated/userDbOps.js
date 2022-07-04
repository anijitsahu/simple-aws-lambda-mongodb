// local dependencies
import { sendResponse } from "../helpers/sendResponse.js";
import {
  createConnectionToDB,
  closeConnectionToDB,
  selectDB,
  convertToObjectId,
} from "../helpers/dbHelpers.js";

// redis dependencies
import {
  setValueToRedis,
  getValueFromRedis,
  connectRedis,
  closeConnectionToRedis,
} from "../helpers/redisHelpers.js";

// all the db related process variables
const { DB_NAME, COLLECTION_USER_STICKER, SUCCESS_CODE, ERROR_CODE } =
  process.env;

const getAllUsers = async () => {
  //  redis operations
  let usersInCache = [];
  try {
    connectRedis();
    usersInCache = await getValueFromRedis("allUsers");
    usersInCache = JSON.parse(usersInCache);
    if (usersInCache) {
      return sendResponse(SUCCESS_CODE, { usersInCache });
    }
  } catch (error) {
    return sendResponse(ERROR_CODE, {
      message: "Unable to get records from Redis",
      error: error.toString(),
    });
  } finally {
    closeConnectionToRedis();
  }

  const client = await createConnectionToDB();
  try {
    // select the db, Collections are selected based on needs
    const db = selectDB(client, DB_NAME);

    // query the collection for all users
    const data = await db
      .collection(COLLECTION_USER_STICKER)
      .find({})
      .toArray();

    const users = data.length > 0 ? [...data] : [];

    // save data to Redis cache
    await setValueToRedis("allUsers", users);
    const res = { users };

    return sendResponse(SUCCESS_CODE, res);
  } catch (error) {
    // console.error("Error occurred", error);
    return sendResponse(ERROR_CODE, {
      message: "Unable to get all records",
      error: error.toString(),
    });
  } finally {
    // close the connection to MongoDB Atlas
    closeConnectionToDB(client);
    closeConnectionToRedis();
  }
};

const addUserToDB = async (userToAdd) => {
  const client = await createConnectionToDB();
  try {
    // select the db, Collections are selected based on needs
    const db = selectDB(client, DB_NAME);

    // insert the user in the collection
    const res = await db
      .collection(COLLECTION_USER_STICKER)
      .insertOne(userToAdd);

    return sendResponse(SUCCESS_CODE, { ...userToAdd, _id: res.insertedId });
  } catch (error) {
    // console.error("Error occurred", error);
    return sendResponse(ERROR_CODE, {
      message: "Unable to insert the record",
      error: error.toString(),
    });
  } finally {
    // close the connection to MongoDB Atlas
    closeConnectionToDB(client);
  }
};

const deleteUserFromDB = async (recordId) => {
  const client = await createConnectionToDB();
  try {
    // select the db, Collections are selected based on needs
    const db = selectDB(client, DB_NAME);

    // delete the particurlar record from the collection
    const res = await db
      .collection(COLLECTION_USER_STICKER)
      .deleteOne({ _id: convertToObjectId(recordId) });

    return sendResponse(SUCCESS_CODE, { deletedCount: res.deletedCount });
  } catch (error) {
    return sendResponse(ERROR_CODE, {
      message: "Unable to delete the record",
      error: error.toString(),
    });
  } finally {
    // close the connection to MongoDB Atlas
    closeConnectionToDB(client);
  }
};

const updateUserToDB = async (updateId, updateDoc) => {
  const client = await createConnectionToDB();
  try {
    // select the db, Collections are selected based on needs
    const db = selectDB(client, DB_NAME);

    const filter = { _id: convertToObjectId(updateId) };
    // const options = { upsert: false };

    // update the record in the collection
    const res = await db
      .collection(COLLECTION_USER_STICKER)
      .updateOne(filter, { $set: { ...updateDoc } });

    return sendResponse(SUCCESS_CODE, { modifiedCount: res.modifiedCount });
  } catch (error) {
    console.error("Error occurred: ", error);
    return sendResponse(ERROR_CODE, {
      message: "Unable to update the record",
      error: error.toString(),
    });
  } finally {
    // close the connection to MongoDB Atlas
    closeConnectionToDB(client);
  }
};

export { getAllUsers, addUserToDB, deleteUserFromDB, updateUserToDB };
