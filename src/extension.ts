// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {EOL} from 'os';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sideslide" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let slideDown = vscode.commands.registerCommand('sideslide.slideDown', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) { return; }

		const startingPosition = editor.selection.start;

		// check to see if we are starting on the last line
		// if so, there is no line to slide text down to so we return
		if(startingPosition.line + 1 === editor.document.lineCount) {
			return;
		}

		const startingLine = editor.document.lineAt(startingPosition.line);
		const rangeToBump = new vscode.Range(startingPosition, startingLine.range.end);
		const textToBump = editor.document.getText(rangeToBump);
		const lineToBumpTo = editor.document.lineAt(startingPosition.line + 1);
		
		editor.edit((editBuilder) => {
			editBuilder.delete(rangeToBump);
			editBuilder.insert(lineToBumpTo.range.end, textToBump);
		}).then(()=> {
			vscode.commands.executeCommand('cursorMove', {
				to: 'down',
			});
			vscode.commands.executeCommand('cursorMove', {
				to: 'wrappedLineEnd',
			});
			vscode.commands.executeCommand('cursorMove', {
				to: 'left',
				value: textToBump.length,
			});
		});
	});

	let slideUp = vscode.commands.registerCommand('sideslide.slideUp', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) { return; }

		let startingPosition = editor.selection.start;

		// If the starting position is the first line
		// there is no line for us to slide text up to so we return
		if(startingPosition.line === 0) {
			return;
		}


		const startingLine = editor.document.lineAt(startingPosition.line);
		const rangeToBump = new vscode.Range(startingPosition, startingLine.range.end);
		const textToBump = editor.document.getText(rangeToBump);
		const lineToBumpTo = editor.document.lineAt(startingPosition.line - 1);

		editor.edit((editBuilder) => {
			editBuilder.delete(rangeToBump);
			editBuilder.insert(lineToBumpTo.range.end, textToBump);
		}).then(() => {
			vscode.commands.executeCommand('cursorMove', {
				to: 'up',
			});
			vscode.commands.executeCommand('cursorMove', {
				to: 'wrappedLineEnd',
			});
			vscode.commands.executeCommand('cursorMove', {
				to: 'left',
				value: textToBump.length,
			});
		});
	});

	context.subscriptions.push(slideDown);
	context.subscriptions.push(slideUp);
}

// this method is called when your extension is deactivated
export function deactivate() {}
