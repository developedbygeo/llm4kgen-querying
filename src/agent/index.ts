import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';

import { llm } from './llm';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { DATABASE_RELATED_TOOLS } from './tools/schema';
import { queryNeo4jTool } from './tools/queryNeo4j';
import { translateToCypherTool } from './tools/translateToCypher';

const createAgentRunnable = async () => {
    const prompt = ChatPromptTemplate.fromMessages([
        [
            'system',
            'You are a specialized assistant for question (type). You have access to the following tools:  (tools). The tool names you can use are: (tool_names).',
        ],
        ['human', '{input}'],
        ['placeholder', '{agent_scratchpad}'],
    ]);

    // const prompt = await pull<PromptTemplate>('hwchase17/react');

    // const prompt = ChatPromptTemplate.fromMessages([
    //     [
    //         'system',
    //         `
    // 1. **list_relationships**: Use this tool to retrieve all relationship types in the knowledge graph. Call this tool for queries about relationships.

    // 2. **list_properties**: Use this tool to retrieve all property keys in the knowledge graph. Call this tool for queries about properties.

    // 3. **list_labels**: Use this tool to retrieve all node labels in the knowledge graph. Call this tool for queries about labels.

    // 4. **translate_to_cypher**: Use this tool to translate natural language queries into Cypher queries. Call this tool when the user asks about the graph in plain language, e.g., "Find all people older than 30."

    // 5. **query_neo4j**: Use this tool to execute Cypher queries directly or handle queries that do not match the other tools.

    // RULES:
    // - Always call the most specific tool based on the user’s query.
    // - If the user’s query is in natural language and requires Cypher generation, use "translate_to_cypher."
    // - If the user provides a direct Cypher query or no other tools apply, use "query_neo4j."
    // - Respond only with the tool's output, without adding additional text.

    // Examples:
    // - User Input: "List all relationships in the graph."
    //   Tool Action: Call "list_relationships".
    //   Final Response: "HAS_NATIONALITY, HAS_GENDER, BELONGS_TO_DEPARTMENT."

    // - User Input: "Find all people older than 30."
    //   Tool Action: Call "translate_to_cypher" with input: "Find all people older than 30."
    //   Final Response: "MATCH (p:Person) WHERE p.age > 30 RETURN p."

    // - User Input: "MATCH (n:Product) RETURN n."
    //   Tool Action: Call "query_neo4j" with input: "MATCH (n:Product) RETURN n."
    //   Final Response: (Query results in JSON format)
    //         `,
    //     ],
    //     ['human', '{input}'],
    //     ['placeholder', '{agent_scratchpad}'],
    // ]);

    // const prompt = ChatPromptTemplate.fromMessages([
    //     [
    //         'system',
    //         `
    // 1. **list_relationships**: Use this tool to retrieve all relationship types in the knowledge graph. Call this tool for queries about relationships.

    // 2. **list_properties**: Use this tool to retrieve all property keys in the knowledge graph. Call this tool for queries about properties.

    // 3. **list_labels**: Use this tool to retrieve all node labels in the knowledge graph. Call this tool for queries about labels.

    // 4. **query_neo4j**: Use this tool to execute Cypher queries directly or handle queries that do not match the other tools.

    // RULES:
    // - Always call the most specific tool based on the user’s query.
    // - If the user provides a direct Cypher query or no other tools apply, use "query_neo4j."
    // - Respond only with the tool's output, without adding additional text.
    // - If the input is a Cypher query, directly execute it using query_neo4j and return the result.
    // - Avoid calling additional tools like list_labels, list_relationships, or list_properties unless explicitly requested by the user.
    // - Do not perform additional queries unless explicitly instructed in the input.
    // - Always return the output from query_neo4j directly without any modifications or further actions.

    // Examples:
    // - User Input: "List all relationships in the graph."
    //   Tool Action: Call "list_relationships".
    //   Final Response: "HAS_NATIONALITY, HAS_GENDER, BELONGS_TO_DEPARTMENT."

    // - User Input: "Find all people older than 30."
    //   Tool Action: Call "translate_to_cypher" with input: "Find all people older than 30."
    //   Final Response: "MATCH (p:Person) WHERE p.age > 30 RETURN p."

    // - User Input: "MATCH (n:Product) RETURN n."
    //   Tool Action: Call "query_neo4j" with input: "MATCH (n:Product) RETURN n."
    //   Final Response: (Query results in JSON format)
    //         `,
    //     ],
    //     ['human', '{input}'],
    //     ['placeholder', '{agent_scratchpad}'],
    // ]);

    return createToolCallingAgent({
        llm,
        tools: [
            ...DATABASE_RELATED_TOOLS,
            queryNeo4jTool,
            translateToCypherTool,
        ],
        prompt,
    });

    // return createReactAgent({
    //     llm,
    //     tools: [
    //         ...DATABASE_RELATED_TOOLS,
    //         queryNeo4jTool,
    //         // translateToCypherTool,
    //     ],
    //     prompt,
    // });
};

export const createAgent = async () => {
    const agentRunnable = await createAgentRunnable();

    return new AgentExecutor({
        agent: agentRunnable,
        tools: [
            ...DATABASE_RELATED_TOOLS,
            queryNeo4jTool,
            translateToCypherTool,
        ],
        verbose: true,
        handleParsingErrors: true,
    });
};
