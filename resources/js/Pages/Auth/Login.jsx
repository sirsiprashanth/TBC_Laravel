import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div style={{ background: 'rgb(255,241,222)', minHeight: '100vh' }}>
                <Navbar />
                
                <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '15px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                padding: '50px 40px',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                <div className="text-center mb-5">
                                    <h2 style={{ 
                                        fontFamily: 'Agatho', 
                                        fontSize: '32px',
                                        color: '#232A40',
                                        marginBottom: '10px'
                                    }}>
                                        Welcome Back
                                    </h2>
                                    <p style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '16px',
                                        color: '#666',
                                        marginBottom: '0'
                                    }}>
                                        Sign in to your account to continue
                                    </p>
                                </div>

                                {status && (
                                    <div className="alert alert-success" role="alert" style={{ 
                                        fontFamily: 'Glancyr',
                                        marginBottom: '20px' 
                                    }}>
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" style={{ 
                                            fontFamily: 'Glancyr', 
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#232A40',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="form-control"
                                            style={{
                                                fontFamily: 'Glancyr',
                                                fontSize: '16px',
                                                padding: '12px 16px',
                                                borderRadius: '8px',
                                                border: '1px solid #e0e0e0',
                                                backgroundColor: '#fafafa',
                                                transition: 'all 0.3s ease'
                                            }}
                                            autoComplete="username"
                                            autoFocus
                                            onChange={(e) => setData('email', e.target.value)}
                                            onFocus={(e) => e.target.style.backgroundColor = '#fff'}
                                            onBlur={(e) => e.target.style.backgroundColor = '#fafafa'}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" style={{ 
                                            fontFamily: 'Glancyr', 
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#232A40',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="form-control"
                                            style={{
                                                fontFamily: 'Glancyr',
                                                fontSize: '16px',
                                                padding: '12px 16px',
                                                borderRadius: '8px',
                                                border: '1px solid #e0e0e0',
                                                backgroundColor: '#fafafa',
                                                transition: 'all 0.3s ease'
                                            }}
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            onFocus={(e) => e.target.style.backgroundColor = '#fff'}
                                            onBlur={(e) => e.target.style.backgroundColor = '#fafafa'}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="mb-4 d-flex justify-content-between align-items-center">
                                        <label className="d-flex align-items-center" style={{ marginBottom: 0 }}>
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />
                                            <span style={{ 
                                                fontFamily: 'Glancyr',
                                                fontSize: '14px',
                                                color: '#666',
                                                marginLeft: '8px'
                                            }}>
                                                Remember me
                                            </span>
                                        </label>
                                        
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                style={{
                                                    fontFamily: 'Glancyr',
                                                    fontSize: '14px',
                                                    color: '#F97316',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn w-100"
                                        style={{
                                            fontFamily: 'Glancyr',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            backgroundColor: '#F97316',
                                            color: 'white',
                                            padding: '14px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            marginTop: '20px',
                                            transition: 'all 0.3s ease',
                                            cursor: processing ? 'not-allowed' : 'pointer',
                                            opacity: processing ? 0.7 : 1
                                        }}
                                        disabled={processing}
                                        onMouseEnter={(e) => !processing && (e.target.style.backgroundColor = '#e56a0c')}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#F97316'}
                                    >
                                        {processing ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <p style={{ 
                                        fontFamily: 'Glancyr',
                                        fontSize: '14px',
                                        color: '#666',
                                        marginBottom: '0'
                                    }}>
                                        Don't have an account? 
                                        <Link 
                                            href={route('register')} 
                                            style={{
                                                color: '#F97316',
                                                textDecoration: 'none',
                                                fontWeight: '600',
                                                marginLeft: '5px'
                                            }}
                                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                        >
                                            Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}
