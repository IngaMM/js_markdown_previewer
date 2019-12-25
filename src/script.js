// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + "</a>";
};

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: initialText
    };
    this.handleChange = this.handleChange.bind(this);
    this.markdownText = this.markdownText.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  markdownText() {
    var rawMarkup = marked(this.state.input, { renderer: renderer });
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div>
        <Editor input={this.state.input} onChange={this.handleChange} />
        <Previewer output={this.markdownText()} />
      </div>
    );
  }
}

const Editor = props => {
  return (
    <div id="editorContainer">
      <div id="editorHeader">Editor</div>
      <textarea value={props.input} onChange={props.onChange} id="editor" />
    </div>
  );
};

const Previewer = props => {
  return (
    <div id="previewContainer">
      <div id="previewHeader">Previewer</div>
      <div id="preview" dangerouslySetInnerHTML={props.output} />
    </div>
  );
};

const initialText = `# This is Inga's React Markdown Previewer!

## This is a sub header.

This is a [link](https://www.freecodecamp.com).

This is inline code \`<div></div>\`.

\`\`\`
// This is a code block:
function myExample(name) {
    return "Hello" + name + "! How are you?";
}
\`\`\`

This is a list with items:
1. First item
2. Second item
- Another item
- And one more

This is a table:

First Header | Second Header | Third Header
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

And here is finally an image:
![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render(<App />, document.getElementById("app"));
