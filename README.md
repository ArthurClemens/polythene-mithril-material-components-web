# Combining Polythene and material-components-web (MDC-Web)

Minimal setup example how to combine [Polythene](https://github.com/ArthurClemens/polythene) components (version Mithril) and MDC-Web components.

## Demo

[Demo](http://arthurclemens.github.io/polythene-mithril-material-components-web)


## Introduction

[MDC-Web](https://github.com/material-components/material-components-web) is a toolbox of Material Design components. It is more HTML+CSS oriented than Mithril. Virtual DOM libraries by nature are more JavaScript-component based, using parameters to specify appearance and behavior.

So most MDC-Web components come in 3 separate parts: HTML, CSS and JavaScript.


<a id="html"></a>
### HTML

When working with Mithril, you can use [Mithril Template Converter](http://arthurclemens.github.io/mithril-template-converter/index.html) to convert doc examples to Mithril hyperscript.


<a id="css"></a>
### CSS

MDC-Web styles can co-exist with Polythene styles.

Easiest is to load all CSS:

~~~javascript
import "material-components-web/dist/material-components-web.css"
~~~

but it is more economical to import only the CSS you need:

~~~javascript
import "@material/button/dist/mdc.button.css"
import "@material/ripple/dist/mdc.ripple.css"
~~~

Most bundlers have options for importing CSS files. Frequently used with Webpack is [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).


<a id="javascript"></a>
### JavaScript

A MDC-Web component is initialized by attaching it to a DOM element. We can use Mithril's `oncreate` and pass the vnode's `dom`.

In this example the text field is initialised so that the floating label works correctly:

~~~javascript
import { MDCTextField } from "@material/textfield";
import "@material/textfield/dist/mdc.textfield.css";

const MCWTextField = {
  oncreate: ({ dom }) =>
    new MDCTextField(dom),
  view: () => 
    m(".mdc-text-field.mdc-text-field--outlined",
    [
      m("input.mdc-text-field__input[id='tf-outlined'][type='text']"),
      m(".mdc-notched-outline",
        [
          m(".mdc-notched-outline__leading"),
          m(".mdc-notched-outline__notch", 
            m("label.mdc-floating-label[for='tf-outlined']", 
              "Your Name"
            )
          ),
          m(".mdc-notched-outline__trailing")
        ]
      )
    ]
  )
};
~~~


<a id="combining-mcw-and-polythene"></a>
### Combining MDC-Web and Polythene

MCW components and Mithril hyperscript can easily be mixed.

A MCW Drawer component can contain any content, including a List component from Polythene:

~~~javascript
const MCWDrawer = {
  view: () => 
    m("aside.mdc-drawer.mdc-drawer--dismissible.menu-drawer", 
      m(".mdc-drawer__content",
        m("nav.mdc-list",
          m(List, {
            className: "drawer-menu",
            header: {
              title: "Polythene List"
            },
            all: {
              hoverable: true
            },
            tiles: [
              { title: "Inbox" },
              { title: "Important" },
              { title: "Sent" },
              { title: "Spam" },
              { title: "Trash" },
            ]
          })
        )
      )
    )
};
~~~

And that drawer can be called from a Button component from Polythene:

~~~javascript
m(Button, {
  events: {
    onclick: () => {
      const drawer = MDCDrawer.attachTo(document.querySelector(".menu-drawer"));
      drawer.open = true;
      document.body.addEventListener("click", event => {
        drawer.open = false;
      });
    }
  }
}
~~~



## Setup

Init:

~~~
npm install
~~~

Start development server (port 3000):

~~~
npm run dev
~~~

Build:

~~~
npm run build
~~~


## Documentation

[Polythene documentation](https://github.com/ArthurClemens/polythene/blob/master/docs/)