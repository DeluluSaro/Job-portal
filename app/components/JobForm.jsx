'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema } from '@/lib/validations';
import { createJob } from '@/lib/actions';

// --- Icon components for the buttons ---
const ChevronDownIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const DoubleArrowIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>;
const CalendarIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;


const Input = ({ name, label, register, error, ...props }) => (
  <div>
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input id={name} {...register(name)} {...props} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`} />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

const Select = ({ name, label, register, error, children, ...props }) => (
    <div>
        <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <select id={name} {...register(name)} {...props} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} bg-white`}>
            {children}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

const Textarea = ({ name, label, register, error, ...props }) => (
  <div>
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
    <textarea id={name} {...register(name)} {...props} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`} rows="4" />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

export default function JobForm({ closeModal }) {
  const [state, formAction] = useFormState(createJob, { message: '', errors: {} });
  const formRef = useRef(null);
  
  const { register, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: { jobType: 'Full-time' }
  });

  useEffect(() => {
    if (state.message?.includes('successfully')) {
      formRef.current?.reset();
      closeModal();
    }
  }, [state, closeModal]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="title" label="Job Title" register={register} error={errors.title || state.errors?.title?.[0]} placeholder="e.g. Full Stack Developer" />
        <Input name="companyName" label="Company Name" register={register} error={errors.companyName || state.errors?.companyName?.[0]} placeholder="Amazon, Microsoft, Swiggy" />
        <Select name="location" label="Location" register={register} error={errors.location || state.errors?.location?.[0]}>
            <option value="">Choose Preferred Location</option>
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Remote</option>
        </Select>
        <Select name="jobType" label="Job Type" register={register} error={errors.jobType || state.errors?.jobType?.[0]}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
        </Select>
        
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Salary Range (LPA)</label>
            <div className="flex items-center gap-2">
                <Input name="minSalary" register={register} error={errors.minSalary || state.errors?.minSalary?.[0]} placeholder="₹0" type="number" step="0.1" />
                <Input name="maxSalary" register={register} error={errors.maxSalary || state.errors?.maxSalary?.[0]} placeholder="₹12" type="number" step="0.1" />
            </div>
        </div>

        <div>
            <label htmlFor="applicationDeadline" className="block mb-1 text-sm font-medium text-gray-700">Application Deadline</label>
            <div className="relative">
                <input id="applicationDeadline" name="applicationDeadline" {...register("applicationDeadline")} type="date" className={`w-full pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.applicationDeadline ? 'border-red-500' : 'border-gray-300'}`} />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CalendarIcon />
                </div>
            </div>
            {errors.applicationDeadline && <p className="text-red-500 text-xs mt-1">{errors.applicationDeadline.message}</p>}
        </div>
      </div>
       
      <Textarea name="description" label="Job Description" register={register} error={errors.description || state.errors?.description?.[0]} placeholder="Please share a description to let the candidate know more about the job role" />
      
      {state.message && !state.message.includes('success') && <p className="text-red-500 text-sm">{state.message}</p>}
      
      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
            type="submit"
            name="intent"
            value="draft"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50"
        >
          Save Draft <ChevronDownIcon />
        </button>
        <button
            type="submit"
            name="intent"
            value="publish"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 disabled:bg-blue-300"
        >
          Publish <DoubleArrowIcon />
        </button>
      </div>
    </form>
  );
}