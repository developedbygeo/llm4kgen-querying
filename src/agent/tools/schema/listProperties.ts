import { DynamicTool } from 'langchain/tools';
import { Neo4jConnection } from '../../../db';
import config from '../../../config';
import { fetchProperties } from '../../../modules/databaseCharacteristics';
import { TOOL_NAMES } from '../../../enums/tools';

export const listPropertiesTool = new DynamicTool({
    name: TOOL_NAMES.LIST_PROPERTIES,
    description: `Use this tool to retrieve all property keys in the knowledge graph. 
    Call this tool when the user asks about properties in the graph, such as "What properties exist?" or "List all property keys."
    Input: None.
    Output: A comma-separated list of property keys, or a message indicating no properties are found.`,
    func: async () => {
        const conn = Neo4jConnection.getInstance(
            config.secrets.DB_URL,
            config.secrets.DB_USER,
            config.secrets.DB_PASSWORD
        );
        const properties = await fetchProperties(conn);
        return properties.length
            ? properties.join(', ')
            : 'No properties found in the knowledge graph.';
    },
});
