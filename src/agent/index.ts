import {
    AgentAction,
    AgentExecutor,
    AgentFinish,
    AgentRunnableSequence,
    createToolCallingAgent,
} from 'langchain/agents';

import { llm } from './llm';
import { ToolsAgentStep } from 'langchain/agents/openai/output_parser';
import { listRelationshipsTool } from './tools/listRelationships';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const createAgentRunnable = async (): Promise<
    AgentRunnableSequence<
        {
            steps: ToolsAgentStep[];
        },
        AgentFinish | AgentAction[]
    >
> => {
    const prompt = ChatPromptTemplate.fromMessages([
        ['system', 'You are a specialized assistant for question (type).'],
        ['assistant', '{input}'],
        ['placeholder', '{agent_scratchpad}'],
    ]);

    return createToolCallingAgent({
        llm,
        tools: [listRelationshipsTool],
        prompt,
    });
};

export const createAgent = async () => {
    const agentRunnable = await createAgentRunnable();

    return new AgentExecutor({
        agent: agentRunnable,
        tools: [listRelationshipsTool],
        verbose: true,
    });
};
