import * as assert from 'assert';
import { after, beforeEach, afterEach } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as sideslide from '../../extension';

suite('Extension Test Suite', () => {

	beforeEach( async () => {
		const startingContent = '\n<div></div>\n<h1>Heading</h1>\n\n';
		const document = await vscode.workspace.openTextDocument({ content: startingContent });
		await vscode.window.showTextDocument(document);
	});

	afterEach( async () => {
		vscode.commands.executeCommand('workbench.action.closeActiveEditor');
	});

	after(() => {
		vscode.window.showInformationMessage('All tests done!');
	});

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(0, [1, 2, 3].indexOf(1));
	});

	test('Tests can create documents', async () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			throw Error('Editor is undefined');
		}
	});

	test('Slide text down', async() => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			throw Error('Editor is undefined');
		}
		editor.selection = new vscode.Selection(
			new vscode.Position(1, 5),
			new vscode.Position(1, 5)
		);
		await vscode.commands.executeCommand('sideslide.slideDown');
		await vscode.commands.executeCommand('sideslide.slideDown');
		assert.strictEqual(editor.document.getText(), '\n<div>\n<h1>Heading</h1>\n</div>\n');
	});

	test('Slide text up', async() => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			throw Error('Editor is undefined');
		}
		editor.selection = new vscode.Selection(
			new vscode.Position(1, 0),
			new vscode.Position(1, 0)
		);
		await vscode.commands.executeCommand('sideslide.slideUp');
		assert.strictEqual(editor.document.getText(), '<div></div>\n\n<h1>Heading</h1>\n\n');
	});
});
