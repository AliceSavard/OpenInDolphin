const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

function activate(context) {
  let disposable = vscode.commands.registerCommand('openInDolphin.reveal', (uri) => {
    const filePath = uri ? uri.fsPath : vscode.window.activeTextEditor?.document.uri.fsPath;
    if (filePath) {
      const dir = path.dirname(filePath);
      exec(`dolphin --select "${filePath}"`, (error) => {
        if (error) {
          exec(`dolphin "${dir}"`);
        }
      });
    }
  });
  context.subscriptions.push(disposable);
}

exports.activate = activate;
