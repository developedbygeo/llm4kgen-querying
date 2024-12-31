export const NEO4J_QUERIES = {
    GET_ALL_LABELS: 'CALL db.labels() YIELD label RETURN label',
    GET_ALL_RELATIONSHIPS:
        'CALL db.relationshipTypes() YIELD relationshipType RETURN relationshipType',
    GET_ALL_PROPERTIES:
        'CALL db.propertyKeys() YIELD propertyKey RETURN propertyKey',
} as const;
