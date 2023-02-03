import React, {useEffect, useState} from "react";
import "./usermanagement.css";
import { PencilSquare } from "react-bootstrap-icons";
import { useDispatch } from 'react-redux';
import { UsersService } from '../../services/usersServices';
import { ApprovalActions } from "../../config/redux/actions/authActions";

const UserManagement = () => {
  const [update, setUpdate] = useState(false)
  const [users, setUsers] = React.useState([]);
  const [formValues, setFormValues] = useState([])
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    UsersService.getUsers().then((res) => {
      setUsers(res.data.data);
    });
  }, [update])

  const modalHandler = async (id) => {
    const UserssHit = await UsersService.getUsersById(id)
    setFormValues(UserssHit.data.data)
}

  // const approvalHandler = async (id) => {
  //   console.log(id)
  //   await UsersService.approval(id)
  //   setUpdate(!update)
  // }
  const approvalHandler = async () => {
    dispatch({type: 'PROGRESS'})
   await dispatch(ApprovalActions(formValues.id,formValues));
   setUpdate(!update)
}

  // const approvalHandler = () => {
  //   UsersService.approval(formValues.id).then((res) => { 
  //     console.log(res)
  //   })
  //   setUpdate(!update)
  // }

  return (
    <>
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Users</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          
        </div>
      </div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status Account</th>
                  <th scope="col">Approved Account</th>
                  <th scope="col">Approval</th>
                </tr>
              </thead>
              <tbody>
                {users.map((users, index) => {
                return (
                <>
                    <tr>
                    <td>{index + 1}</td>
                    <td>{users.id}</td>
                    <td>{users.username}</td>
                    <td>{users.email}</td>
                    <td>{users.name}</td>
                    <td>{users.role}</td>
                    <td>{users.is_verified_account === true ? 'Actived':'Not Active'}</td>
                    <td>{users.is_verified_role === true ? 'Approved':'Not Approved'}</td>
                    {/* MODAL */}
                        {/* <!-- Button trigger modal --> */}
                        <td>
                          <button onClick={approvalHandler} />
                        {/* <p className='p-4 text-danger' onClick={approvalHandler}>Read All</p> */}
                        </td>
                        
                    </tr>
                </>
              )
            })}
              </tbody>
            </table>
            </div>
            </main>
    </>
  );
}

export default UserManagement;