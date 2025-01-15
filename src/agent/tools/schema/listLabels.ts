import { DynamicTool } from 'langchain/tools';
import { Neo4jConnection } from '../../../db';
import config from '../../../config';
import { fetchLabels } from '../../../modules/databaseCharacteristics';
import { TOOL_NAMES } from '../../../enums/tools';

export const listLabelsTool = new DynamicTool({
    name: TOOL_NAMES.LIST_LABELS,
    description: `Use this tool to retrieve all labels in the knowledge graph. 
    Call this tool when the user asks about labels in the graph, such as "What labels exist?" or "List all node labels."
    Input: None.
    Output: A comma-separated list of labels, or a message indicating no labels are found.`,
    func: async () => {
        const conn = Neo4jConnection.getInstance(
            config.secrets.DB_URL,
            config.secrets.DB_USER,
            config.secrets.DB_PASSWORD
        );
        const labels = await fetchLabels(conn);
        return labels.length
            ? labels.join(', ')
            : 'No labels found in the knowledge graph.';
    },
});
