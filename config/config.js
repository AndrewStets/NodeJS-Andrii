module.exports = {
    PORT: process.env.PORT || 5000,
    DB_PASSWORD: process.env.DB_PASSWORD || '5678876',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test-project',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWorld',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secrtRefreshWorld',
};