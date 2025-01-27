import React, { useState } from 'react';
import video_t from '../assets/figma_design.mp4';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../config'


const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the userId and password
    console.log('User ID:', userId);
    console.log('Password:', password);

    // Send the userId and password to the API
    try {
        // const response = await fetch('http://localhost:226/api/login2', {
          const response = await fetch(`${BASE_URL}/api/login2`, {
        //   const response = await fetch(`${BASE_URL}/api/login2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                domain_id: userId,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data); // Log the API response for debugging

            document.cookie = `designation=${encodeURIComponent(data.Department)}; path=/`;

            if (data.IsActive) { // Check if IsActive is true
                const { DomainId, Name } = data; // Extract DomainId and Name

                // Log the data to be sent to checkAdmin
                console.log('Data sent to checkAdmin:', {
                    DomainId,
                    Name,
                });

                // Make a GET request to checkAdmin with query parameters
                // const adminResponse = await fetch(`http://localhost:226/api/checkAdmin?DomainId=${DomainId}&Name=${encodeURIComponent(Name)}`);
                const adminResponse = await fetch(`${BASE_URL}/api/checkAdmin?DomainId=${DomainId}&Name=${encodeURIComponent(Name)}`);
                // const adminResponse = await fetch(`${BASE_URL}/api/checkAdmin?DomainId=${DomainId}&Name=${encodeURIComponent(Name)}`);

                if (adminResponse.ok) {
                    const adminData = await adminResponse.json();
                    console.log('Admin API Response:', adminData);

                    // Handle the admin response as needed
                    if (adminData.checkAdmin) { // Check if checkAdmin is true
                        // Set cookies for name and id
                        document.cookie = `name=${encodeURIComponent(adminData.name)}; path=/`;
                        document.cookie = `id=${adminData.id}; path=/`;
                        document.cookie = `access=${adminData.access}; path=/`;

                        document.cookie = `adminEmail=${adminData.email}; path=/`;

                        // setAuth(true);
                        navigate('/dashboard'); // Redirect to admin home if applicable
                    } else {
                        // If checkAdmin is false, send request to checkUser.js
                        // const userResponse = await fetch(`http://localhost:226/api/checkUser?DomainId=${DomainId}`);
                        const userResponse = await fetch(`${BASE_URL}/api/checkUser?DomainId=${DomainId}`);
                        // const userResponse = await fetch(`${BASE_URL}/api/checkUser?DomainId=${DomainId}`);
                        
                        if (userResponse.ok) {
                            const userData = await userResponse.json();
                            console.log('User API Response:', userData);
                            // Handle user response as needed
                            // For example, you might want to navigate to a different page for normal users
                            // setAuth(true);
                                                  // Set cookies for name and id
                        document.cookie = `name=${encodeURIComponent(userData.name)}; path=/`;
                        document.cookie = `id=${userData.id}; path=/`;
                        document.cookie = `access=${userData.access}; path=/`;
                        document.cookie = `domain_id=${userData.domain_id}; path=/`;
                        document.cookie = `state=${userData.state}; path=/`;
                        document.cookie = `area=${userData.area}; path=/`;
                        document.cookie = `site=${userData.site}; path=/`;

                            navigate('/Home_user'); // Redirect to normal home if user is not admin
                        } else {
                            const userErrorData = await userResponse.json();
                            console.error('User check failed:', userErrorData);
                            alert('User check failed: ' + (userErrorData.message || 'Unknown error occurred'));
                        }
                    }
                } else {
                    const adminErrorData = await adminResponse.json();
                    console.error('Admin check failed:', adminErrorData);
                    alert('Admin check failed: ' + (adminErrorData.message || 'Unknown error occurred'));
                }
            } else {
                // setAuth(true);
                navigate('/Home'); // Navigate to home if IsActive is false
            }
        } else {
            // Get error details from the API response
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            alert('Login failed: ' + (errorData.message || 'Unknown error occurred'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in: ' + error.message);
    }
};

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
          <h1 className="text-4xl font-bold text-white" id="dezide">Dezide</h1>
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <label className="label" htmlFor="user-id">User ID</label>
            <input
              type="text"
              id="user-id"
              placeholder="User ID"
              className="input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)} // Update state when input changes
            />
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state when input changes
            />
            <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
