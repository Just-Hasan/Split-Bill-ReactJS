export function Button({ children, eventHandlerFunction }) {
  return (
    <button className="button" onClick={eventHandlerFunction}>
      {children}
    </button>
  );
}
