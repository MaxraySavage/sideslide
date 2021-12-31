# sideslide README

This extension allows you to move all text to the right of your cursor to the end of the next or preceding line. I find this useful for working with autoclosed html tags!

### Sliding down
![Example of sliding text down](https://github.com/MaxraySavage/sideslide/blob/main/images/slidedown.gif?raw=true)

### Sliding up
![Example of sliding text up](https://github.com/MaxraySavage/sideslide/blob/main/images/slideup.gif?raw=true)

## Keybindings

<kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>&#8593;</kbd> - slides text up

<kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>&#8595;</kbd> - slides text down

## Design Changes
Originally, I had implemented logic to add a new line if the user attempted to slide text from the last line down or from the first line up. I decided to remove that functionality to keep things as simple as possible however, it would be possible to re-implement if it seems useful.

## The Tribulation of Text Teleportation
This extension could be used anywhere. However, I originally thought of it when observing people copy and pasting inconvenent HTML closing tags during demos. 

The extension works as intended for moving a closing tag. However there is a big issue. Moving an ***opening*** tag. 

This extension essentially deletes text and then inserts that same text somewhere else. The insertion of that text can trigger an autocomplete from VScode. Strangely, it seems this only happen when moving text **up** but not down. I don't know why and I'd like to try and prevent that behavior. 

I have attempted deleting all text after the inserted text. Unfortunately it seems like there is a delay between when the text is inserted and when it is autocompleted. This makes it tricky to make sure I am deleting **after** the autocomplete happens while also ensuring I'm not deleting too late and possibly deleting user inputted text.

I am now calling this the tribulation text teleportation . If only we could truly know that the text being inserted is the same as the text that was deleted, not some new entity...
