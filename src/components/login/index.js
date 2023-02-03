import React from "react";
import "./login.css";
import IconMasuk from "../../assets/icons/masuk.svg";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { loginActions, verifyAccountActions } from "../../config/redux/actions/authActions";

const LoginComponent = (props) => {
  const history = useNavigate();
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm();

    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(loginActions(data, history));
    }

    // Verify Account From Email
    if (props.tokenVerify) {
      const token={token :props.tokenVerify};
      dispatch(verifyAccountActions(token, history));
      console.log(token);
  }

  return (
    <>
      <div className="content mx-auto my-5 px-5 py-5">
        <div className="container">
          <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mb-4 fw-bold text-center">MASUK</h3>
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <div className="col">
                    <input className={errors.username ? "form-control border-danger form-register" : "form-control form-register"}
                    type="text" placeholder="Username..." 
                    aria-label="" 
                    name="username" 
                    {...register('username', {
                      required: "Username is Required",
                      maxLength: {
                        value: 15,
                        message: "Username Too Long",
                      },
                    })}/>
                    {errors.username && <p className="text-danger">{errors.username.message}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <div className="col">
                    <input className={errors.password?"form-control ps-4 border-danger":"form-control ps-4"} 
                    type="password" 
                    placeholder="Password..." 
                    aria-label="" 
                    name="password" 
                    {...register('password',{
                      required: "Please enter your password",
                      minLength: {
                          value: 8,
                          message: "Password Too Short",
                      },
                      maxLength: {
                          value: 18,
                          message: "Password Too Long",
                      },
                      }
                  )}/>
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button  className={isDirty && isValid?'button form-control btn btn-danger button-register mb-3 align-item-center text-white fw-bold':'button form-control opacity-50 btn btn-danger button-register mb-3 align-item-center text-white fw-bold'} placeholder="Default input" aria-label="default input example" disabled={!isDirty || !isValid}>
                <img src={IconMasuk} alt="icon-masuk" className="icon-masuk" />
                MASUK
              </button>
            </div>
            <p className="text-medium">
              Belum punya akun ?{" "}
              <a href="/register" className="text-danger fw-bold text-decoration-none">
                {" "}
                Daftar
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
