import React, { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "./Register.css"; 

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await register(formData);

      setSuccess(true);

      setFormData({ firstName: "", lastName: "", email: "", password: "" });  

      navigate("/login");    
    } catch (err) {
      setError(err.response?.data?.message || "Bu mail adresi zaten kayıtlı.");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Kayıt Ol</h2>
        {error && <p className="register-error">{error}</p>}
        {success && (
          <p className="register-success">Kayıt başarılı! Giriş yapabilirsiniz.</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">Adınız</label>
            <input
              type="text"
              name="firstName"
              placeholder="Adınız"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Soyadınız</label>
            <input
              type="text"
              name="lastName"
              placeholder="Soyadınız"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">Kayıt Ol</button>          
        </form>

        <p className="register-link">
          Zaten bir hesabınız var mı?{" "}
          <span onClick={goToLogin} className="register-link-text">
            Giriş Yap
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
