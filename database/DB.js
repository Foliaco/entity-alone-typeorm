const {createConnection}=require('mysql2');

async function Connection(data){
        if(data.database==='' && data.database===undefined){
            throw new Error('Falta El nombre de la base de datos')
        }
        let con =await createConnection({
            host:data.host,
            port:data.port||3306,
            database:data.database,
            user:data.username,
            password:data.password||''
        })
        con.connect(err=>{
            if(err){
                console.log(err)
                return err
            }
        })
        return con;
}
module.exports=Connection;
