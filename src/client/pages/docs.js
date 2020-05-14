import React from 'react';
import { Link } from "react-router-dom";

class Docs extends React.Component {
  render() {
    let walkthrough = "https://github.com/rubys/whimsy-board-agenda-nodejs/blob/master/docs/walkthrough"

    return <div class="container">
      <h1>Documentation/Guides</h1>

      <h3>Available now</h3>

      <dl class="row">
        <dt class="col-sm-2"><Link to="/demo/">React/Redux Demo</Link></dt>
        <dd class="col-sm-10">
          <p>A live demo of the <a href="https://react-redux.js.org/">React Redux</a> store.</p>

          <p>Shows how to define a <a href="https://reactjs.org/docs/introducing-jsx.html">JSX</a> template,
          and to render a live view using a template, state data, and data from a React Redux store.</p>
        </dd>

        <dt class="col-sm-2">
          <a href={`${walkthrough}/refresh.md#refreshing-the-agenda`}>Refresh Walkthrough</a>
        </dt>
        <dd class="col-sm-10">
          <p>A full-stack walkthrough of refreshing the agenda from the latest svn, initiated by
          pressing <tt>R</tt> on the keyboard.</p>

          <p>This walkthrough is meant to merely be skimmed, optionally diving into specific areas
          of interest.  Understanding how the pieces are put together will make it easier to
          locate where to make changes.</p>
        </dd>

        <dt class="col-sm-2">
          <a href={`${walkthrough}/add-comment.md#adding-a-comment-to-a-pmc-report`}>Add Comment Walkthrough</a>
        </dt>
        <dd class="col-sm-10">
          <p>A walkthrough on adding a comment to report.</p>

          <p>This provides more detail with an actual example of how to
          wire up buttons, forms, and operations to work together.</p>
        </dd>
      </dl>

      <h3>Planned/Coming Soon</h3>

      <dl class="row">
        <dt class="col-sm-2">Agenda Reducer</dt>
        <dd class="col-sm-10">
          <p>A walkthrough of the Agenda <a href="https://redux.js.org/basics/reducers">Reducer</a>.</p>

          <p>This will show how multiple streams of <a href="https://redux.js.org/basics/actions">actions</a>
          {' '} are processed to provide a coherent and up to date view of Agenda items for rendering.</p>
        </dd>
      </dl>

      <h3>Other resources</h3>

      <p>
        This project was bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>.
        You can learn more in the <a href="https://facebook.github.io/create-react-app/docs/getting-started">Create React App documentation</a>.
      </p>

      <h5>Significant components:</h5>
      <ul>
        <li><a href="https://getbootstrap.com/">Bootstrap</a> styles</li>
        <li><a href="https://expressjs.com/">Express</a> web framework</li>
        <li><a href="https://nodejs.org/en/docs/guides/">Node.js</a> [<a href="https://nodejs.dev/">tutorial</a>] Server-side JavaScript runtime</li>
        <li><a href="https://reactjs.org/">React</a> [<a href="https://reactjs.org/tutorial/tutorial.html">tutorial</a>] user interface library</li>
        <li><a href="https://react-redux.js.org/">React Redux</a> predictable state container</li>
        <li><a href="https://reacttraining.com/react-router/">React Router</a> declarative routing</li>
      </ul>

      <h5>Supporting cast:</h5>
      <ul>
        <li><a href="https://babeljs.io/">babel</a> javascript transpiler</li>
        <li><a href="https://www.npmjs.com/package/express-ws">express-ws</a> websocket support</li>
        <li><a href="https://jestjs.io/">jest</a> testing framework</li>
        <li><a href="https://jquery.com/">jQuery</a> library for DOM traversal and manipulation</li>
        <li><a href="http://ldapjs.org/">ldapjs</a> LDAP client</li>
        <li><a href="https://webpack.js.org/">webpack</a> module bundler</li>
        <li><a href="https://yarnpkg.com/">yarn</a> package manager</li>
      </ul>

      <h5>Relatively new and notable JavaScript features:</h5>
      <ul>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring">Object destructuring</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax">spread syntax</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions">arrow function expressions</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015">shorthand and computed property names</a></li>
      </ul>
    </div>
  }
}

export default Docs;