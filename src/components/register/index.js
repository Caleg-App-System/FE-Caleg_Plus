import React from "react";
import "./register.css";
import IconDaftar from "../../assets/icons/daftar.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerActions } from "../../config/redux/actions/authActions";

const RegisterComponent = () => {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data)
    dispatch(registerActions(data, history));
  };

  return (
    <>
      <div className="content mx-auto my-5 px-5 py-5">
        <div className="container">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mb-4 fw-bold text-center">DAFTAR AKUN</h3>
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <label className="mb-3">Username*</label>
                  <div className="col">
                    <input
                      className={errors.username ? "form-control border-danger form-register" : "form-control form-register"}
                      type="text"
                      placeholder="Username..."
                      aria-label=""
                      name='username'
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
                  <label className="mb-3">Password*</label>
                  <div className="col">
                    <input
                      className={errors.password ? "form-control border-danger form-register" : "form-control form-register"}
                      type="password"
                      placeholder="Password..."
                      aria-label=""
                      name="password"
                      {...register("password", {
                        required: "Password is Required",
                        minLength: {
                          value: 8,
                          message: "Password Too Short",
                        },
                        maxLength: {
                          value: 18,
                          message: "Password Too Long",
                        },
                        validate: (value) => value === getValues("confirmPassword") || "Password doesn't match",
                      })}
                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <label className="mb-3">Confirmation Password*</label>
                  <div className="col">
                    <input
                      className={errors.confirmPassword ? "form-control border-danger form-register" : "form-control form-register"}
                      type="password"
                      placeholder="Masukan kembali password anda..."
                      aria-label=""
                      name="passconfirm"
                      {...register("confirmPassword", {
                        required: "Password is Required",
                        minLength: {
                          value: 8,
                          message: "Password Too Short",
                        },
                        maxLength: {
                          value: 18,
                          message: "Password Too Long",
                        },
                        validate: (value) => value === getValues("password") || "Password doesn't match",
                      })}
                    />
                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <label className="mb-3">Email*</label>
                  <div className="col">
                    <input
                      className={errors.email ? "form-control border-danger form-register" : "form-control form-register"}
                      type="email"
                      placeholder="Email..."
                      aria-label=""
                      name="email"
                      {...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Please input true email.",
                        },
                      })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button className={dirtyFields && isValid ? "button form-control btn btn-danger button-register mb-3 align-item-center text-white fw-bold" : "button form-control opacity-50 btn btn-danger button-register mb-3 align-item-center text-white fw-bold"} onClick={handleSubmit}>
                <img src={IconDaftar} alt="icon-daftar" className="icon-daftar" />
                DAFTAR
              </button>
            </div>
            <p className="text-medium">
              Email Sudah Terdaftar ?{" "}
              <a href="/login" className="text-danger fw-bold text-decoration-none">
                {" "}
                Masuk
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
