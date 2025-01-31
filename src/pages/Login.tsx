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
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-[20px] items-center"
      >
        <p className="text-center text-2xl text-slate-300">Login</p>

        <div>
          <label htmlFor="name" className="block text-slate-300">
            Name:
          </label>
          <input
            id="name"
            name="name"
            className="outline-none border-b-2 border-slate-600 bg-slate-200 py-1 px-1
            focus:bg-slate-100"
            ref={nameRef}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-slate-300">
            Email:
          </label>
          <input
            id="email"
            name="email"
            className="outline-none border-b-2 border-slate-600 bg-slate-200 py-1 px-1
            focus:bg-slate-100"
            ref={emailRef}
            required
          />
        </div>

        <button
          type="submit"
          className="border-[1px] border-slate-600 w-[75px] rounded-md px-2 py-1
      hover:border-slate-500 text-slate-300 mt-[10px]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
