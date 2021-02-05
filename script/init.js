const path = require('path');
const execSync = require('child_process').execSync;
const {testDbConnect} = require('../server/config/db');

function exec(cmd) {
  execSync(cmd, {stdio: 'inherit', env: process.env});
}

testDbConnect().then(res => {
  if (res === false) {
    process.chdir(path.resolve(__dirname, '../server/db/init'));
    exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all')    
  } else {
    console.log('database already exists')
  }
});



