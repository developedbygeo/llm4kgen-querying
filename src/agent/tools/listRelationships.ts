import { DynamicTool } from '@langchain/core/tools';
import { fetchGraphMetadata } from '../../modules/fetchGraphMetadata';

export const listRelationshipsTool = new DynamicTool({
    name: 'list_relationships',
    description: 'Lists all available relationship types in graph',
    func: async () => {
        console.log('Invoking fetchGraphMetadata...');

        const metadata = await fetchGraphMetadata();

        if (
            !metadata ||
            !metadata.relationships ||
            metadata.relationships.length === 0
        ) {
            return 'No relationships found in the Neo4j Knowledge Graph.';
        }

        return metadata.relationships.join(', ');
    },
});
