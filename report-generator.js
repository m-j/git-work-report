var config = require('./config.js')
var child_process = require('child_process')
var path = require('path')
var command_templates = require('./command-templates.js')

function generate(repoPath, dateSpan, reportGenerated) {
    var reportContents = '';
    var reportLines = [];

    function appendReport(line, index){
        reportLines[index] = line;
    }

    function getMyCommits(callback) {
        appendReport('++++++++++++++++++++++++++++++++++++++++++')
        appendReport('Report for ' + repoPath)
        appendReport()

        child_process.exec(command_templates.logCommit(dateSpan.from, dateSpan.to, config.userName), {
            cwd: repoPath,
            maxBuffer: config.execMaxBuffer
        }, function (err, stdout, stderr) {
            if (err) throw err;
            callback(stdout.split('\n'))
        })
    }

    getMyCommits(function (commits) {
        var commitsProcessedCount = 0

        commits.map(function (commitId, index) {
            child_process.exec(command_templates.show(commitId), {
                cwd: repoPath,
                maxBuffer: config.execMaxBuffer
            }, function (err, stdout, stderr) {
                if(err) throw err
                if(stderr) console.log(stderr)

                appendReport(stdout, index)
                commitsProcessedCount++

                if(commitsProcessedCount >= commits.length){
                    reportContents = reportLines.join('\n')
                    var lines = reportLines.length
                    console.log('Report of lines: ' + lines + ' and chars: ' + reportContents.length)
                    reportGenerated(reportContents);
                }
            })
        });
    });
}

exports.generate = generate;