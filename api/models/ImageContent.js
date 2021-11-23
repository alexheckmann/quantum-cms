module.exports = {
    attributes: {
        version: { type: 'string', columnType: 'varchar(80)'/* TODO zusammengesetzter PK */},
        status: { type: 'string', columnType: 'varchar(80)' },
        title: { type: 'string', columnType: 'varchar(80)' },
        content: { type: 'string', columnType: 'varchar(80)' /* TODO spezieller Datentyp */},
        endpoint: { type: 'string', columnType: 'varchar(80)' },
    },
};