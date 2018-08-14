const dbName = 'NowOrder';
const colName = 'orders';

module.exports = async (fastify, option, next) => {

    fastify.get('/api', async (req, res) => {
        const col = fastify.mongo.client.db(dbName).collection(colName);
        const data = await col.find({}).toArray();
        res.send(data);
    })
      
}