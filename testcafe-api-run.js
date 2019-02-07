const testCafe = require('testcafe');
const fs = require('fs');

const stream = fs.createWriteStream('report.html');

function runTest(tcOptions) {
  // implementeer je testrun via de TestCafe API
  testCafe('localhost', 8080, 8081)
    .then(function (tc) {
      let runner = tc.createRunner();
      return runner
        .src(['tests/final_todo.test.js'])
        .browsers('chrome')
        .concurrency(1)
        .reporter('html', stream)
        .screenshots('reports/screenshots', true)
        .run(tcOptions)
        .catch(function (error) {
          console.log(error);
        });
    })
    .then( () =>  {
      stream.end();
      process.exit(0);
    });
}

const tcOptions = {
  // Hier kun je TestCafe Options aanmaken
};

runTest(tcOptions);