const mysql = require('mysql');
const fs = require('fs');
const { run } = require('node:test');

/* Estabelecendo conexão com o banco de dados */
var config =
{
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'targetty',
    port: 3306,
    ssl: {ca: fs.readFileSync("your_path_to_ca_cert_file_BaltimoreCyberTrustRoot.crt.pem")}
};

const conn = new mysql.createConnection(config);

/* Teste de Verificação da conexão com o banco de dados */
conn.connect(
    function (err) { 
        if (err) { 
            console.log("!!! ERRO !!! Não foi possivel conectar com o banco de dados ");
            throw err;
        }
        else {
            console.log("Conexão estabelecida.");
            readData();
        }
    });

/* Função READ */
function readData(){
    conn.query('SELECT * FROM inventory', 
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            console.log('Done.');
        })
    conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });
};

 run.connect();



