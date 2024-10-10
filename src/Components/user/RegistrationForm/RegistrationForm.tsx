import React from 'react';
import './RegistrationForm.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../../api/user';

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      ;
      
      const response = await userRegister(data);


      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='form-head'>
        <h2>Let's get you set up!</h2>
        <p>Create your account and you're ready to go.</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-input'>
            <div>
              <input 
                {...register('firstName', {
                  required: 'First Name is required', 
                  pattern: { 
                    value: /^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/, 
                    message: 'Name can only contain letters' 
                  }
                })} 
                type="text" 
                name='firstName' 
                placeholder="Enter your First Name" 
              />
            </div>
            {errors.firstName && (
                <small style={{ color: 'red' }}>
                  {errors.firstName?.message?.toString()}
                </small>
              )}
            <div>
              <input 
                {...register('lastName', {
                  required: 'Last Name is required', 
                  pattern: { 
                    value: /^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/, 
                    message: 'Name can only contain letters' 
                  }
                })} 
                type="text" 
                name='lastName' 
                placeholder="Enter your Last Name" 
              />
            </div>
            {errors.lastName && (
                <small style={{ color: 'red' }}>
                  {errors.lastName?.message?.toString()}
                </small>
              )}
            <div>
              <input
                {...register('password', {
                  required: 'Please Enter Password', 
                  pattern: { 
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 
                    message: 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number'
                  }
                })} 
                type="password" 
                name='password' 
                placeholder="Enter your Password" 
              />
            </div>
            {errors.password && (
                <small style={{ color: 'red' }}>
                  {errors.password?.message?.toString()}
                </small>
              )}
          </div>
          <button className="continue-btn" type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
