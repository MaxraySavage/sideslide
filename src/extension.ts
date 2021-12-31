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

		const startingLine = editor.document.lineAt(startingPosition.line);
		const rangeToBump = new vscode.Range(startingPosition, startingLine.range.end);
		const textToBump = editor.document.getText(rangeToBump);

		
		editor.edit((editBuilder) => {
			// check to see if we are starting on the last line, if so make a newline below
			if(startingPosition.line + 1 === editor.document.lineCount) {
				editBuilder.insert(new vscode.Position(startingPosition.line, startingLine.text.length), EOL);
			}
		}).then( () => {
			editor.edit((editBuilder) => {
				const lineToBumpTo = editor.document.lineAt(startingPosition.line + 1);
				vscode.commands.executeCommand('cursorMove', {
					to: 'down',
				});
				editBuilder.insert(lineToBumpTo.range.end, textToBump);
				vscode.commands.executeCommand('cursorMove', {
					to: 'wrappedLineLastNonWhitespaceCharacter',
				});
				vscode.commands.executeCommand('cursorMove', {
					to: 'left',
					value: textToBump.length,
				});
				editBuilder.delete(rangeToBump);
			});
		});
	});

	let slideUp = vscode.commands.registerCommand('sideslide.slideUp', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) { return; }

		let startingPosition = editor.selection.start;

		editor.edit((editBuilder) => {
			if(startingPosition.line === 0) {
				// Vscode's default behavior makes sliding up on the first time not work well
				// Specifically it autocompletes an html tag automatically 
				// once it hits the first line
				return;
			}
			startingPosition = editor.selection.start;
			const startingLine = editor.document.lineAt(startingPosition.line);
			const rangeToBump = new vscode.Range(startingPosition, startingLine.range.end);
			const textToBump = editor.document.getText(rangeToBump);
			const destinationLineNumber = Math.max(startingPosition.line - 1, 0);
			const lineToBumpTo = editor.document.lineAt(destinationLineNumber);
			vscode.commands.executeCommand('cursorMove', {
				to: 'up',
			});
			editBuilder.insert(lineToBumpTo.range.end, textToBump);
			vscode.commands.executeCommand('cursorMove', {
				to: 'wrappedLineLastNonWhitespaceCharacter',
			});
			vscode.commands.executeCommand('cursorMove', {
				to: 'left',
				value: textToBump.length,
			});
			editBuilder.delete(rangeToBump);
		});
	});

	context.subscriptions.push(slideDown);
	context.subscriptions.push(slideUp);
}

// this method is called when your extension is deactivated
export function deactivate() {}
