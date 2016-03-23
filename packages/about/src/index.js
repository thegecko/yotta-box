var welcomeMessage = require("./welcome.md");
var aboutMessage = require("./about.html");

var _ = codebox.require("hr.utils");
var commands = codebox.require("core/commands");
var dialogs = codebox.require("utils/dialogs");
var File = codebox.require("models/file");
var rpc = codebox.require("core/rpc");

// Infos
var helpUrl = "http://help.codebox.io/";
var yottaUrl = "http://docs.yottabuild.org/";
var yottaVersion = _.memoize(rpc.execute.bind(rpc, "yotta/version"));
var releasesNotes = _.memoize(rpc.execute.bind(rpc, "codebox/changes"));

// About dialog
commands.register({
    id: "application.about",
    title: "Application: About",
    run: function() {
        return yottaVersion()
        .then(function(version) {
            var data = codebox.workspace.toJSON();
            data.yottaVersion = version;
            return dialogs.alert(_.template(aboutMessage)(data), { isHtml: true });
        });
    }
});

// Welcome message
commands.register({
    id: "application.welcome",
    title: "Application: Welcome",
    run: function() {
        return commands.run("file.open", {
            file: File.buffer("welcome.md", welcomeMessage)
        })
    }
});

// Releases notes
commands.register({
    id: "application.changes",
    title: "Application: Show Releases Notes",
    run: function() {
        return releasesNotes()
        .get("content")
        .then(function(content) {
            return commands.run("file.open", {
                file: File.buffer("Releases Notes.md", content)
            })
        });
    }
});

// Open documentation
commands.register({
    id: "application.help",
    title: "Application: Open Codebox Documentation",
    run: function() {
        window.open(helpUrl);
    }
});

// Open documentation
commands.register({
    id: "application.yottahelp",
    title: "Application: Open Yotta Documentation",
    shortcuts: [
        "?"
    ],
    run: function() {
        window.open(yottaUrl);
    }
});

codebox.menubar.createMenu({
    id: "help",
    caption: "Help",
    position: 100,
    items: [
        {
            caption: "About",
            command: "application.about"
        },
        {
            caption: "Welcome",
            command: "application.welcome"
        },
        {
            caption: "Releases Notes",
            command: "application.changes"
        },
        {
            caption: "Yotta Documentation",
            command: "application.yottahelp"
        },
        {
            caption: "Codebox Documentation",
            command: "application.help"
        }
    ]
});