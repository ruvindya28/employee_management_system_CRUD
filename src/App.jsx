import './App.css';
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus } from 'react-icons/fa';
import axios from "axios";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeLoaded, setEmployeeLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", date: "", reg: "" });

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({ _id: "", name: "", date: "", reg: "" });

  useEffect(() => {
    if (!employeeLoaded) {
      axios.get("http://localhost:5000/employees")
        .then((response) => {
          setEmployeeData(response.data);
          setEmployeeLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    }
  }, [employeeLoaded]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (newEmployee.name && newEmployee.date && newEmployee.reg) {
      axios.post("http://localhost:5000/employees", newEmployee)
        .then(() => {
          alert("Employee added successfully");
          setEmployeeLoaded(false);
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
        });

      setNewEmployee({ name: "", date: "", reg: "" });
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this employee?")) {
      axios.delete(`http://localhost:5000/employees/${id}`)
        .then(() => {
          alert("Deleted successfully");
          setEmployeeLoaded(false);
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/employees/${currentEmployee._id}`, currentEmployee)
      .then(() => {
        alert("Employee updated successfully");
        setEmployeeLoaded(false);
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 p-6 relative">
      {/* Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition-all"
      >
        <FaPlus />
        <span className="font-medium hidden sm:inline">Add Employee</span>
      </button>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">Add New Employee</h2>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Registration No</label>
                <input
                  type="text"
                  value={newEmployee.reg}
                  onChange={(e) => setNewEmployee({ ...newEmployee, reg: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={newEmployee.date}
                  onChange={(e) => setNewEmployee({ ...newEmployee, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-100"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">Update Employee</h2>
            <form onSubmit={handleUpdateEmployee} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Registration No</label>
                <input
                  type="text"
                  value={currentEmployee.reg}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, reg: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={currentEmployee.name}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={currentEmployee.date}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-100"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Table */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
          Employee Management
        </h1>

        {/* Table Header */}
        <div className="grid grid-cols-4 font-semibold text-gray-700 bg-blue-100 p-3 rounded-t-lg shadow-sm">
          <div>Registration No</div>
          <div>Name</div>
          <div>Date</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {employeeData.map((emp) => (
            <div key={emp._id} className="grid grid-cols-4 items-center bg-white hover:bg-blue-50 p-4 transition rounded-md shadow-sm mb-2">
              <div className="text-gray-700">{emp.reg}</div>
              <div className="text-gray-600">{emp.name}</div>
              <div className="text-gray-500">{emp.date}</div>
              <div className="flex justify-center gap-4">
                <button
                  className="text-blue-500 hover:text-blue-700 transition"
                  onClick={() => {
                    setCurrentEmployee(emp);
                    setShowEditModal(true);
                  }}
                >
                  <BsPencilSquare size={20} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => handleDelete(emp._id)}
                >
                  <AiFillDelete size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
