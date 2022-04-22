#!/usr/bin/env node
const { getTable } = require('./sql/Tables');

async function main(){
    let arr=process.argv[process.argv.length-1].split('%');
    //host database username password port 
    //npm start src localhost%vigilia_domicilios%root%null%3306
    let ruta=process.argv[process.argv.length-2];
    let host=arr[0];
    let database=arr[1];
    let username=arr[2];
    let password=arr[3]==='null'?'':arr[3];
    let port=arr[4];
    console.log(ruta)
    
    let config={host:host,database:database,username:username,password:password,port};
    console.log(config)
    console.log("--------------------------------------");
    console.log("\n-   Al terminar presione CRL + C     -\n");
    console.log("--------------------------------------");

    await getTable(config,ruta)



}
main();