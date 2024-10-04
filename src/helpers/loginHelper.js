import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const signIn = async (email, password) => {
  return axiosInstance
    .post('/crm/user/signIn', { email, password })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.message, data: {} };
    });
};
export const signUp = async (name, email, password) => {
  return axiosInstance
    .post('/crm/user/signUp', { name, email, password })
    .then((res) => {
      return { data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.message, data: {} };
    });
};
export const getResetPasswordLink = async (email) => {
  try {
    const result = await axiosInstance.get(`/crm/user/resetPasswordToken?email=${email}`);
    return { data: result.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw Error(error.response?.data?.message || error.message);
  }
};

export async function resetPassword(password, confirmPassword, token) {
  try {
    if (!token) throw Error('Invalid token or link');
    const result = await axiosInstance.post(`/crm/user/resetPassword`, {
      password,
      token,
      confirmPassword,
    });
    return { data: result.data };
  } catch (error) {
    throw Error(error.response?.data?.message || error.message);
  }
}


export async function resetPasswordWithutToken(password,orgId,email) {
  try {
    const result = await axiosInstance.post(`/crm/${orgId}/resetPassword`, {
      password,
      email
    });
    return { data: result.data };
  } catch (error) {
    throw Error(error.response?.data?.message || error.message);
  }
}
export async function validateSignUp(email) {
  try {
    await axiosInstance.post(`/crm/user/signupValidation`, {
      email,
    });
    return { data: 'success' };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw Error(error.response?.data?.message || error.message);
  }
}
