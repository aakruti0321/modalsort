import React, { useState, useMemo } from "react";

import { Button, Modal } from 'antd';
export function Sortd() {
    const [inputData, setInputData] = useState({
        fname: "",
        sname: "",
        email: "",
        pass: "",
    })
    console.log(inputData);

    const [record, setRecord] = useState(JSON.parse(localStorage.getItem("data1")) || [])
    console.log(record);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (value) => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [sort, setSort] = useState("")

    const Data = useMemo(() => {
        if (sort === "fname") {
            return record.sort((a, b) => a["fname"].localeCompare(b["fname"]));
        }
        else if (sort === "sname") {
            return record.sort((a, b) => a["sname"].localeCompare(b["sname"]));
        }
        else if (sort === "email") {
            return record.sort((a, b) => a["email"].localeCompare(b["email"]));
        }
        else {
            return record;
        }
    }, [record, isModalOpen])


    const handleOnChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const buttondelete = (index) => {
        const deletedata = record.filter((item, ind) => ind !== index)
        setRecord(deletedata)
    }
    const [isEdit, setIsEdit] = useState(-1)
    const handleSubmit = () => {
        if (isEdit !== -1) {
            const update = record.map((idx, index) => {
                if (index === isEdit) {
                    return inputData;
                }
                return idx;
            });
            setRecord(update);
            localStorage.setItem("data1", JSON.stringify(update))
            setIsEdit(-1);
        }
        /////////////////////////////////duplicate record task //////////////////////////
        else {
            setRecord([...record, inputData]);
            localStorage.setItem("data1", JSON.stringify([...record, inputData]))
        }

    }

    const handleEdit = (index) => {
        setIsEdit(index);
        const editData = record.find((item, index1) => { return index1 === index });
        setInputData(editData);
    }

    return (
        <>
            <div id="modal1">
                <div>
                    <label for="fname"> fname :- </label>
                    <input type="text" name="fname" value={inputData.fname} onChange={(e) => handleOnChange(e)} />
                </div><br />
                <div>
                    <label for="sname">sname:- </label>
                    <input type="text" name="sname" value={inputData.sname} onChange={(e) => handleOnChange(e)} />
                </div><br />
                <div>
                    <label for="email"> email :- </label>
                    <input type="email" name="email" value={inputData.email} onChange={(e) => handleOnChange(e)} />

                </div><br />
                <div>
                    <label for="pass"> password:- </label>
                    <input type="password" name="pass" value={inputData.pass} onChange={(e) => handleOnChange(e)} />
                </div><br />
                <div>
                    <button onClick={() => handleSubmit()}>clicked</button>
                    <Button type="primary" onClick={showModal}>
                        Open Modal
                    </Button>
                    <Modal title="search form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <select onChange={(e) => setSort(e.target.value)}>
                            <option value="fname">fname</option>
                            <option value="sname">sname</option>
                            <option value="email">email</option>
                        </select>

                    </Modal>
                </div><br />

                <div>
                    <table className="table table-border table-hover table-striped table-dark">
                        <thead>
                            <th>fname</th>
                            <th>sname</th>
                            <th>email</th>
                            <th>password</th>
                        </thead>
                        <tbody>
                            {
                                Data.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.fname}</td>
                                            <td>{item.sname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.pass}</td>
                                            <td><button onClick={() => buttondelete(index)}>delete</button></td>
                                            <td><button type="button" onClick={() => handleEdit(index)}>Edit</button></td>
                                        </tr>
                                    )

                                })
                            }

                        </tbody>
                    </table>
                </div>


            </div>

        </>
    )
}