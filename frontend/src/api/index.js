import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  
});

export const login = async (email, password) => {
  return await api.post('/auth/login', { email, password });
};

export const createPatient = async (patientData) => {
  return await api.post('/manager/patients', patientData);
};

export const createFoodPlan = async (foodPlanData) => {
  return await api.post('/manager/food-plan', foodPlanData);
};
