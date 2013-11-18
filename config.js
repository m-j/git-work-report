var path = require('path')

module.exports = {
    repos : [
        '/Users/mjamiolkowski/Work/defra/_capdRepo/capd-frontends'
        ,'/Users/mjamiolkowski/Work/defra/_capdRepo/capd-services'
        , '/Users/mjamiolkowski/Work/Other/Projects/git-work-report-test-repo'
    ],
    dateSpan : {
        from : '1.11.2013',
        to: '30.11.2013'
    },
    reportsDir : './reports',
    getReportPath : function(){
        var reportName = 'report_' + this.dateSpan.from + '_' + this.dateSpan.to + '.txt'
        return path.resolve(path.join(this.reportsDir, reportName));
    },
    userName : 'Mateusz Jamiolkowski',
    execMaxBuffer : 100000 * 1024
}