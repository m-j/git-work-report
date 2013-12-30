var report_generator = require('./report-generator.js')
var config = require('./config.js')
var fs = require('fs')

console.log(config.getReportPath())

process.on('exit', function() {
    console.log('Report generated and saved to:\n\t' + config.getReportPath());
});

config.repos.forEach(function(repoPath){

    report_generator.generate(
        repoPath,
        config.dateSpan,
        function(reportContents){
//            console.log('Contents of lenght: ' + reportContents.length)
            fs.appendFileSync(config.getReportPath(), reportContents, {encoding : 'utf-8', flags: 'w'})
        }
    )
})

