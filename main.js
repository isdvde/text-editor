import './style.css'

class Editor extends HTMLTextAreaElement {
  constructor() {
    super();
    this.default_value = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <style>
      h1 {
        color: red;
        font-size: 3em;
      }
    </style>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
    `;
    this.setAttribute('spellcheck', 'false');
  }

  init() { this.value = this.default_value; }

  set_value(val){ this.value = val; }


}

customElements.define('x-editor', Editor, {extends: 'textarea'});

let $storage = sessionStorage;
let code = $storage.getItem('code');
let $editor = document.querySelector('.editor');
let $result = document.querySelector('.iframe');
let $clear = document.querySelector('.clear');
let $save = document.querySelector('.save');
let $reset = document.querySelector('.reset');

function update_frame() {
  $result.srcdoc = $editor.value;
}

if(code) {
  $editor.set_value(code);
} else {
  $editor.init();
}
update_frame();

$editor.oninput = function(e) {
  update_frame();
  $storage.setItem('code', $editor.value);
}

$reset.onclick = function() {
  $editor.init();
  update_frame();
}

$clear.onclick = function() {
  $editor.value = '';
  update_frame();
}