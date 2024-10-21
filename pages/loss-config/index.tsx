import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import clsx from "clsx";
import { serialize } from "@/utils/serialization";
import axios from "axios";
import moment from "moment";
import nextLink from 'next/link'
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setUserTableName } from "@/features/userTableSlice";
const LossConfigPage = () => {

  // company interface to access company objects keys and values in res body
  interface Company {
    name: string;
  }
  // Table Data
  interface Table {
    name: string;
    username: string;
    phone: number;
    // website: string;
    email: string;
    company: Company;
    button: string
  }



  const TableName = useSelector((state: RootState) => state.userTable.name)
  console.log("redux table name", TableName)

  const dispatch = useDispatch()
  const router = useRouter()

  const [isEdit, setIsEdit] = useState(false);

  const [ctu, SetCtu] = useState<Number>();
  const [stu, SetStu] = useState<Number>();
  const [discomm, SetDiscomm] = useState<Number>();

  

  const tableHeader = ["Name", "UserName", "Phone Number", "Company", "Email", "Action"];
  const [tableData, setTableData] = useState<Table[]>([]);

  //   const handleInputChange = (e: React.FocusEvent<HTMLTableCellElement>) => {
//     const target = e.target as HTMLTableCellElement; // Type assertion
//     dispatch(setUserTableName(target.innerText)); // Use innerText for contentEditable
// };

  const handleSave = async () => {
    console.log(ctu, stu, discomm);
    const date = new Date();
    console.log(
      "Date",
      date,
      moment().calendar(),
      moment().format("DD-MM-YYYY")
    );
    const res = await axios.post("/api/service/fetch", {
      payload: serialize({
        path: "/con/update/config",
        method: "POST",
        body: {
          CTU: ctu,
          STU: stu,
          DISCOMM: discomm,
          TodayDate: moment().format("DD-MM-YYYY"),
        },
      }),
    });
    console.log("save res: ", res);
  };

  const fetchData = async () => {
    const res = await axios.post("/api/service/fetch", {
      payload: serialize({
        path: "https://jsonplaceholder.typicode.com/users",
        method: "GET",
      }),
    });
    setTableData(res.data);
    console.log("get api res", res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("table data", tableData);
  }, [tableData]);


  const handleInputChange = (index: number, e: React.FocusEvent<HTMLTableCellElement>) => {
    const target = e.target as HTMLTableCellElement;
    const newName = target.innerText; // Get the new name from the table cell

    // Update the specific item in tableData
    const updatedData = [...tableData];
    updatedData[index].name = newName; // Update the name in the specific row

    setTableData(updatedData); // Set the updated table data
    dispatch(setUserTableName(newName)); // Dispatch the action to update Redux state
  };

  const handleBtn = () => {
    if (!isEdit) {
      setIsEdit(!isEdit);
      console.log("edit button");
    } else {
      handleSave();
      console.log("save button");
    }
  };

  // simple edit 
  // const handleEdit = () => {
  //   router.push("/portfolio")
  // }

  // edit with passws current idx row item for user
  const handleEdit = (userData: any) => {
    router.push({
      pathname: "/portfolio",
      query: {
        name: decodeURIComponent(userData.namene),
        username: encodeURIComponent(userData.username),
        company: userData.company.name,
      }
    })
  }

  
  return (
    <DefaultLayout>
      <div className="w-full flex flex-col p-4">
        {/* card */}
        <div className="max-w-[400px] md:max-w-[550px] py-10 px-8 gap-4 grid grid-cols-1 md:grid-cols-2 border rounded-md bg-white shadow-md mt-10">
          <input
            type="number"
            disabled={!isEdit}
            placeholder="CTU(%)"
            onChange={(e) => SetCtu(parseInt(e.target.value))}
            className="px-3 py-3 outline-none border rounded-md bg-default-100 hover:bg-default-200"
          />
          <input
            type="number"
            disabled={!isEdit}
            placeholder="STU(%)"
            onChange={(e) => SetStu(parseInt(e.target.value))}
            className="px-3 py-3 outline-none border rounded-md bg-default-100 hover:bg-default-200"
          />
          <input
            type="number"
            disabled={!isEdit}
            placeholder="Discomm(%)"
            onChange={(e) => SetDiscomm(parseInt(e.target.value))}
            className="px-3 py-3 outline-none border rounded-md bg-default-100 hover:bg-default-200"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={handleBtn}
              // className='bg-blue-600 border rounded-lg text-white font-medium w-[80px] py-1.5'
              className={clsx(
                "bg-blue-600 border rounded-lg text-white font-medium w-[80px] max-h-10 py-1",
                !isEdit ? "" : "bg-green-500"
              )}
            >
              {!isEdit ? "Edit" : "Save"}
            </button>
            {isEdit && (
              <button
                className="bg-red-600 border rounded-lg text-white font-medium w-[80px] max-h-10 py-1"
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        {/* Table */}

        <h1 className="text-2xl text-center font-semibold my-10">
          Client details
        </h1>
        <div className="w-full p-4 overflow-auto bg-white border rounded-xl shadow-sm">
          <table className="table-auto w-full">
            {/* <table className="bg-yellow-200 table-auto w-full"> */}

            <thead className="h-10">
              <tr className="bg-default-100 text-foreground-500 text-tiny font-semibold whitespace-nowrap">
                {tableHeader.map((header, idx) => (
                  <th className="text-start px-3 align-middle" key={idx}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.map((item, idx) => (
                <tr className="bg-white" key={idx}>
                  <td
                  contentEditable
                  onBlur={(e) => handleInputChange(idx, e)} // Pass index and event
                  // onBlur={handleInputChange}
                   className="px-4 py-2 border-gray-300 text-small font-normal whitespace-normal align-middle text-foreground-900">
                    {item.name}
                    {/* {TableName} */}
                  </td>
                  <td className="px-4 py-2 border-gray-300 text-small font-normal whitespace-normal align-middle text-foreground-900">
                    {item.username}
                  </td>
                  <td className="px-4 py-2 border-gray-300 text-small font-normal whitespace-normal align-middle text-foreground-900">
                    {item.phone}
                  </td>
                  <td className="px-4 py-2 border-gray-300 text-small font-normal whitespace-normal align-middle text-foreground-900">
                    {item.company.name}
                  </td>
                  <td className="px-4 py-2 border-gray-300 text-small font-normal whitespace-normal align-middle text-foreground-900">
                    {item.email}
                  </td>
                  <td className="px-4 py-1 border-gray-300 text-small font-normal whitespace-normal align-middle">
                    {/* for simple routing */}
                    {/* <button onClick={handleEdit} className=" text-white bg-blue-600 px-2 py-1 border rounded-md">Edit</button> */}
                    {/* when navigate with passing data */}
                    <button onClick={() => handleEdit(item)} className=" text-white bg-blue-600 px-2 py-1 border rounded-md">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LossConfigPage;
