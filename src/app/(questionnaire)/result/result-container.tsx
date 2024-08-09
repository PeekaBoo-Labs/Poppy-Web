export default function ResultContainer() {
  return (
    <div className="relative flex items-start">
      <div className="sticky top-[70px] flex-grow outline outline-blue-500">
        <h1>Hello!!!</h1>
      </div>

      <div className="flex-grow">
        <section className="min-h-screen outline"></section>
        <section className="min-h-[calc(100vh/2)] outline"></section>
        <section className="min-h-screen outline"></section>
      </div>
    </div>
  );
}
