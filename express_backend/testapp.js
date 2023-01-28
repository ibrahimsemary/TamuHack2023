
const oracledb = require('oracledb');
const config = {
    user: 'admin',
    password: 'TAMUHack2023',
    connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-phoenix-1.oraclecloud.com))(connect_data=(service_name=g0f3a6371b27c34_kc73yy3i79cfa1jv_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'
}

async function testFunction() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        const result = await conn.execute("SELECT * FROM profiles");
        console.log(result.rows)
    } catch (err) {
        console.log('error', err)
    } finally {
        if(conn) await conn.close();
    }
}

testFunction()