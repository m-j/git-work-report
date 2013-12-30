var path = require('path')

module.exports = {
    repos : [

    ],
    dateSpan : {
        from : '1.12.2013',
        to: '30.12.2013'
    },
    reportsDir : './reports',
    getReportPath : function(){
        var reportName = 'report_' + this.dateSpan.from + '_' + this.dateSpan.to + '.txt'
        return path.resolve(path.join(this.reportsDir, reportName));
    },
    userName : 'Mateusz Jamiolkowski',
    execMaxBuffer : 100000 * 1024
}
