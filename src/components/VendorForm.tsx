import React from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';

interface VendorFormData {
  vendorId: string;
  vendorCountry: string;
  policy: string;
  legalName: string;
  tradeName: string;
  isGstRegistered: boolean;
  fullAddress: string;
  vendorType: string;
  paymentTerm: string;
  // Add other form fields as needed
}

const VendorForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<VendorFormData>();

  const onSubmit = async (data: VendorFormData) => {
    try {
      const response = await fetch('http://localhost:5000/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create vendor');
      }
      
      const result = await response.json();
      console.log('Vendor created:', result);
      // Handle success (e.g., show success message, reset form)
    } catch (error) {
      console.error('Error creating vendor:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6">
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold text-gray-900">Business Details</h2>
          
          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label htmlFor="vendorId" className="block text-sm font-medium text-gray-700">
                Vendor ID
              </label>
              <input
                type="text"
                id="vendorId"
                {...register('vendorId', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.vendorId && <p className="mt-1 text-sm text-red-600">Vendor ID is required</p>}
            </div>

            <div>
              <label htmlFor="vendorCountry" className="block text-sm font-medium text-gray-700">
                Vendor Country
              </label>
              <select
                id="vendorCountry"
                {...register('vendorCountry', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a country</option>
                <option value="India">India</option>
                {/* Add other countries as needed */}
              </select>
              {errors.vendorCountry && <p className="mt-1 text-sm text-red-600">Vendor Country is required</p>}
            </div>

            {/* Add other form fields following the same pattern */}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
          >
            Submit for Approval
          </button>
        </div>
      </div>
    </form>
  );
};

export default VendorForm;