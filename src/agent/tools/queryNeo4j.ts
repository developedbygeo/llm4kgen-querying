import { DynamicTool } from '@langchain/core/tools';
import { Neo4jConnection } from '../../db';
import config from '../../config';
import { TOOL_NAMES } from '../../enums/tools';

export const queryNeo4jTool = new DynamicTool({
    name: TOOL_NAMES.QUERY_NEO4J,
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
