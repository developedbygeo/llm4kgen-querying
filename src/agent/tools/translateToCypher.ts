import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { llm } from '../llm';
import { fetchGraphMetadata } from '../../modules/fetchGraphMetadata';

export const translateToCypherTool = tool(
    async ({ input }: { input: string }) => {
        const metadata = await fetchGraphMetadata();

        const prompt = `
      The graph schema includes the following information:
      - Node labels: ${metadata.labels.join(', ')}
      - Relationship types: ${metadata.relationships.join(', ')}
      - Property keys: ${metadata.properties.join(', ')}

      Translate the following natural language query into a Cypher query:
      "${input}"
    `;

        const response = await llm.invoke(prompt);
        console.log(response);
        return response.content;
    },
    {
        name: 'translate_to_cypher',
        description: 'Translates natural language queries into Cypher queries.',
        schema: z.object({
            input: z.string(),
        }),
    }
);
