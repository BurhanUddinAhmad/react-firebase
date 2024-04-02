import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";



const Login = () => {
    const navigate = useNavigate();
    const {signInUser, googleSignIn, resetPassword} = useContext(AuthContext);
    const emailRef = useRef();
    const [success, setSuccess] = useState('');
    const [logError, setLogError] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset state
        setSuccess('');
        setLogError('')

        signInUser(email, password)
        .then( res => {
            console.log(res.user);
            if(res.user.emailVerified) {
                setSuccess('Login Successfully!');
                navigate('/');
            } else {
                setLogError('Please verify your email!');
            }
            e.target.reset();
        })
        .catch(err => setLogError(err))
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(() => setSuccess('Login success'))
        .catch(err => setLogError(err))
    }

    const handlePasswordReset = () => {
        const email = emailRef.current.value;
        if (!email) {
            setLogError('pelase provide an email');
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setLogError('please write a valid email')
            return;
        }
        resetPassword(email);
        setSuccess('Please check your email!');
    }
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col ">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login Now!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            {success && <p className="text-green-500">{success}</p> }
                            {logError && <p className="text-red-500">{logError}</p> }
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a onClick={handlePasswordReset} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p>New here? Please <Link to = '/register'>register</Link> </p>
                        </form>
                    </div>
                        <button onClick={handleGoogleSignIn} className="btn btn-primary">Google</button>
                </div>
            </div>
        </>
    );
};

export default Login;