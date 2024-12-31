import dotenv from 'dotenv';

dotenv.config();
import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.STAGE || 'local';

let envConfig;

if (stage === 'production') {
    envConfig = require('./prod').default;
} else if (stage === 'staging') {
    envConfig = require('./staging').default;
} else {
    envConfig = require('./local').default;
}

export default merge(
    {
        stage,
        environment: process.env.NODE_ENV,
        port: 3000,
        secrets: {
            DB_URL: process.env.DB_URL as string,
            DB_USER: process.env.DB_USER as string,
            DB_PASSWORD: process.env.DB_PWD as string,
            LLM_URL: process.env.LLM_URL as string,
            OPEN_API_KEY: process.env.OPEN_API_KEY as string,
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string,
        },
    },
    envConfig
);
