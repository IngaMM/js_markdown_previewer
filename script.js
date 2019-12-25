var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return "<a target=\"_blank\" href=\"" + href + "\">" + text + "</a>";
};

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true
});

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      input: initialText
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.markdownText = _this.markdownText.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        input: event.target.value
      });
    }
  }, {
    key: "markdownText",
    value: function markdownText() {
      var rawMarkup = marked(this.state.input, { renderer: renderer });
      return { __html: rawMarkup };
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Editor, { input: this.state.input, onChange: this.handleChange }),
        React.createElement(Previewer, { output: this.markdownText() })
      );
    }
  }]);

  return App;
}(React.Component);

var Editor = function Editor(props) {
  return React.createElement(
    "div",
    { id: "editorContainer" },
    React.createElement(
      "div",
      { id: "editorHeader" },
      "Editor"
    ),
    React.createElement("textarea", { value: props.input, onChange: props.onChange, id: "editor" })
  );
};

var Previewer = function Previewer(props) {
  return React.createElement(
    "div",
    { id: "previewContainer" },
    React.createElement(
      "div",
      { id: "previewHeader" },
      "Previewer"
    ),
    React.createElement("div", { id: "preview", dangerouslySetInnerHTML: props.output })
  );
};

var initialText = "# This is Inga's React Markdown Previewer!\n\n## This is a sub header.\n\nThis is a [link](https://www.freecodecamp.com).\n\nThis is inline code `<div></div>`.\n\n```\n// This is a code block:\nfunction myExample(name) {\n    return \"Hello\" + name + \"! How are you?\";\n}\n```\n\nThis is a list with items:\n1. First item\n2. Second item\n- Another item\n- And one more\n\nThis is a table:\n\nFirst Header | Second Header | Third Header\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\nAnd here is finally an image:\n![React Logo w/ Text](https://goo.gl/Umyytc)\n";

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));