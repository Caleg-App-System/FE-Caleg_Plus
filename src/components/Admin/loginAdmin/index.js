import React from "react";
import "./loginAdmin.css"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { loginAdminActions } from '../../../config/redux/actions/authActions';
import { PersonCircle } from 'react-bootstrap-icons';
import { Helmet } from 'react-helmet';

const LoginAdmin = () => {
  const history = useNavigate();
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm();

    const dispatch = useDispatch();
    const onSubmit = (data) => {
      // console.log(data)
        dispatch(loginAdminActions(data, history));
        // console.log(props.role)
    }

  return (
    <>
      <div className="center">
      <Helmet bodyAttributes={{style: 'background : #c1c1c1'}}/>
      <p className="text-center mt-4"><PersonCircle size={90} color='#5287f0'></PersonCircle></p>
      <form className="form-loginAdmin px-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="txt_field">
          <input type="text" className={errors.username ? "form-control border-danger form-loginadmin" : "form-control form-loginadmin"}
          name="username"
          placeholder="Masukkan username"
          {...register('username', {
            required: "Username harus diisi",
          })} />
          {errors.username && <p className="text-danger">{errors.username.message}</p>}
          
        </div>
        <div className="txt_field">
          <input type="password" className={errors.password?"form-control ps-4 border-danger":"form-control ps-4"}
          name="password"
          placeholder="Masukkan password"
          {...register('password',{
            required: "Silahkan masukkan password",
          })} />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
          
        </div>
        <div className="mt-5">
              <button  className={isDirty && isValid?'form-control btn btn-primary button-loginadmin mb-3 align-item-center text-white fw-bold':'form-control opacity-50 btn btn-primary button-loginadmin mb-3 align-item-center text-white fw-bold'} placeholder="Default input" aria-label="default input example" disabled={!isDirty || !isValid}>
                MASUK
              </button>
            </div>
      </form>
    </div>
    </>
  )
}

export default LoginAdmin