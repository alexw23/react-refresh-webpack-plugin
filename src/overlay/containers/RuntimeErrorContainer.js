const CloseButton = require('../components/CloseButton');
const ErrorFooter = require('../components/ErrorFooter');
const PageHeader = require('../components/PageHeader');
const ErrorStack = require('../components/RuntimeErrorStack');
const theme = require('../theme');
const removeAllChildren = require('../utils/removeAllChildren');

/**
 * @typedef {Object} RuntimeErrorContainerProps
 * @property {number} activeErrorIndex
 * @property {Error[]} errors
 * @property {function(MouseEvent): *} onClickCloseButton
 * @property {function(MouseEvent): *} onClickNextButton
 * @property {function(MouseEvent): *} onClickPrevButton
 */

/**
 * A container to render runtime errors with stack trace.
 * @param {Document} document
 * @param {HTMLElement} root
 * @param {RuntimeErrorContainerProps} props
 * @returns {void}
 */
function RuntimeErrorContainer(document, root, props) {
  removeAllChildren(root);

  const currentError = props.errors[props.activeErrorIndex];

  let errorTitle = 'Caught ' + props.errors.length;
  if (props.errors.length === 1) {
    errorTitle += ' error.';
  } else {
    errorTitle += ' errors.';
  }

  CloseButton(document, root, {
    onClick: props.onClickCloseButton,
  });
  ErrorFooter(document, root, {
    activeErrorIndex: props.activeErrorIndex,
    errors: props.errors,
    onNext: props.onClickNextButton,
    onPrev: props.onClickPrevButton,
    theme: theme,
  });
  PageHeader(document, root, {
    title: errorTitle,
    theme: theme,
  });
  ErrorStack(document, root, {
    error: currentError,
    theme: theme,
  });
}

module.exports = RuntimeErrorContainer;
