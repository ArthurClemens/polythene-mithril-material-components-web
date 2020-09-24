# Combining Polythene and material-components-web (MDC-Web)

Minimal setup example how to combine [Polythene](https://github.com/ArthurClemens/polythene) components (version Mithril) and MDC-Web components.

## Demo

[Demo](http://arthurclemens.github.io/polythene-mithril-material-components-web)


## Introduction

[MDC-Web](https://github.com/material-components/material-components-web) is a toolbox of Material Design components. It is more HTML+CSS oriented than Mithril or other Virtual DOM libraries.

Most MDC-Web components come in 3 separate parts: HTML, CSS and JavaScript.


<a id="html"></a>
### HTML

When working with Mithril, you can use [Mithril Template Converter](http://arthurclemens.github.io/mithril-template-converter/index.html) to convert doc examples to Mithril hyperscript.


<a id="css"></a>
### CSS

MDC-Web styles can co-exist with Polythene styles.

Easiest is to load all CSS:

```css
/* styles.css */
@import "material-components-web/dist/material-components-web.css";
```

but it is more economical to import only the CSS you need:

```css
/* styles.css */
@import "@material/button/dist/mdc.button.css";
@import "@material/ripple/dist/mdc.ripple.css";
```

Most bundlers have options for importing CSS files. Frequently used with Webpack is [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).


<a id="javascript"></a>
### JavaScript

We can use a thin component that outputs the hyperscript (see HTML above).

A MDC-Web component is initialized by attaching it to a DOM element. We can use Mithril's `oncreate` and pass the vnode's `dom`.

In this example the text field is initialised so that the floating label works correctly:

```javascript
import { MDCTextField } from "@material/textfield";

const MCWTextField = {
  oncreate: ({ dom }) => new MDCTextField(dom),
  view: () =>
    m(
      "label",
      {
        class:
          "mdc-text-field mdc-text-field--filled mdc-text-field--fullwidth",
      },
      [
        m("span", { class: "mdc-text-field__ripple" }),
        m("input", {
          class: "mdc-text-field__input",
          type: "text",
          placeholder: "Full-Width Text Field",
          "aria-label": "Full-Width Text Field",
        }),
        m("span", { class: "mdc-line-ripple" }),
      ]
    ),
};
```


<a id="combining-mcw-and-polythene"></a>
### Combining MDC-Web and Polythene

MCW components and Polythene components can be mixed.

For example, when using a MCW Drawer component, we can put other content, including a Polythene List component:

```javascript
import { List } from "polythene-mithril";

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
```

And that Drawer can be called from a Polythene Button component:

```javascript
import { Button } from "polythene-mithril";

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
```



## Setup

Init:

```
npm install
```

Start development server (port 3000):

```
npm run dev
```

Build:

```
npm run build
```


## Documentation

[Polythene documentation](https://github.com/ArthurClemens/polythene/blob/master/docs/)
