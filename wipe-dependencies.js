const fs = require('fs');

const wipeDependencies = function() {
  let file = fs.readFileSync('package.json');
  let content = JSON.parse(file);


  for (let devDep in content.devDependencies) {
    if (content.devDependencies.hasOwnProperty(devDep)) {
      content.devDependencies[devDep] = '*';
    }
  }

  for (let dep in content.dependencies) {
    if (content.dependencies.hasOwnProperty(dep)) {
      content.dependencies[dep] = '*';
    }
  }

  fs.writeFileSync('package.json', JSON.stringify(content));
};

if (require.main === module) {
  wipeDependencies();
} else {
  module.exports = wipeDependencies;
}
