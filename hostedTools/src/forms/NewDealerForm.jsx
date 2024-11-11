import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';

const NewDealerForm = ({ onChange, deleteForm, formData }) => {

  const { register, control } = useForm({
    defaultValues: {
      cmfs: formData.cmfs || [{ cmfsKey: "", store_name: "" }], // Initializing with one empty entry
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
      go_live: formValues?.go_live || "",
      user_count: Number(formValues?.user_count || 0),
      time_zone: formValues?.time_zone || "",
      region: formValues?.region || "",
      version: formValues?.version || "",
      internal: formValues?.internal === 'true',
      contract_type: "new",
      uuid: formData.uuid,
      cmfs: formValues?.cmfs?.reduce((result, cmf) => {
        if (cmf.cmfsKey && cmf.store_name) {
          result[cmf.cmfsKey] = { store_name: cmf.store_name };
        }
        return result;
      }, {})
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
            <label>Go Live (YYYY-MM-DD):</label>
            <input type="text" {...register("go_live")} className='text-right' />
          </div>
          <div className='flex justify-between items-center'>
            <label>User Count:</label>
            <input type="number" {...register("user_count")} className='text-right' />
          </div>
          <div className='flex justify-between items-center'>
            <label>Time Zone:</label>
            <select {...register("time_zone")} className='text-left'>
              <option value="false">PST</option>
              <option value="true">CST</option>
              <option value="true">EST</option>
            </select>          
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
                    <button type="button" onClick={() => remove(index)}><i class="fa-solid fa-trash"></i></button>
                  </div>
                </li>
              ))}
            <button type="button" className='text-sm p-1 w-full mt-1 bg-neutral-700 rounded-3xl' onClick={() => append({ cmfsKey: "", store_name: "" })}>  
              Add Cmf+
            </button>
            </ul>
          </div>
          <div className='flex justify-between items-center'>
            <label>Region:</label>
            <select {...register("region")} className='text-left'>
              <option value="false">East</option>
              <option value="true">West</option>
            </select>
          </div>
          <div className='flex justify-between items-center'>
            <label>Internal:</label>
            <select {...register("internal")} className='text-left'>
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
        </form>
        <button className='bg-neutral-700 rounded-3xl' onClick={deleteForm}><i class="fa-solid fa-trash"></i></button>
      </div>
    </div> 
  );
};

export default NewDealerForm;