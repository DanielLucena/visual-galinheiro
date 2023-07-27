export default function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <code>{JSON.stringify(import.meta.env)}</code>
    </div>
  );
}
