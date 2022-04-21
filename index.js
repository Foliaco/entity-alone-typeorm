const { getTable } = require('./sql/Tables');

async function main(){
    let arr=process.argv[process.argv.length-1].split('%');
    //host database username password port
    
    let host=arr[0];
    let database=arr[1];
    let username=arr[2];
    let password=arr[3]==='null'?'':arr[3];
    let port=arr[4];
    let ruta=process.argv[process.argv.length-2];

    
    let config={host:host,database:database,username:username,password:password,port};
    
    console.log("--------------------------------------");
    console.log("\n-   Al terminar presione CRL + C     -\n");
    console.log("--------------------------------------");

    await getTable(config,ruta)



}
main();
