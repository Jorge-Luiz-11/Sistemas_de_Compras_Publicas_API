require('dotenv/config');

const config = {
    mongodb: {
        url: process.env.dbURI,
        databaseName: process.env.dbNAME,

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },

    migrationsDir: './src/migrations',

    changelogCollectionName: 'test_changelog',

    migrationFileExtension: '.ts',

    useFileHash: false,

    moduleSystem: 'commonjs',
};

module.exports = config;
