import React, { useEffect, useState } from "react";
import Input from "../components/elememts/Input";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State for editing user
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData
      );
      console.log("User saved:", response.data);
      setFormData({ name: "", email: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error Fetching the data", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to open the modal with user data
  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };
  // Function to open the modal of delete
  const handleDeleteClick = (user) => {
    setEditingUser(user);
    setShowDeleteModal(true);
  };

  // Function to close the modal of delete
  const handleDeleteCloseModal = () => {
    setEditingUser(null);
    setShowDeleteModal(false);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setEditingUser(null);
    setShowModal(false);
  };

  // Function to handle modal form change
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to save changes of edit
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${editingUser.id}`,
        editingUser
      );
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Function to save changes of delete
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${editingUser.id}`,
        editingUser
      );
      fetchUsers();
      handleDeleteCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center">Users</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="floatingName">Enter Name</label>
            <Input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              id="floatingName"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="floatingEmail" className="mt-3">
              Enter Email
            </label>
            <Input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              id="floatingEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
        <div className="mt-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No items are available
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-2"
                        onClick={() => handleDeleteClick(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="editName">Name</label>
                <Input
                  type="text"
                  id="editName"
                  name="name"
                  className="form-control"
                  value={editingUser.name}
                  onChange={handleModalChange}
                />
                <label htmlFor="editEmail" className="mt-3">
                  Email
                </label>
                <Input
                  type="email"
                  id="editEmail"
                  name="email"
                  className="form-control"
                  value={editingUser.email}
                  onChange={handleModalChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleDeleteCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <h5>Are you sure want to Delete ?</h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleDeleteCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
