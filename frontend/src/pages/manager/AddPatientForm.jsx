import React, { useState } from 'react';
import { Button, Form, Input, Textarea } from '@nextui-org/react';

function AddPatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    diseases: '',
    allergies: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergencyContact: '',
    additionalInfo: '',
  });

  const [value, setValue] = useState(false);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/manager/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create new patient');
      }

      const data = await response.json();
      console.log('Patient created successfully:', data);
      setValue(true);
      // Optionally, clear the form or navigate to another page
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Patient</h2>
        <Form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient's name"
          />
          <Input
            label="Diseases"
            name="diseases"
            value={formData.diseases}
            onChange={handleChange}
            placeholder="Enter patient's diseases"
          />
          <Input
            label="Allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="Enter patient's allergies"
          />
          <Input
            label="Room Number"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Enter room number"
          />
          <Input
            label="Bed Number"
            name="bedNumber"
            value={formData.bedNumber}
            onChange={handleChange}
            placeholder="Enter bed number"
          />
          <Input
            label="Floor Number"
            name="floorNumber"
            value={formData.floorNumber}
            onChange={handleChange}
            placeholder="Enter floor number"
          />
          <Input
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter patient's age"
            type="number"
          />
          <Input
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Enter patient's gender"
          />
          <Input
            label="Contact Info"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder="Enter patient's contact info"
          />
          <Input
            label="Emergency Contact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="Enter emergency contact"
          />
          <Textarea
            label="Additional Info"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Enter additional information"
          />
          {value && <text className="text-green-500">data added successfully!!!</text>}
          <Button type="submit" variant="flat" className="col-span-2">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddPatientForm;
