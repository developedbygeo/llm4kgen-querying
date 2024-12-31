import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { Neo4jConnection } from '../../db';
import config from '../../config';

export const queryNeo4jTool = tool(
    async ({ input }: { input: string }) => {
        const conn = Neo4jConnection.getInstance(
            config.secrets.DB_URL,
            config.secrets.DB_USER,
            config.secrets.DB_PASSWORD
        );
        const results = await conn.runQuery(input);

        await conn.close();
        return JSON.stringify(results, null, 2);
    },
    {
        name: 'query_neo4j',
        description:
            'Executes Cypher queries against the Neo4j database and returns results.',
        schema: z.object({
            input: z.string(),
        }),
    }
);
