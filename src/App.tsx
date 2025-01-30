function App() {
  return (
    <div className="bg-black-500 py-[20px] gap-[60px] flex flex-col items-center">
      <p className="text-center text-4xl">Fetch My Dawg!</p>

      <div className="flex flex-col gap-[20px] items-center">
        <p className="text-center text-xl text-slate-700">Login</p>

        <div>
          <label htmlFor="name" className="block">
            Name:
          </label>
          <input
            id="name"
            className="outline-none border-b-2 border-slate-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            id="email"
            className="outline-none border-b-2 border-slate-600"
          />
        </div>

        <button
          className="border-[1px] border-slate-900 w-[75px] rounded-md px-2 py-1
          hover:border-slate-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
