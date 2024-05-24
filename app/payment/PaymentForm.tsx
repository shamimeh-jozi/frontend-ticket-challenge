import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
};

interface PaymentFormProps {
  processing: boolean;
  onSubmit: (x: FormData) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ processing, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <div className='form-group'>
        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          {...register("firstName", { required: "First name is required" })}
          className={errors.firstName ? "input error" : "input"}
        />
        {errors.firstName && (
          <p className='error'>{errors.firstName.message}</p>
        )}
      </div>
      <div className='form-group'>
        <label htmlFor='lastName'>Last Name</label>
        <input
          id='lastName'
          {...register("lastName", { required: "Last name is required" })}
          className={errors.lastName ? "input error" : "input"}
        />
        {errors.lastName && <p className='error'>{errors.lastName.message}</p>}
      </div>
      <button
        type='submit'
        className='button'
        disabled={!isValid || processing}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
