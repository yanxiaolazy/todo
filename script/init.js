const path = require('path');
const execSync = require('child_process').execSync;

function exec(cmd) {
  execSync(cmd, {stdio: 'inherit', env: process.env});
}

process.chdir(path.resolve(__dirname, '../server/db/init'));
exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all')

