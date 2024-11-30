import React from 'react';
import video_t from '../assets/figma_design.mp4';
import './LoginForm.css';

const Login = () => {
  return (
    <main className="relative flex justify-center items-center h-screen w-screen" id="main">
      <div className="absolute aspect-w-16 aspect-h-9 h-full w-full bg-slate-300 bg-cover z-negative-10 overflow-hidden filter">
        <video autoPlay loop muted className="object-cover h-full w-full">
          <source src={video_t} type="video/mp4" />
        </video>
      </div>
      <div className="absolute aspect-w-16 aspect-h-9 h-full w-full bg-cover z-negative-10 overflow-hidden filter">
        <div className="w-full h-full bg-gradient-to-r from-white-10 via-black-60 to-black"></div>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-center sm:justify-end sm:pr-32 z-10">
        <div className="border pt-4 pb-8 px-8 rounded w-96 h-[420px] flex flex-col items-center justify-between">
          {/* Replaced logo with text "Dezide" */}
          <h1 className="text-4xl font-bold text-white"id='dezide'>Dezide</h1>
          <form className="w-full flex flex-col items-center">
            <label className="label" htmlFor="user-id">User ID</label>
            <input
              type="text"
              id="user-id"
              placeholder="User ID"
              className="input"
            />
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
            />
            <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
