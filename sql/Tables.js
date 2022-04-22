const fs=require('fs');
const path=require('path');
const { GenericEntity, GenericColumn } = require('../code/Entity');
const Connection = require("../database/DB")
const getTable=async(config,ruta)=>{
    console.log(__dirname)
    try{
        let con=await Connection({host:config.host,database:config.database,username:config.username,password:config.password,port:config.port})
        let res=await con.promise().query(`SHOW FULL TABLES FROM ${config.database}`);
        let tables=res[0];
        if(!fs.existsSync(path.join(__dirname,`./${ruta}/Entitys`))){
            fs.mkdirSync(path.join(__dirname,`./${ruta}/Entitys`))
        }
        console.log('Creando la carpeta Entity en '+path.join(__dirname,ruta))
        tables.forEach(async(e)=>{
            let tab=e[`Tables_in_${config.database}`]
            let table=tab.charAt(0).toUpperCase() + tab.slice(1);

            try{

                
                let columns= await getColumn(tab,config);
                let pathFile=path.join(__dirname,`${ruta}/Entitys/E${table}.ts`)
                fs.writeFileSync(pathFile,GenericEntity({table,columns}));
                console.log(`Se genero la entidad E${table}`)
            }
            catch(errFile){
                console.log(errFile)
                throw new Error(`Error al generar la Entidad E${table}`)
            }
             
            
        })

    }
    catch(err){
        console.log('Error en generacion')
        console.log(err)
        return
    }
}

const getColumn=async(table,config)=>{

    try{
        let con=await Connection({host:config.host,database:config.database,username:config.username,password:config.password,port:config.port})
        let res=await con.promise().query(`SHOW COLUMNS FROM ${table}`);
        let columns=res[0];
        let columnSQL=''
        columns.forEach(column=>{
            let Field=column.Field.charAt(0).toUpperCase() + column.Field.slice(1);
            column.Field=Field;
            
            columnSQL+=GenericColumn(column)
        })
        return columnSQL;
    }
    catch(err){
            console.log('Error en generacion de columnas')
            console.log(err)
            return '//Error:Vuelva a ejectuar el cli'
    }
}
module.exports={getTable,getColumn}