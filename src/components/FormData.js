/*eslint-disable*/
import React, { Component, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import { useHistory, useNavigate } from 'react-router-dom';

import Employee from './style';

import { Link } from 'react-router-dom';
function FormData() {
    // const history = useHistory()


    const [data, setData] = useState([])
    const [absetData, setaAbsetData] = useState()
    const [show, setShow] = useState(false)

    const [empName, setEmpName] = useState()
    const [empId, setEmpId] = useState()
    const [propId, setPropId] = useState()
    const [Status, setStatus] = useState()
    const [Reason, setReason] = useState()


    const date = new Date();
    const monthName = date.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        fetch("https://6502bc67a0f2c1f3faeac85b.mockapi.io/talk")
            .then((res) => res.json())
            .then(async (res) => {
                setData(res)


                let present_id = await res.map((item, index) => parseInt(item.emp_id))

                let absent_id = await Employee.filter((item, index) => !present_id.includes(item.Id))

                setaAbsetData(absent_id)

                console.log(res);
                console.log(absent_id);

            })
    }, [])



    const clear_data = () => {

        const ok = confirm("you want clear data")

        if (ok) {
            const delete_data = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            for (var i = 0; i < data.length; i++) {

                fetch(`https://6502bc67a0f2c1f3faeac85b.mockapi.io/talk/${data[i].id}`, delete_data)
            }
            toast.success("deleted", {
                autoClose: 1000, onClose: () => {
                    setTimeout(window.location.reload(), 1000)
                }
            })
        }

    }

    const edit = (index1) => {

        setEmpId(data[index1].emp_id)
        setEmpName(data[index1].name)
        setStatus(data[index1].status)
        setReason(data[index1].reason)
        setPropId(data[index1].id)

    }

    const Dlete_data = async (prop_id, prop_empId) => {

        let t = await confirm(`want to delete ${prop_empId} data`)

        if (t) {

            const delete_data = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            fetch(`https://6502bc67a0f2c1f3faeac85b.mockapi.io/talk/${prop_id}`, delete_data)

            toast.success("deleted", {
                autoClose: 1000, onClose: () => {
                    setTimeout(window.location.reload(), 1000)
                }
            })


        }

    }



    const Edit_data = async () => {

        const Edit_data1 = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "name": empName,
                "emp_id": empId,
                "status": Status,
                "reason": Reason
            }),
        }

        fetch(`https://6502bc67a0f2c1f3faeac85b.mockapi.io/talk/${propId}`, Edit_data1)

        toast.success("Updated Data", {
            autoClose: 1000, onClose: () => {
                setTimeout(window.location.reload(), 1000)
            }
        })

    }

    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/">
                        <img src={"http://www.asmltd.com/wp-content/uploads/2019/12/New-ASM-Logo-with-R.png"} className='col-8 col-sm-8 col-md-7 col-lg-7' alt="asm technology" />
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>


                    <div class="collapse navbar-collapse " id="navbarSupportedContent">

                        <ul class="text-capitalize ms-auto  navbar-nav mb-2 mb-lg-0 gap-2 gap-sm-0">
                            {!show &&
                                <li class="nav-item">
                                    <button onClick={() => { clear_data() }} className='btn px-4 me-3 btn-outline-secondary text-capitalize'>
                                        clear data
                                    </button>
                                </li>
                            }
                            <li class="nav-item">
                                <Link to="/">
                                    <button className='col btn px-5 me-3 btn-outline-info text-capitalize'>
                                        Logout
                                    </button>
                                </Link>
                            </li>

                            {/* <li class="nav-item">
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="download-table-xls-button btn btn-outline-info text-capitalize"
                                    table="table-to-xls"
                                    filename={`Technical Talk for  ${monthName}`}
                                    sheet="tablexls"
                                    buttonText="export to excel"
                                />
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-2">


                <div className="row">

                    <div className="ms-sm-auto col-auto">
                        {!show
                            && <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button btn btn-info text-capitalize"
                                table="table-to-xls"
                                filename={`Technical Talk for  ${monthName}`}
                                sheet="tablexls"
                                buttonText="export to excel"
                            />}
                    </div>
                    <div className="col-sm-auto my-2 my-sm-0">
                        <button className='btn btn-secondary text-capitalize px-3' data-bs-toggle="collapse" data-bs-target="#collapseExample">unregistered</button>
                    </div>

                    <div className=" col-sm-auto me-md-3">
                        <button className='btn btn-success px-5' onClick={() => { setShow(!show) }}>{show ? 'UPDATE' : 'EDIT'}</button>
                    </div>
                </div>


                <div class="container table-responsive">
                    <div className="row " >
                        <div className="col text-capitalize text-secondary text-center fs-2">
                            registered Employee list
                            <hr />
                        </div>
                    </div>


                    <table id="table-to-xls" class="table table-hover">
                        <thead className='text-uppercase'>
                            <tr className='text-info'>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMPLOYEE ID</th>
                                <th>STATUS</th>
                                <th>REASON(if absent)</th>

                                {show && <th>EDIT/DELETE</th>}
                            </tr>

                        </thead>

                        <tbody>
                            {data.map((item, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.emp_id}</td>
                                    <td>{item.status}</td>
                                    <td>{item.reason}</td>
                                    {show
                                        && <td className=''>
                                            <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { edit(index) }}>EDIT</button>
                                            <button className=' ms-2 btn btn-danger' onClick={() => Dlete_data(item.id, item.emp_id)}>DELETE</button>
                                        </td>

                                    }
                                </tr>
                            )}

                            <tr>

                            </tr>
                            <tr>

                            </tr>
                            <tr className='text-uppercase'>
                                <td>
                                    <b> TOTAL STRENGTH</b>
                                </td>
                                <td>
                                    {Employee.length}
                                </td>
                            </tr>
                            <tr className='text-uppercase'>
                                <td>
                                    <b>PRESENT</b>
                                </td>
                                <td>
                                    {data.length}
                                </td>
                            </tr>
                            <tr className='text-uppercase'>
                                <td>
                                    <b>ABSENT</b>
                                </td>
                                <td>
                                    {Employee.length - data.length}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div class="collapse container mt-2" id="collapseExample">
                    <div class="card card-body">
                        <div className="row  table-responsive">
                            <div className="row " >
                                <div className="col text-capitalize text-secondary text-center fs-2">
                                    unregistered Employee list
                                    <hr />
                                </div>

                            </div>

                            <div className="row">
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="download-table-xls-button btn btn-info text-capitalize"
                                    table="table-to-xlss"
                                    filename={`Technical Talk unregistered employee for  ${monthName}`}
                                    sheet="tablexls"
                                    buttonText="export to excel"
                                />
                            </div>
                            <table id="table-to-xlss" class="table table-hover">
                                <thead className='text-uppercase' id="unregistered">

                                    <tr className='text-info'>
                                        <th>ID</th>
                                        <th>EMPLOYEE ID</th>
                                        <th>NAME</th>
                                    </tr>
                                </thead>

                                <tbody >
                                    {
                                        absetData && absetData.map((item, index) =>
                                            <tr >
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {item.Id}
                                                </td>
                                                <td>
                                                    {item.Name}
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >



                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Data</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">





                                <div className="col">


                                    <div class="row">
                                        <label htmlFor="" className={empName ? 'col-sm-5 text-uppercase ' : 'col-sm-5 text-uppercase text-danger '}>Emp Name</label>
                                        <input type="text" class="col form-control me-4" value={empName} onChange={(e) => { setEmpName(e.target.value) }} placeholder="Employee Name" aria-label="email" />
                                    </div>
                                    <div class="row">
                                        <label htmlFor="" className={empId ? 'col-sm-5 text-uppercase ' : 'col-sm-5 text-uppercase text-danger '}>Emp ID</label>
                                        <input type="text" class="col form-control me-4" value={empId} onChange={(e) => { setEmpId(e.target.value) }} placeholder="Employee Id" aria-label="email" />
                                    </div>
                                    <div class="row">
                                        <label htmlFor="" className={Status ? 'col-sm-5 text-uppercase ' : 'col-sm-5 text-uppercase text-danger '}>Status</label>
                                        <div class="col dropdown me-3">
                                            <input class="form-control dropdown-toggle" value={Status} data-bs-toggle="dropdown" />
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" onClick={() => { setStatus("Present") }}>Present</a></li>
                                                <li><a class="dropdown-item" onClick={() => { setStatus("Absent") }}>Absent</a></li>
                                            </ul>
                                        </div>
                                    </div>


                                    {
                                        Status == "Absent" &&
                                        <div class="row">
                                            <label htmlFor="" className={Reason ? 'col-sm-5 text-uppercase ' : 'col-sm-5 text-uppercase text-danger '}>Reason</label>
                                            <textarea class="col form-control me-4" onChange={(e) => { setReason(e.target.value) }} placeholder="Reason" value={Reason}></textarea>

                                        </div>
                                    }
                                </div>


                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={() => { Edit_data() }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>


                <ToastContainer />
            </div>

        </div>
    )
}

export default FormData

