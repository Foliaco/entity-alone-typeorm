const GenericEntity=data=>{

return `import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("${data.table}")
export class E${data.table}{

${data.columns}
}
`
}
const GenericColumn=data=>{
    let formater=data.Type.split('(');
    let type=formater[0];
    switch(data.Key){
        case 'PRI':
            return`    @PrimaryGeneratedColumn()
    ${data.Field}:${typesColumn(type)};

`
        case '':
            return`    @Column(${data.Null==='NO'?'{nullable:false}':null})
    ${data.Field}:${typesColumn(type)};

`
    }
}

const typesColumn=_type=>{
    let type=_type.toLowerCase();
    switch(type){
        case 'boolean':
        case 'bit':
            return 'boolean';
        
        
        case 'int':
        case 'tinyint':
        case 'smallint':
        case 'mediumint':
        case 'bigint':
        case 'float':
        case 'double':
        case 'xreal':
        case 'decimal':
        case 'dec':
        case 'Numeric':
            return 'number';

        case 'text':
            return 'string';

        case 'varchar':
        case 'char':
        case 'tinytext':
        case 'tinyblob':
        case 'blob':
        case 'mediumblob':
        case 'mediumtext':
            return 'string';

        case 'timestamp':
        case 'date':
        case 'datetime':
        case 'time':
        case 'year':
            return 'Date'
    }
}

module.exports={GenericEntity,GenericColumn}