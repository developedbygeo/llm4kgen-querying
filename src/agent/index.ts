import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';

import { llm } from './llm';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { DATABASE_RELATED_TOOLS } from './tools/schema';
import { queryNeo4jTool } from './tools/queryNeo4j';
import { translateToCypherTool } from './tools/translateToCypher';
import { logger } from '../modules/logger';

const createAgentRunnable = async () => {
    const prompt = ChatPromptTemplate.fromMessages([
        [
            'system',
            'You are a specialized assistant for question (type). You have access to the following tools:  (tools). The tool names you can use are: (tool_names).',
        ],
        ['human', '{input}'],
        ['placeholder', '{agent_scratchpad}'],
    ]);

    return createToolCallingAgent({
        llm,
        tools: [
            ...DATABASE_RELATED_TOOLS,
            queryNeo4jTool,
            translateToCypherTool,
        ],
        prompt,
    });
};

export const createAgent = async () => {
    logger.info('Starting the agent creation process.');
    const agentRunnable = await createAgentRunnable();

    return new AgentExecutor({
        agent: agentRunnable,
        tools: [
            ...DATABASE_RELATED_TOOLS,
            queryNeo4jTool,
            translateToCypherTool,
        ],
        // verbose: true,
        returnIntermediateSteps: true,
        handleParsingErrors: true,
    });
};
