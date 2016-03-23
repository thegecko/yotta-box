var commands = codebox.require("core/commands");
var dialogs = codebox.require("utils/dialogs");
var File = codebox.require("models/file");
var rpc = codebox.require("core/rpc");

// Toggle commands that need yotta to be ok
var toggleStatus = function(state) {
    _.invoke([
        cmdBranchSwitch, cmdBranchCreate, cmdCommit, cmdPush, cmdPull, cmdSync,
        cmdStatus, cmdBranchDelete
    ], "set", "enabled", state);

    _.invoke([
        cmdInit, cmdClone
    ], "set", "enabled", !state);
};

// Check yotta status
var updateStatus = function(p) {
    return (p || rpc.execute("git/status"))
    .then(function(d) {
        toggleStatus(true);
        return d;
    }, function(err) {
        toggleStatus(false);
        return Q.reject(err);
    })
};

// Build
commands.register({
    id: "yotta.init",
    title: "Yotta: Initilize",
    run: function() {
        return rpc.execute("yotta/init")
        .then(function(r) {
            return commands.run("terminal.open", {
                shellId: r.shellId
            });
        });
    }
});

// Build
commands.register({
    id: "yotta.build",
    title: "Yotta: Build",
    icon: "playback-play",
    shortcuts: [
        "alt+b"
    ],
    run: function() {
        return rpc.execute("yotta/build")
        .then(function(r) {
            return commands.run("terminal.open", {
                shellId: r.shellId
            });
        });
    }
});

// Add module
commands.register({
    id: "yotta.add",
    title: "Yotta: Add Module",
    shortcuts: [
        "alt+a"
    ],
    run: function(args, context) {
        return dialogs.prompt("Yotta module:")
        .then(function(module) {
            rpc.execute("yotta/add", {
                'module': module
            })
            .then(function(r) {
                return commands.run("terminal.open", {
                    shellId: r.shellId
                });
            })
            .fail(dialogs.error);
        });
    }
});

// Remove module
commands.register({
    id: "yotta.remove",
    title: "Yotta: Remove Module",
    shortcuts: [
        "alt+r"
    ],
    run: function(args, context) {
        return dialogs.prompt("Yotta module:")
        .then(function(module) {
            rpc.execute("yotta/remove", {
                'module': module
            })
            .then(function(r) {
                return commands.run("terminal.open", {
                    shellId: r.shellId
                });
            })
            .fail(dialogs.error);
        });
    }
});

// Update modules
commands.register({
    id: "yotta.update",
    title: "Yotta: Update Modules",
    shortcuts: [
        "alt+u"
    ],
    run: function(args, context) {
        return rpc.execute("yotta/update")
        .then(function(r) {
            return commands.run("terminal.open", {
                shellId: r.shellId
            });
        });
    }
});

codebox.menubar.createMenu({
    caption: "Yotta",
    items: [
        {
            caption: "Init Workspace",
            command: "yotta.init"
        },
        { type: "separator" },
        {
            caption: "Build",
            command: "yotta.build"
        },
        {
            id: "yotta_target",
            caption: "Target",
            items: []
        },
        { type: "separator" },
        {
            caption: "Modules",
            items: [
                {
                    caption: "Add Module...",
                    command: "yotta.add"
                },
                {
                    caption: "Remove Module...",
                    command: "yotta.remove"
                },
                {
                    caption: "Update Modules",
                    command: "yotta.update"
                }
            ]
        },
        {
            caption: "Dependencies",
            items: [
                {
                    caption: "List",
                    command: "yotta.list"
                }, 
                {
                    caption: "Licenses",
                    command: "yotta.licenses"
                }
            ]
        }
    ]
});

//updateStatus();