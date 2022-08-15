// require module fileSytem dan readLine
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Input your name \n>_ ', (data) => {
    
    var nama = data;
    rl.question('Please, input your age \n>_ ', (data) => {
        
        let check = data>=18?'1':'0';
        var umur = data; 
        switch(check){
             case '0':
                console.log("Your're  not allowed ");
                break;
             case '1':
                console.log("Your're allowed ");
                break;
            default:
                console.log("check didn't success");
        }

        var dataJson = [{
            name: nama,
            age : umur,
        }];
        // menuliskan string ke file json (asynchronous)
        fs.writeFile('./data/menuliskan.json', JSON.stringify(dataJson, null, 2), (err) => {
            if(err) throw err;
            console.log(`Data success saved`);
            console.table(dataJson);
        });
        

        rl.close();
    })
});
