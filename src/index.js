import m from "mithril";
import * as mdc from "material-components-web";
import { MDCRipple } from "@material/ripple";
import { MDCDrawer } from "@material/drawer";
import { MDCTextField } from "@material/textfield";
import { Button, Dialog, List, TextField } from "polythene-mithril";

import "polythene-css/dist/polythene.css";
import "polythene-css/dist/polythene-typography.css";
import "@material/button/dist/mdc.button.css";
import "@material/ripple/dist/mdc.ripple.css";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/drawer/dist/mdc.drawer.css";

import "./styles.css";

const MCWButton = {
  oncreate: ({ dom }) => MDCRipple.attachTo(dom),
  view: ({ attrs }) =>
    m("button.mdc-button.mdc-button--raised", { onclick: attrs.onclick }, [
      attrs.icon && m("i.material-icons.mdc-button__icon", attrs.icon),
      attrs.label,
    ]),
};

const MCWTextField = {
  oncreate: ({ dom }) => new MDCTextField(dom),
  view: () =>
    m("label", {"class":"mdc-text-field mdc-text-field--filled mdc-text-field--fullwidth"},
  [
    m("span", {"class":"mdc-text-field__ripple"}),
    m("input", {"class":"mdc-text-field__input","type":"text","placeholder":"Full-Width Text Field","aria-label":"Full-Width Text Field"}),
    m("span", {"class":"mdc-line-ripple"})
  ]
)
};

const MCWDrawer = {
  view: () =>
    m(
      "aside.mdc-drawer.mdc-drawer--dismissible.menu-drawer",
      m(
        ".mdc-drawer__content",
        m(
          "nav.mdc-list",
          m(List, {
            className: "drawer-menu",
            header: {
              title: "Polythene List",
            },
            all: {
              hoverable: true,
            },
            tiles: [
              { title: "Inbox" },
              { title: "Important" },
              { title: "Sent" },
              { title: "Spam" },
              { title: "Trash" },
            ],
          })
        )
      )
    ),
};

const App = {
  oncreate: () => {
    mdc.autoInit();
  },
  view: () => [
    m(MCWDrawer),
    m(".page", [
      m("h1", "Combining Polythene and Material Components for the web"),
      m(".row", [
        m(".header", "Open MCW Drawer from Polythene Button"),
        m(Button, {
          raised: true,
          label: "Open Drawer",
          events: {
            onclick: () => {
              const drawer = MDCDrawer.attachTo(
                document.querySelector(".menu-drawer")
              );
              drawer.open = true;
              document.body.addEventListener("click", (event) => {
                drawer.open = false;
              });
            },
          },
        }),
      ]),
      m(".row", [
        m(".header", "Open Polythene Dialog from MCW Button"),
        m(MCWButton, {
          label: "Open Dialog",
          onclick: () =>
            Dialog.show({
              /* note the Dialog component is below the other elements in the app */
              title: "Polythene Dialog",
              body: "Click the background to hide, or press ESCAPE.",
              backdrop: true,
            }),
        }),
      ]),
      m(".row", [
        m(".header", "MCW TextField"),
        m(MCWTextField, { label: "Your name", id: "mcw" }),
      ]),
      m(".row", [
        m(".header", "Polythene TextField"),
        m(TextField, {
          label: "Your name",
          floatingLabel: true,
          id: "polythene",
        }),
      ]),
      m("div", { class: "footer" }, [
        m(
          "a",
          {
            href:
              "https://github.com/ArthurClemens/polythene-mithril-material-components-web",
          },
          "Code on Github"
        ),
      ]),
      m(Dialog),
    ]),
  ],
};

m.mount(document.querySelector("#root"), App);
