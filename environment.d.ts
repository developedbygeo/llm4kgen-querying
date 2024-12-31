declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            DB_USER: string;
            DB_PWD: string;
            LLM_URL: string;
            OPEN_API_KEY: string;
            GOOGLE_API_KEY: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
