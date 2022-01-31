const fs = require('fs');

const filePath = './db/data.json';

const guardarDatos = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

const leerDatos = () => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const info = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(info);
  return data;
}

module.exports = {
  guardarDatos,
  leerDatos
}
