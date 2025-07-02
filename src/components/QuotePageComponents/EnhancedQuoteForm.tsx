import React from 'react';
import { useQuoteForm } from './hooks/useQuoteForm';
import { FormHeader } from './FormHeader';
import { FormStep1 } from './FormStep1';
import { FormStep2 } from './FormStep2';
import { FormStep3 } from './FormStep3';

const EnhancedQuoteForm = React.forwardRef<HTMLDivElement>((props, ref) => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    step,
    isSubmitting,
    serviceType,
    getProgress,
    handleServiceTypeChange,
    onSubmit,
    goBack
  } = useQuoteForm(ref as React.RefObject<HTMLDivElement>);

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">
      <FormHeader step={step} getProgress={getProgress} />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {step === 1 && (
          <FormStep1
            control={control}
            errors={errors}
            handleServiceTypeChange={handleServiceTypeChange}
          />
        )}
        
        {step === 2 && (
          <FormStep2
            serviceType={serviceType}
            control={control}
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            goBack={goBack}
          />
        )}
        
        {step === 3 && (
          <FormStep3
            register={register}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            goBack={goBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
});

EnhancedQuoteForm.displayName = 'EnhancedQuoteForm';

export default EnhancedQuoteForm;