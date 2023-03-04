import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./registerUser.css"
import IconDaftar from "../../assets/icons/daftar.svg";
import Select from "react-select";
import { AddressService } from "../../services/addressServices";

const RegisterUser = () => {
  const [formValues, setFormValues] = useState([]);

  const [province, setProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [regency, setRegency] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [village, setVillage] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState(null);

  console.log(formValues)
  const history = useNavigate();
  const dispatch = useDispatch();

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
    const provinceId = selectedOption?.id;
    fetchRegency(provinceId);
  };

  const handleRegencyChange = (selectedOption) => {
    setSelectedRegency(selectedOption);
    const regencyId = selectedOption?.id;
    fetchDistrict(regencyId);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    const districtId = selectedOption?.id;
    fetchVillage(districtId);
  };

  const handleVillageChange = (selectedOption) => {
    setSelectedVillage(selectedOption);
  };

  const selectStyles = {
    // control: (provided, state) => ({
    //   ...provided,
    //   background: '#fff',
    //   borderColor: '#9e9e9e',
    //   minHeight: '30px',
    //   height: '30px',
    //   boxShadow: state.isFocused ? null : null,
    // }),

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

  const combinedAddres = (`${selectedVillage?.label}, ${selectedDistrict?.label}, ${selectedRegency?.label}, ${selectedProvince?.label}`);
  console.log(combinedAddres)

  const handleSubmit = () => {
    console.log(formValues)
    // dispatch(registerActions(data, history));
  };


  return (
    <>
      <div className="content mx-auto my-5 px-5 py-5">
        <div className="container">
          <h3 className="mb-4 fw-bold text-center">DAFTAR AKUN</h3>
          <div className="row d-flex justify-content-center ">
            <div className="col">
              <div className="form-group mb-3">
                <label className="mb-3">Nama Lengkap*</label>
                <div className="col">
                  <input
                    className="form-control form-register"
                    type="text"
                    placeholder="Nama lengkap..."
                    aria-label=""
                    name='name'
                    required
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
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
                    className="form-control form-register"
                    type="text"
                    placeholder="Username..."
                    aria-label=""
                    name='username'
                    required
                    onChange={(e) => setFormValues({ ...formValues, username: e.target.value })} />
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
                    className="form-control form-register"
                    type="password"
                    placeholder="Password..."
                    aria-label=""
                    name='password'
                    required
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row d-flex justify-content-center ">
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
            </div> */}
          <div className="row d-flex justify-content-center ">
            <div className="col">
              <div className="form-group mb-3">
                <label className="mb-3">Email*</label>
                <div className="col">
                  <input
                    className="form-control form-register"
                    type="text"
                    placeholder="Masukkan email..."
                    aria-label=""
                    name='email'
                    required
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
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
                    onChange={(e) => setFormValues({ ...formValues, role: e.target.value })} >
                    <option>CALEG</option>
                    <option>{combinedAddres}</option>
                    <option>KOORDES</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* <div style={{width: 200, height: 30}}> */}
          <Select
            options={provinceOptions}
            value={selectedProvince}
            onChange={handleProvinceChange}
            styles={selectStyles}
            placeholder=""
          />
          {/* </div> */}
          {/* <div className="m-auto w-50"> */}
          <Select
            options={regencyOptions}
            value={selectedRegency}
            onChange={handleRegencyChange}
            styles={selectStyles}
            placeholder=""
            isDisabled={!selectedProvince}
          />
          {/* </div> */}
          {/* <div className="m-auto w-50"> */}
          <Select
            options={districtOptions}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            styles={selectStyles}
            placeholder=""
            isDisabled={!selectedRegency}
          />
          {/* </div> */}
          {/* <div className="m-auto w-50"> */}
          <Select
            options={villageOptions}
            value={selectedVillage}
            onChange={handleVillageChange}
            styles={selectStyles}
            placeholder=""
            isDisabled={!selectedDistrict}
          />

          {/* </div> */}
          <input
            type="hidden"
            name="address"
            value={combinedAddres}
            // ref={register}
            onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
          />

          <div className="mt-5">
            <button className="button form-control btn btn-danger button-register mb-3 align-item-center text-white fw-bold" onClick={handleSubmit}>
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
        </div>
      </div>
    </>
  );
}

export default RegisterUser;