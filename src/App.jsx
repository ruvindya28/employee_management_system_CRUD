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
      axios.get("https://employee-management-system-backend-crud.onrender.com/employees")
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
      axios.post("https://employee-management-system-backend-crud.onrender.com/employees", newEmployee)
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
      axios.delete(`https://employee-management-system-backend-crud.onrender.com/employees/${id}`)
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
    axios.put(`https://employee-management-system-backend-crud.onrender.com/employees/${currentEmployee._id}`, currentEmployee)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6 relative font-sans">
      {/* Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all"
      >
        <FaPlus />
        <span className="font-medium hidden sm:inline">Add Employee</span>
      </button>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-md">Employee Hub</h1>
        <p className="text-gray-600 mt-2">Efficiently manage your team with elegance</p>
      </div>

      {/* Employee Table */}
      <div className="max-w-4xl mx-auto bg-white bg-opacity-60 backdrop-blur-md border border-blue-200 rounded-3xl shadow-xl p-6 space-y-4">
        <div className="grid grid-cols-4 font-semibold text-blue-900 bg-blue-100 rounded-lg p-3">
          <div>Reg. No</div>
          <div>Name</div>
          <div>Date</div>
          <div className="text-center">Actions</div>
        </div>

        {employeeData.map((emp) => (
          <div key={emp._id} className="grid grid-cols-4 items-center bg-white/60 hover:bg-white/90 p-4 rounded-xl shadow-sm border border-blue-100 transition-all duration-300">
            <div className="text-gray-800 font-medium">{emp.reg}</div>
            <div className="text-gray-700">{emp.name}</div>
            <div className="text-gray-500">{emp.date}</div>
            <div className="flex justify-center gap-4">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setCurrentEmployee(emp);
                  setShowEditModal(true);
                }}
              >
                <BsPencilSquare size={20} />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(emp._id)}
              >
                <AiFillDelete size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <Modal
          title="Add New Employee"
          onClose={() => setShowModal(false)}
          onSubmit={handleAddEmployee}
          employee={newEmployee}
          setEmployee={setNewEmployee}
          action="Add"
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          title="Update Employee"
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateEmployee}
          employee={currentEmployee}
          setEmployee={setCurrentEmployee}
          action="Update"
        />
      )}
    </div>
  );
}

// Reusable Modal Component
function Modal({ title, onClose, onSubmit, employee, setEmployee, action }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Registration No</label>
            <input
              type="text"
              value={employee.reg}
              onChange={(e) => setEmployee({ ...employee, reg: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={employee.date}
              onChange={(e) => setEmployee({ ...employee, date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {action}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
