import { DynamicTool } from 'langchain/tools';
import { fetchRelationships } from '../../../modules/databaseCharacteristics';
import { Neo4jConnection } from '../../../db';
import config from '../../../config';
import { TOOL_NAMES } from '../../../enums/tools';

export const listRelationshipsTool = new DynamicTool({
    name: TOOL_NAMES.LIST_RELATIONSHIPS,
    description: `Use this tool to retrieve all relationship types in the knowledge graph. Call this tool when the user asks about relationships in the graph, such as "What relationships exist?" or "List all relationships." Input: None. Output: A comma-separated list of relationship types, or a message indicating no relationships are found.`,
    func: async () => {
        const conn = Neo4jConnection.getInstance(
            config.secrets.DB_URL,
            config.secrets.DB_USER,
            config.secrets.DB_PASSWORD
        );
        const relationships = await fetchRelationships(conn);
        console.log(relationships);
        return relationships.length
            ? relationships.join(', ')
            : 'No relationships found in the knowledge graph.';
    },
});
