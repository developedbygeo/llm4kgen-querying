import { ChatOpenAI } from '@langchain/openai';
import { translateToCypherTool } from './tools/translateToCypher';
import { queryNeo4jTool } from './tools/queryNeo4j';
import { listRelationshipsTool } from './tools/listRelationships';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import config from '../config';

// export const llm = new ChatOpenAI({
//     model: 'gemma-2-27b-it:2',
//     apiKey: '1234567890',
//     temperature: 0,
//     configuration: {
//         baseURL: 'http://localhost:1234/v1',
//     },
// });

export const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash-exp',
    maxOutputTokens: 2048,
    apiKey: config.secrets.GOOGLE_API_KEY,
    temperature: 0.35,
});
