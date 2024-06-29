
async function showTables(id) {
    await axios.get(`http://localhost:3030/tables/${id}`)
    .then(function (response) {
        document.getElementById('Tables').innerHTML = '';
        let tablesfront = document.getElementById('Tables').innerHTML
        let data = response.data
        const tableNames = data.map(item => item.TABLE_NAME);
        const tables =  response.data
        for (let i = 0; i < tables.length; i++) {
            tablesfront += `<a id="${i}" >${tableNames[i]}</a>`
        }

        document.getElementById('Tables').innerHTML = tablesfront
    })
    .catch(function (error) {
        console.error('Erro na requisição:', error);
    })
    
}






async function getDatabases ()  {
    axios.get('http://localhost:3030')
    .then(function (response) {
        const database = response.data.result
        let databasefront = document.getElementById('Databases').innerHTML

        for (let i = 0; i < database.length; i++) {
            databasefront += `<a onclick="showTables(${i})"id="${i}">${database[i]}</a>`

        }
        document.getElementById('Databases').innerHTML = databasefront


    })
    .catch(function (error) {
        console.error('Erro na requisição:', error);
    })
    };





window.showTables = showTables;

getDatabases()