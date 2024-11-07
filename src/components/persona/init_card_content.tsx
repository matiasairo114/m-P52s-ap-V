import ReactDOMServer from "react-dom/server";

const Content = () => (
  <div>
    <p>
      <strong>Complete your persona</strong>
    </p>
    <p>
      You could start by adding some demographic information, needs,
      frustrations, etc.
    </p>
  </div>
);

export const initContent = ReactDOMServer.renderToString(<Content />);
