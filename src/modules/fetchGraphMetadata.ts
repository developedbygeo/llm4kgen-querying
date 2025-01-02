import config from '../config';
import { Neo4jConnection } from '../db';
import {
    fetchLabels,
    fetchProperties,
    fetchRelationships,
} from './databaseCharacteristics';

export const fetchGraphMetadata = async () => {
    const conn = Neo4jConnection.getInstance(
        config.secrets.DB_URL,
        config.secrets.DB_USER,
        config.secrets.DB_PASSWORD
    );

    console.log('Fetching graph metadata...');

    const [relationships, properties, labels] = await Promise.all([
        fetchRelationships(conn),
        fetchProperties(conn),
        fetchLabels(conn),
    ]);

    return {
        labels,
        relationships,
        properties,
    };
};
