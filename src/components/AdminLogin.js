import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bootstrap_style from './style';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BsMoonStars } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { GiVikingHelmet } from "react-icons/gi";

function AdminLogin() {
    const navigate = useNavigate();

    const [userId, setuserId] = useState();
    const [userPass, setuserPass] = useState();
    const [bg_color, setbg_color] = useState(true);
    const [submite_validation, setsubmite_validation] = useState(false);

    const apicall = () => {
        setsubmite_validation(true);

        if (userId && userPass) {
            if (userId == 77 && userPass == 77) {
                toast.success('loging', {
                    autoClose: 1000,
                    onClose: () => {
                        setTimeout(navigate('/FormData'), 1000);
                    },
                });
            } else {
                toast.error('Enter correct user id and password', {
                    autoClose: 2000,
                });
            }
        } else {
            toast.error('Enter All Field', {
                autoClose: 1000,
            });
        }
    };

    return (
        <div
            className={
                bg_color
                    ? 'container col-11 col-sm-8 col-md-6 col-lg-3 border border-2'
                    : 'container col-11 col-sm-8 col-md-6 col-lg-3 bg-dark border border-2'
            }
            style={{ marginTop: '7%' }}
        >
            <div className="p-sm-4">
                <div className="row">
                    <div class="col-auto ms-auto form-check form-switch d-flex justify-content-end my-3 d-flex align-items-center">
                        {/* <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            onClick={() => {
                                setbg_color(!bg_color);
                            }}
                        /> */}
                        {bg_color ? <MdOutlineWbSunny className='fs-4' onClick={() => { setbg_color(!bg_color) }} /> : <BsMoonStars className='text-light fs-4' onClick={() => { setbg_color(!bg_color) }} />}

                    </div>

                    <div class="col-auto form-check form-switch d-flex justify-content-end my-3">
                        <Link to="/">
                            {' '}
                            <button type="submit" class="btn btn-outline-primary px-3">
                                Back
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="text-center my-3">
                    <img
                        src={
                            'http://www.asmltd.com/wp-content/uploads/2019/12/New-ASM-Logo-with-R.png'
                        }
                        className="col-9 col-sm-7"
                        alt="asm technology"
                    />
                </div>

                <div className="text-center my-3">
                    <div className="display-md-6 display-sm-2 text-primary fw-bolder text-uppercase">
                        Admin Login
                    </div>
                </div>
                <div className="mb-3">
                    <label
                        for="exampleFormControlInput1"
                        class={
                            bg_color
                                ? 'form-label text-uppercase fw-bolder'
                                : 'form-label text-uppercase fw-bolder text-light'
                        }
                    >
                        Admin id
                    </label>

                    <form class="form-floating">
                        <input
                            type="text"
                            class={
                                userId
                                    ? 'form-control is-valid'
                                    : submite_validation
                                        ? 'form-control is-invalid'
                                        : 'form-control '
                            }
                            id="floatingInputInvalid"
                            onChange={(e) => {
                                setuserId(e.target.value);
                            }}
                            placeholder="name@example.com"
                        />
                        <label for="floatingInputInvalid">
                            Admin id <span className="text-danger">*</span>
                        </label>
                    </form>
                </div>

                <div className="mb-3">
                    <label
                        for="exampleFormControlInput1"
                        class={
                            bg_color
                                ? 'form-label text-uppercase fw-bolder'
                                : 'form-label text-uppercase fw-bolder text-light'
                        }
                    >
                        Admin password
                    </label>

                    <form class="form-floating">
                        <input
                            type="text"
                            class={
                                userPass
                                    ? 'form-control is-valid'
                                    : submite_validation
                                        ? 'form-control is-invalid'
                                        : 'form-control '
                            }
                            id="floatingInputInvalid"
                            onChange={(e) => {
                                setuserPass(e.target.value);
                            }}
                            placeholder="name@example.com"
                        />
                        <label for="floatingInputInvalid">
                            Admin password<span className="text-danger">*</span>
                        </label>
                    </form>
                </div>

                <div className="d-flex justify-content-center mt-5 mb-3">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={() => {
                            apicall();
                        }}
                    >
                        Submit
                    </button>
                </div>
                <div className="">
                    <p class="text-center text-secondary"><GiVikingHelmet className='fs-4' /></p>
                    <p class="text-capitalized text-center text-secondary">Technology and Innovation</p>
                </div>

                <ToastContainer />
            </div>
        </div>
    )
}

export default AdminLogin;
