import { Neo4jConnection } from '../db';
import { NEO4J_QUERIES } from '../enums/queries';
import {
    DatabaseLabel,
    DatabaseProperty,
    DatabaseRelationship,
} from '../types/databaseSchema';

export const fetchRelationships = async (
    conn: Neo4jConnection
): Promise<string[]> => {
    const results = (await conn.runQuery(
        NEO4J_QUERIES.GET_ALL_RELATIONSHIPS
    )) as DatabaseRelationship[];
    return results.map((row: DatabaseRelationship) => row.relationshipType);
};

export const fetchProperties = async (
    conn: Neo4jConnection
): Promise<string[]> => {
    const results = (await conn.runQuery(
        NEO4J_QUERIES.GET_ALL_PROPERTIES
    )) as DatabaseProperty[];
    return results.map((row: DatabaseProperty) => row.propertyKey);
};

export const fetchLabels = async (conn: Neo4jConnection): Promise<string[]> => {
    const results = (await conn.runQuery(
        NEO4J_QUERIES.GET_ALL_LABELS
    )) as DatabaseLabel[];
    return results.map((row: DatabaseLabel) => row.label);
};
