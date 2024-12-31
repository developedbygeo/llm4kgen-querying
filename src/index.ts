import { Neo4jConnection } from './db';
import { createAgent } from './agent';
import { rl } from './modules/readline';
import config from './config';

async function main() {
    // initialize singleton connection class
    const conn = new Neo4jConnection(
        config.secrets.DB_URL,
        config.secrets.DB_USER,
        config.secrets.DB_PASSWORD
    );
    const agent = await createAgent();

    console.log('Welcome to the Knowledge Graph CLI!');
    console.log("Ask a question or type 'exit' to quit:");

    rl.on('line', async (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            process.exit(0);
        }

        try {
            const result = await agent.invoke({
                input,
            });

            console.log('Response:\n', result);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error?.message);
            }
        }
    });
}

main();
