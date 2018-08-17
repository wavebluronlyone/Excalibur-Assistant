export const find = async (app, dbname, collectionName, filter = {}) => {
    const col = app.mongo.client.db(dbname).collection(collectionName);
    const data = await col.find(filter).toArray();

    
    return data;
};

export const create = async (app, dbname, collectionName, data) => {
    const col = app.mongo.client.db(dbname).collection(collectionName);
    const now = new Date();
    const rawData = data;
    const insertData = {
      ...rawData,
      create_at: now,
    };
    const result = await col.insert(insertData);
    return result;
};

