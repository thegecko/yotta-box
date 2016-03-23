var _ = require("lodash");

module.exports = function(codebox) {
    var terminal = codebox.rpc.get("terminal");
    var workspace = codebox.workspace;
    var events = codebox.events;

    codebox.logger.log("start yotta services");

    codebox.rpc.service("yotta", {
        init: function(args) {
            var runId = _.uniqueId("yotta-init-");
            return terminal.create({
                shellId: runId,
                command: 'yt init'
            });
        },
        build: function(args) {
            var runId = _.uniqueId("yotta-build-");
            return terminal.create({
                shellId: runId,
                command: 'yt build'
            });
        },
        add: function(args) {
            if (!args.module) throw "Need a module to add";
            var runId = _.uniqueId("yotta-add-");
            return terminal.create({
                shellId: runId,
                command: 'yt install --save ' + args.module
            });
        },
        remove: function(args) {
            if (!args.module) throw "Need a module to remove";
            var runId = _.uniqueId("yotta-remove-");
            return terminal.create({
                shellId: runId,
                command: 'yt rm ' + args.module
            });
        },
        update: function(args) {
            var runId = _.uniqueId("yotta-update-");
            return terminal.create({
                shellId: runId,
                command: 'yt up'
            });
        },
        version: function(args) {
            var runId = _.uniqueId("yotta-version-");
            return terminal.create({
                shellId: runId,
                command: 'yt version'
            });
        }
    });
};