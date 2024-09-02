import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

// Define the types for form values
interface FormValues {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: File | null;
  levelType: string;
}

function CreateChallenge() {
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Challenge name is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date cannot be before start date'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Image is required'),
    levelType: Yup.string().required('Level type is required'),
  });

  // Initial values for the form
  const initialValues: FormValues = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    image: null,
    levelType: '',
  };

  // Handle form submission
  const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    setIsLoading(true);
    console.log(values)
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('startDate', values.startDate);
    formData.append('endDate', values.endDate);
    formData.append('description', values.description);
    if (values.image) {
      formData.append('image', values.image);
    }
    formData.append('levelType', values.levelType);
  
    try {
      const response = await fetch('http://localhost:8000/challenge', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create challenge. Please try again.');
      }
  
      alert('Challenge created successfully!');
      resetForm();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="w-full">
      <div className="w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Challenge Detail</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {/* Challenge Name */}
              <div>
                <label className="block text-gray-700">Challenge Name</label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-gray-700">Start Date</label>
                <Field
                  type="date"
                  name="startDate"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-gray-700">End Date</label>
                <Field
                  type="date"
                  name="endDate"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(event) =>
                    setFieldValue('image', event.currentTarget.files?.[0] || null)
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Level Type */}
              <div>
                <label className="block text-gray-700">Level Type</label>
                <Field
                  as="select"
                  name="levelType"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Field>
                <ErrorMessage
                  name="levelType"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button with Loader */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-lg shadow-md transition duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isLoading ? 'Submitting...' : 'Create Challenge'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateChallenge;
