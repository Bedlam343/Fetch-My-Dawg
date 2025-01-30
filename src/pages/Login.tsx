import { FormEvent, useRef } from 'react';
import { useSubmit } from 'react-router-dom';

const Login = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const submit = useSubmit();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submit(data, { method: 'POST' });
  };

  return (
    <div className="py-[20px] gap-[60px] flex flex-col items-center">
      <p className="text-center text-4xl">Fetch My Dawg!</p>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-[20px] items-center"
      >
        <p className="text-center text-xl text-slate-700">Login</p>

        <div>
          <label htmlFor="name" className="block">
            Name:
          </label>
          <input
            id="name"
            name="name"
            className="outline-none border-b-2 border-slate-600"
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            id="email"
            name="email"
            className="outline-none border-b-2 border-slate-600"
            ref={emailRef}
          />
        </div>

        <button
          type="submit"
          className="border-[1px] border-slate-900 w-[75px] rounded-md px-2 py-1
      hover:border-slate-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
