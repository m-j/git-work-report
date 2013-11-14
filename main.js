var report_generator = require('./report-generator.js')
var config = require('./config.js')

console.log('aaaa')

config.repos.forEach(function(repoPath){

    report_generator.generate(
        repoPath,
        {from: '1.11.2013', to: '30.11.2013'},
        function(reportContents){
            console.log('------------------')
            console.log(reportContents);
        }
    )
})

