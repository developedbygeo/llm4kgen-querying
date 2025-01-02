import { DynamicTool } from '@langchain/core/tools';
import { Neo4jConnection } from '../../db';
import config from '../../config';

export const queryNeo4jTool = new DynamicTool({
    name: 'query_neo4j',
    description: `
        Executes Cypher queries against the Neo4j database and returns results.
    `,
    func: async (input: string) => {
        const conn = Neo4jConnection.getInstance(
            config.secrets.DB_URL,
            config.secrets.DB_USER,
            config.secrets.DB_PASSWORD
        );

        const results = await conn.runQuery(input);
        return JSON.stringify(results);
    },
});
