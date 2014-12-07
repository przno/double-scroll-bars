double-scroll-bars
==================

AngularJS directives for double horizontal (top &amp; bottom) or double vertical (left &amp; rigth) scroll bars.

## Description
Allows you to create double scroll bars (rulers), at top &amp; bottom / left &amp; right at the same time. It's accomplished by adding a *fake* scroll bar which has the same behavior as the original one. 

Inspired by jQuery [solution](http://stackoverflow.com/a/3935190/1464298), this solution is pure AngularJS / JavaScript and does not require any other dependencies.

## Usage
Load script and inject module dependency:
```html
<script src="double-scroll-bars.min.js"></script>
```
```js
var myApp = angular.module('myApp', ['doubleScrollBars']);
```

Two attribute-style directives are available: `double-scroll-bar-horizontal` and `double-scroll-bar-vertical`.

Use directive as attribute:
```html
<div data-double-scroll-bar-horizontal> {{content}} or static content </div>
```

Optionally add value `always` (equivalent to CSS `overflow: scroll`)
```html
<div data-double-scroll-bar-horizontal="always"> {{content}} or static content </div>
```

Optionally add unique `id` to keep the scroll position in between directive re-compilation:
```html
<div data-double-scroll-bar-horizontal id="id1"> {{content}} or static content </div>
```

## Demo
[Demo on jsFiddle](http://jsfiddle.net/przno/q85Fs/3/)

## Change log
**v0.1.3-alpha**
- added `double-scroll-bar-vertical` directive but needs a fix

**v0.1.2.1**
- small change to Grunt build

**v0.1.2**
- calculating the size of scroll bar itself (instead of previous fixed `20px` value)

**v0.1.1**
 - save "state" between directive recompilation if specified unique `id` (`scrollStorage` service)
 - documentation and demo

**v0.1.0**
 - initial version

## ToDo
- fix `double-scroll-bar-vertical` to respond to scroll height change
- unify names
- update demo, readme
- ~~`double-scroll-bar-vertical` directive~~
- ~~calculate the width of scroll bar itself (can differ based on system / browser), for now using fixed `20px` which just works fine in most cases~~