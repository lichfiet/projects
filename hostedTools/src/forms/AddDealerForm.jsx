import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';

const AddDealerForm = ({ onChange, deleteForm, formData }) => {

  const { register, control } = useForm({
    defaultValues: {
      cmfs: formData.cmfs || [{ cmfsKey: "", store_name: "" }],
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cmfs"
  });

  const formValues = useWatch({ control });

  const outputData = [
    {
      company_name: formValues?.company_name || "",
      cid: formValues?.cid || "",
      region: formValues?.region || "",
      contract_type: "add",
      cmfs: formValues?.cmfs?.reduce((result, cmf) => {
        if (cmf.cmfsKey && cmf.store_name) {
          result[cmf.cmfsKey] = { store_name: cmf.store_name };
        }
        return result;
      }, {}),
      uuid: formData.uuid,
    }
  ];

  const handleFormChange = () => {
    onChange(formData.uuid, outputData);
  };

  useEffect(() => {
    handleFormChange();
  }, [formValues]);

  return (
    <div className='m-auto max-w-2xl shadow-2xl'>
      <h1 className='text-xl font-bold underline'>Dealer: {formData.company_name}</h1>
      <div className='bg-neutral-900 p-4 rounded-3xl flex flex-col gap-4'>
        <form className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label>Company Name:</label>
            <input type="text" {...register("company_name")} className='text-right' />
          </div>
          <div className='flex justify-between items-center'>
            <label>CID:</label>
            <input type="text" {...register("cid")} className='text-right' />
          </div>
          <div>
            <label>Cmf(s):</label>
            <ul className='p-3 bg-neutral-800 rounded-xl'>
              {fields.map((item, index) => (
                <li key={item.id}>
                  <div className='flex justify-between items-center'>
                    <input
                      placeholder="cmf"
                      {...register(`cmfs.${index}.cmfsKey`)}
                      className='text-left'
                    />
                    <input
                      placeholder="Store Name"
                      {...register(`cmfs.${index}.store_name`)}
                      className='text-left'
                    />
                    <button type="button" onClick={() => remove(index)}><i className="fa-solid fa-trash"></i></button>
                  </div>
                </li>
              ))}
              <button
                type="button"
                className='text-sm p-1 w-full mt-1 bg-neutral-700 rounded-3xl'
                onClick={() => append({ cmfsKey: "", store_name: "" })}
              >
                Add Cmf+
              </button>
            </ul>
          </div>
          <div className='flex justify-between items-center'>
            <label>Region:</label>
            <select {...register("region")} className='text-left'>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>
        </form>
        <button className='bg-neutral-700 rounded-3xl' onClick={deleteForm}><i className="fa-solid fa-trash"></i></button>
      </div>
    </div> 
  );
};

export default AddDealerForm;