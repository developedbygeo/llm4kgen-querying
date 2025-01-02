export const replaceDoubleQuotesWithSingleQuotes = (input: string): string => {
    return input.replace(/["]/g, "'");
};

export const sanitizeEscapedAndDoubleQuotes = (output: string): string => {
    return output
        .replace(/\\\\"/g, "'") // Convert escaped quotes to single quotes
        .replace(/\\"/g, "'") // Handle improperly escaped quotes
        .replace(/"{2}/g, "'"); // Replace double double quotes with single quotes
};
