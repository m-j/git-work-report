var report_generator = require('./report-generator.js')
var config = require('./config.js')
var fs = require('fs')

console.log(config.getReportPath())

config.repos.forEach(function(repoPath){

    report_generator.generate(
        repoPath,
        config.dateSpan,
        function(reportContents){
            console.log('------------------')
            console.log(reportContents);

            fs.appendFileSync(config.getReportPath(), reportContents, {encoding : 'utf-8', flags: 'w'})
        }
    )
})

