import { DynamicTool, tool } from '@langchain/core/tools';
import { z } from 'zod';
import { llm } from '../llm';
import { fetchGraphMetadata } from '../../modules/fetchGraphMetadata';
import {
    replaceDoubleQuotesWithSingleQuotes,
    sanitizeEscapedAndDoubleQuotes,
} from '../../utils/string';
import { TOOL_NAMES } from '../../enums/tools';

export const translateToCypherTool = new DynamicTool({
    name: TOOL_NAMES.TRANSLATE_TO_CYPHER,
    description: `Translates natural language queries into Cypher queries. Use this tool when the user asks a question about the graph in plain language, or when the user's query requires generating a Cypher query based on the graph schema.`,
    func: async (input: string) => {
        const sanitizedInput = replaceDoubleQuotesWithSingleQuotes(input);
        const metadata = await fetchGraphMetadata();

        const prompt = `
      The graph schema includes the following information:
      - Node labels: ${metadata.labels.join(', ')}
      - Relationship types: ${metadata.relationships.join(', ')}
      - Property keys: ${metadata.properties.join(', ')}

      Translate the following natural language query into a Cypher query, only by using the graph schema:
      "${sanitizedInput} . Only return the cypher query, without any additional text or quotes"
    `;

        const response = await llm.invoke(prompt);
        return sanitizeEscapedAndDoubleQuotes(response.content as string);
    },
});
