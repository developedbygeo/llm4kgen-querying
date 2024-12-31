import config from '../config';
import { Neo4jConnection } from '../db';

export const fetchGraphMetadata = async () => {
    console.log('Fetching graph metadata...');
    const conn = Neo4jConnection.getInstance(
        config.secrets.DB_URL,
        config.secrets.DB_USER,
        config.secrets.DB_PASSWORD
    );
    const labels = await conn.runQuery(
        'CALL db.labels() YIELD label RETURN label'
    );
    const relationships = await conn.runQuery(
        'CALL db.relationshipTypes() YIELD relationshipType RETURN relationshipType'
    );
    const properties = await conn.runQuery(
        'CALL db.propertyKeys() YIELD propertyKey RETURN propertyKey'
    );

    await conn.close();

    return {
        labels: labels.map((record) => record.label),
        relationships: relationships.map((record) => record.relationshipType),
        properties: properties.map((record) => record.propertyKey),
    };
};
