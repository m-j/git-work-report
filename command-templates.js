module.exports = {
    logCommit : function(since, until, author){
        return 'git --no-pager log --since "'
            + since +
            '" --until "'
            + until +
            '" --pretty=format:"%H" --author="'
            + author +
            '" --no-merges';
    },
    show : function(commitId){
        return 'git --no-pager show ' + commitId;
    }
}