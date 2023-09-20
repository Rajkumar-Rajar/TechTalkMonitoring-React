import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormData from './FormData';

import { Link } from 'react-router-dom';
function Form() {
  const [bg_color, setbg_color] = useState(true);
  const [submite_validation, setsubmite_validation] = useState(false);

  const [name, setname] = useState();
  const [emp_id, setemp_id] = useState();
  const [status, setstatus] = useState();
  const [reason, setreason] = useState();

  // https://6502bc67a0f2c1f3faeac85b.mockapi.io/talk

  const apiCall = () => {
    setsubmite_validation(true);

    if (name && emp_id && status) {
      const post_data = {
        method: 'POST',

        body: JSON.stringify({
          name: name,
          emp_id: emp_id,
          status: status,
          reason: reason,
        }),

        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };

      fetch('https://6502bc67a0f2c1f3faeac85b.mockapi.io/talk', post_data)
        .then((res) => res.json())
        .then((res) => {
          toast.success('submited', {
            autoClose: 1000,
            onClose: () => {
              window.location.reload();
            },
          });
        })
        .catch((error) => {
          toast.danger('not submited', { autoClose: 1000 });
        });
    } else {
      toast.error('Enter All Field', { autoClose: 1000 });
    }
  };

  return (
    <div
      className={
        bg_color
          ? 'container col-10 col-sm-8 col-md-6 col-lg-3 border border-2'
          : 'container col-10 col-md-6 col-lg-3 bg-dark border border-2'
      }
      style={{ marginTop: '4%' }}
    >
      <div className="p-sm-4">
        <div className="row">
          <div class="col-auto ms-auto form-check form-switch d-flex justify-content-end my-3 d-flex align-items-center">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              onClick={() => {
                setbg_color(!bg_color);
              }}
            />
          </div>

          <div class="col-auto form-check form-switch d-flex justify-content-end my-3">
            <Link to="/AdminLogin">
              {' '}
              <button type="submit" class="btn btn-outline-primary">
                Admin
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

        <div className="text-center">
          <div className="display-sm-5 text-primary fw-bolder">
            Technical Talk
          </div>
        </div>

        <div className="my-3">
          <label
            for="exampleFormControlInput1"
            class={
              bg_color
                ? 'form-label text-uppercase fw-bolder '
                : 'form-label text-uppercase fw-bolder text-light'
            }
          >
            Employee ID
          </label>
          {/* <label for="exampleFormControlInput1" class="form-label text-uppercase fw-bolder">Employee ID</label> */}

          {/* submite_validation ? "form-control" : "form-control is-invalid" */}
          <form class="form-floating">
            <input
              type="number"
              class={
                emp_id
                  ? 'form-control is-valid'
                  : submite_validation
                  ? 'form-control is-invalid'
                  : 'form-control '
              }
              placeholder="name@example.com"
              id="floatingInputInvalid"
              onChange={(e) => {
                setemp_id(e.target.value);
              }}
            />
            <label for="floatingInputInvalid">
              Emp ID<span className="text-danger">*</span>
            </label>
          </form>
        </div>
        <div className="mb-3">
          <label
            for="exampleFormControlInput1"
            class={
              bg_color
                ? 'form-label text-uppercase fw-bolder '
                : 'form-label text-uppercase fw-bolder text-light'
            }
          >
            Employee Name
          </label>

          <form class="form-floating">
            <input
              type="text"
              class={
                name
                  ? 'form-control is-valid'
                  : submite_validation
                  ? 'form-control is-invalid'
                  : 'form-control '
              }
              id="floatingInputInvalid"
              placeholder="name@example.com"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <label for="floatingInputInvalid">
              Emp Name <span className="text-danger">*</span>
            </label>
          </form>
        </div>

        <div className="mb-3">
          <label
            for="exampleFormControlInput1"
            class={
              bg_color
                ? 'form-label text-uppercase fw-bolder '
                : 'form-label text-uppercase fw-bolder text-light'
            }
          >
            status
          </label>

          <div
            class={
              status
                ? 'form-control is-valid'
                : submite_validation
                ? 'form-control is-invalid'
                : 'form-control '
            }
          >
            <div className="">
              <div class="form-check">
                <input
                  class="form-check-input "
                  type="radio"
                  name="flexRadioDefault"
                  onClick={() => {
                    setstatus('present');
                  }}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Present
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  onClick={() => {
                    setstatus('absent');
                  }}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Absent
                </label>
              </div>
            </div>
          </div>
        </div>

        {status == 'absent' && (
          <div className="mb-3">
            <label
              for="exampleFormControlInput1"
              class={
                bg_color
                  ? 'form-label text-uppercase fw-bolder '
                  : 'form-label text-uppercase fw-bolder text-light'
              }
            >
              reason
            </label>

            <form class="form-floating">
              <textarea
                class={
                  reason
                    ? 'form-control is-valid'
                    : submite_validation
                    ? 'form-control is-invalid'
                    : 'form-control '
                }
                onChange={(e) => {
                  setreason(e.target.value);
                }}
                placeholder="name@example.com"
              ></textarea>
              <label class="form-check-label" for="flexRadioDefault2">
                If Absent <span className="text-danger">*</span>
              </label>
            </form>
          </div>
        )}

        <div className="d-flex justify-content-center mb-2">
          <button
            type="submit"
            class="btn btn-primary"
            onClick={() => {
              apiCall();
            }}
          >
            Submit
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Form;