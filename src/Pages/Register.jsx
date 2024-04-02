import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { sendEmailVerification } from "firebase/auth";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [regError, setRegError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checked = e.target.terms.checked;
        console.log(name, email, password);

        // reset state 
        setRegError('');
        setSuccess('');

        if (password.length < 6) {
            setRegError('Password should be 6 characters or longer!');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegError('password should have uppercase!');
            return;
        } else if (!checked) {
            setRegError('Please accept our Terms!')
            return;
        }

        // create user in firebase
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                sendEmailVerification(result.user)
                .then(() => {
                    setSuccess('Check and verify your email');
                })
                .catch(err => setRegError(err))
                setSuccess('User created successfully');
                e.target.reset();
            })
            .catch(err => {
                console.error(err);
                setRegError(err.message);
            })
    }
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col ">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Register Now!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            {regError && <p className='text-red-500'>{regError}</p>}
                            {success && <p className='text-green-500'>{success}</p>}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required />
                                <span onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </span>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" name="terms" id="terms" />
                                <label htmlFor="terms"> I accept your terms</label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            <p>Have Account? Please <Link to='/login'>login </Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;