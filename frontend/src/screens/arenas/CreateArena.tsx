import React, { useState } from "react";

import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  nickname: string;
  address: string;
  numberOfRinks: number;
  hoursBetweenGames: string;
  minutesBetweenGames: string;
  operationStart: string;
  operationEnd: string;
}

export default function CreateArena() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    nickname: "",
    address: "",
    numberOfRinks: 1,
    hoursBetweenGames: "01",
    minutesBetweenGames: "00",
    operationStart: "09:00",
    operationEnd: "22:00",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="px-4 py-2 flex items-center">
        <button onClick={() => navigate(-1)} className="btn btn-ghost">
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold ml-4">Add Arena</h1>
      </div>
      <div className="flex flex-col items-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Arena Name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="nickname">
                <span className="label-text">Nickname (optional)</span>
              </label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="address">
                <span className="label-text">Address</span>
              </label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="numberOfRinks">
                <span className="label-text">Number of Rinks</span>
              </label>
              <input
                id="numberOfRinks"
                type="number"
                name="numberOfRinks"
                placeholder="Number of Rinks"
                value={String(formData.numberOfRinks)}
                onChange={handleChange}
                className="input input-bordered"
                min="1"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-end">
              <div className="form-control">
                <label className="label" htmlFor="hoursBetweenGames">
                  <span className="label-text">Hours Between Games</span>
                </label>
                <select
                  id="hoursBetweenGames"
                  name="hoursBetweenGames"
                  value={formData.hoursBetweenGames}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  {[...Array(24)].map((_, i) => (
                    <option key={i} value={i < 10 ? `0${i}` : `${i}`}>
                      {i} hr
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="minutesBetweenGames">
                  <span className="label-text">Minutes Between Games</span>
                </label>
                <select
                  id="minutesBetweenGames"
                  name="minutesBetweenGames"
                  value={formData.minutesBetweenGames}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  {["00", "15", "30", "45"].map((min) => (
                    <option key={min} value={min}>
                      {min} min
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label" htmlFor="operationStart">
                  <span className="label-text">Operation Start Time</span>
                </label>
                <input
                  id="operationStart"
                  type="time"
                  name="operationStart"
                  value={formData.operationStart}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="operationEnd">
                  <span className="label-text">Operation End Time</span>
                </label>
                <input
                  id="operationEnd"
                  type="time"
                  name="operationEnd"
                  value={formData.operationEnd}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
