// log specific events happening.
const event = ({ action, params }) => {
  window.gtag('event', action, params);
};

export { event };
