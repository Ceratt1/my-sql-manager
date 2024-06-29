async function showElements (db, table) {
    let databaseList = [];
    const databaseLinks = document.getElementById('Databases').getElementsByTagName('a');
    for (let i = 0; i < databaseLinks.length; i++) {
        databaseList.push(databaseLinks[i].innerHTML);
    }

    await axios.get(`http://localhost:3030/elements/${databaseList[db]}/${table}`)
    .then(function (response) {
        const data = response.data
        document.getElementById('Elements').innerHTML = '';
        let elements = document.getElementById('Elements').innerHTML

        for (let i = 0; i < data.length; i++) {
            elements += data[i].nome + "<br>"
        }
        elements += `</tbody></table>`
        document.getElementById('Elements').innerHTML = elements
        
        
    })
    .catch(function (error) {
        console.error('Erro na requisição:', error);
    })
    
}








async function showTables(id) {

    await axios.get(`http://localhost:3030/tables/${id}`)
    .then(function (response) {
        document.getElementById('Tables').innerHTML = '';
        let tablesfront = document.getElementById('Tables').innerHTML
        let data = response.data
        const tableNames = data.map(item => item.TABLE_NAME);
        const tables =  response.data
        for (let i = 0; i < tables.length; i++) {
            tablesfront += `<a onclick="showElements('${i}', '${tableNames[i]}')" id="${i}" >${tableNames[i]}</a>`
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
window.showElements = showElements;
getDatabases()