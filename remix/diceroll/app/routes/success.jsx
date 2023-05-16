export default function Winner() {
  return (
    <div>
      <h1>Successfully wrote to DB!</h1>
      <button onClick={() => (window.location.href = "/")}>Homepage</button>
    </div>
  );
}
