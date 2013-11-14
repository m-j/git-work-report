var config = require('./config.js')
var child_process = require('child_process')
var path = require('path')
var command_templates = require('./command-templates.js')

function generate(repoPath, dateSpan, reportGenerated) {
    var reportContents = '';

    function appendReport(line){
        reportContents += (line ? line : '') + '\n';
    }

    function getMyCommits(callback) {
        appendReport('++++++++++++++++++++++++++++++++++++++++++')
        appendReport('Report for ' + repoPath)
        appendReport()

        child_process.exec(command_templates.logCommit(dateSpan.from, dateSpan.to, config.userName), {
            cwd: repoPath,
            maxBuffer: config.execMaxBuffer
        }, function (err, stdout, stderr) {
            callback(stdout.split('\n'))
        })
    }

    getMyCommits(function (commits) {
        commits.map(function (commitId, index) {
            child_process.exec(command_templates.show(commitId), {
                cwd: repoPath,
                maxBuffer: config.execMaxBuffer
            }, function (err, stdout, stderr) {
                if(err) throw err;
                appendReport(stdout);

                if(index >= commits.length - 1){
                    reportGenerated(reportContents);
                }
            })
        });
    });
}

exports.generate = generate;