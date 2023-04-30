import React, { useState, useEffect } from "react";
import "./register.css";
import IconDaftar from "../../assets/icons/daftar.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerActions } from "../../config/redux/actions/authActions";
import Select from "react-select";
import { AddressService } from "../../services/addressServices";

const RegisterComponent = () => {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      address: "",
    }
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(registerActions(data, history));
  };

  const [province, setProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [regency, setRegency] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [village, setVillage] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [Rt, setRt] = useState(null);
  const [Rw, setRw] = useState(null);

  const [combineValue, setCombineValue] = useState(null);

  // First data for province
  useEffect(() => {
    AddressService.getAllProvince().then((res) => {
      setProvince(res.data.data);
    });
  }, []);

  // fetching 
  const fetchRegency = (provinceId) => {
    AddressService.getRegency(provinceId).then((res) => {
      setRegency(res.data.data);
    });
  };

  const fetchDistrict = (regencyId) => {
    AddressService.getDistrict(regencyId).then((res) => {
      setDistrict(res.data.data);
    });
  };

  const fetchVillage = (districtId) => {
    AddressService.getVillage(districtId).then((res) => {
      setVillage(res.data.data);
    });
  };

  // Options maping
  const provinceOptions = province.map((province) => ({
    id: province.id,
    label: province.name,
  }));

  const regencyOptions = regency.map((regency) => ({
    id: regency.id,
    label: regency.name,
  }));

  const districtOptions = district.map((district) => ({
    id: district.id,
    label: district.name,
  }));

  const villageOptions = village.map((village) => ({
    id: village.id,
    label: village.name,
  }));

  // Handle change
  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setCombineValue(selectedOption && selectedVillage && selectedDistrict && selectedRegency ? `${selectedVillage.label}, ${selectedDistrict.label}, ${selectedRegency.label}, ${selectedOption.label}` : null);
    const provinceId = selectedOption.id;
    fetchRegency(provinceId);
  };

  const handleRegencyChange = (selectedOption) => {
    setSelectedRegency(selectedOption);
    setCombineValue(selectedOption && selectedVillage && selectedDistrict && selectedProvince ? `, ${selectedVillage.label},  ${selectedDistrict.label}, ${selectedOption.label}, ${selectedProvince.label}` : null);
    const regencyId = selectedOption.id;
    fetchDistrict(regencyId);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setCombineValue(selectedOption && selectedVillage && selectedRegency && selectedProvince ? `${selectedVillage.label}, ${selectedOption.label}, ${selectedRegency.label}, ${selectedProvince.label}` : null)
    const districtId = selectedOption.id;
    fetchVillage(districtId);
  };

  const handleVillageChange = (selectedOption) => {
    setCombineValue(selectedOption && selectedDistrict && selectedRegency && selectedProvince ? `${selectedOption.label}, ${selectedDistrict.label}, ${selectedRegency.label}, ${selectedProvince.label}` : null)
    setSelectedVillage(selectedOption);
  };

  const handleRtChange = (e) => {
    setCombineValue(e.target.value && selectedVillage && selectedDistrict && selectedRegency && selectedProvince ? `RT. ${e.target.value}, ${selectedVillage.label}, ${selectedDistrict.label}, ${selectedRegency.label}, ${selectedProvince.label}` : null);
    setRt(e.target.value);
  };

  const handleRwChange = (e) => {
    setCombineValue(e.target.value && Rt && selectedVillage && selectedDistrict && selectedRegency && selectedProvince ? `RT. ${Rt}, RW. ${e.target.value}, ${selectedVillage.label}, ${selectedDistrict.label}, ${selectedRegency.label}, ${selectedProvince.label}` : null);
    setRw(e.target.value);
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      // background: '#fff',
      // borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '20px',
      padding: '0 0'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '20px',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'red',
      fontSize: '14px',

    }),
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
                  <label className="mb-3">Nama Lengkap*</label>
                  <div className="col">
                    <input
                      className={errors.name ? "form-control border-danger form-register" : "form-control form-register"}
                      type="text"
                      placeholder="Nama lengkap..."
                      aria-label=""
                      name='name'
                      {...register('name', {
                        required: "Nama harus diisi",
                      })} />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                  </div>
                </div>
              </div>
            </div>
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
                        required: "Username harus diisi",
                        maxLength: {
                          value: 15,
                          message: "Username terlalu panjang",
                        },
                      })} />
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
                        required: "Password harus diisi",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                          message: "Password harus 8 karakter disertai minimal huruf besar, angka, dan karakter khusus",
                        },
                        maxLength: {
                          value: 18,
                          message: "Password terlalu panjang",
                        },
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
                        required: "Password korfirmasi harus diisi",
                        maxLength: {
                          value: 18,
                          message: "Password terlalu panjang",
                        },
                        validate: (value) => value === getValues("password") || "Password tidak sesuai",
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
                        required: "Email harus diisi",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Tolong masukkan email yang benar.",
                        },
                      })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <label className="mb-3">Registrasi sebagai</label>
                  <div className="col">
                    <select
                      className="form-select"
                      name='role'
                      {...register('role')}>
                      <option>CALEG</option>
                      <option>SAKSI</option>
                      <option>KOORDES</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center ">
              <div>
                Alamat:
              </div>
              <div className="col-5 mb-3">
                <div style={{ width: 150 }}>
                  Provinsi
                  <Select
                    options={provinceOptions}
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    styles={selectStyles}
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-5 mb-3">
                <div style={{ width: 150 }}>
                  Kabupaten/kota
                  <Select
                    options={regencyOptions}
                    value={selectedRegency}
                    onChange={handleRegencyChange}
                    styles={selectStyles}
                    placeholder=""
                    isDisabled={!selectedProvince}
                  />
                </div>
              </div>
              <div className="col-5 mb-3">
                <div style={{ width: 150 }}>
                  Kecamatan
                  <Select
                    options={districtOptions}
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    styles={selectStyles}
                    placeholder=""
                    isDisabled={!selectedRegency}
                  />
                </div>
              </div>
              <div className="col-5 mb-3">
                <div style={{ width: 150 }}>
                  Kelurahan/desa
                  <Select
                    options={villageOptions}
                    value={selectedVillage}
                    onChange={handleVillageChange}
                    styles={selectStyles}
                    placeholder=""
                    isDisabled={!selectedDistrict}
                  />
                </div>
              </div>
              {/* Masukan RT */}

            </div>
            <div className="row d-flex justify-content-center ">
              <div className="col-5 mb-3">
                <div style={{ width: 150 }}>
                  RT
                  <input
                    className="form-control form-register address-detail"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Ketik angka ..."
                    aria-label=""
                    name="RT"
                    onChange={handleRtChange}
                  />
                </div>
              </div>
              {/* Masukan RW */}
              <div className="col-5 mb-3">
                <div style={{ width: 150 }}>
                  RW
                  <input
                    className="form-control form-register address-detail"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Ketik angka ..."
                    aria-label=""
                    name="RW"
                    onChange={handleRwChange}
                  />
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <label className="mb-3">Alamat yang dimasukkan:</label>
                  <div className="col">
                    <input
                      type="text"
                      className={errors.address ? "form-control border-danger form-register" : "form-control form-register"}
                      style={{ height: "30px" }}
                      name="address"
                      value={combineValue}
                      {...register('address', {
                        required: "Pastikan alamat sudah benar",
                      })}
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
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
