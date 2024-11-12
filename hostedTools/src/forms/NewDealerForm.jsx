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
    <div className='m-auto w-full max-w-lg shadow-2xl'>
      <h1 className='font-bold underline'>Dealer: {formData.company_name}</h1>
      <div className='bg-neutral-900 p-4 rounded-xl flex flex-col gap-4'>
        <form className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label className='text-sm'>Company Name:</label>
            <input type="text" {...register("company_name")} className='text-right text-sm' />
          </div>
          <div className='flex justify-between items-center'>
            <label className='text-sm'>Go Live (YYYY-MM-DD):</label>
            <input type="text" {...register("go_live")} className='text-right text-sm' />
          </div>
          <div className='flex justify-between items-center'>
            <label className='text-sm'>User Count:</label>
            <input type="number" {...register("user_count")} className='text-right text-sm' />
          </div>
          <div className='flex justify-between items-center'>
            <label className='text-sm'>Time Zone:</label>
            <select {...register("time_zone")} className='text-left text-sm'>
              <option value="false">PST</option>
              <option value="true">CST</option>
              <option value="true">EST</option>
            </select>          
          </div>
          <div className='flex justify-between items-center'>
            <label className='text-sm'>Region:</label>
            <select {...register("region")} className='text-left text-sm'>
              <option value="false">East</option>
              <option value="true">West</option>
            </select>
          </div>
          <div>
            <label className='text-sm'>Cmf(s):</label>
            <ul className='p-2 my-2 bg-neutral-800 rounded-lg'> 
              {fields.map((item, index) => (
                <li key={item.id} className='mb-2'>
                  <div className='flex justify-between items-center'>
                    <input
                      placeholder="Cmf"
                      {...register(`cmfs.${index}.cmfsKey`)}
                      className='w-40 text-left px-1 mx-1 rounded text-sm'
                    /> : 
                    <input
                      placeholder="Store Name"
                      {...register(`cmfs.${index}.store_name`)}
                      className='text-left mx-1 px-1 rounded text-sm'
                    />
                    <button type="button" className="ml-1 text-sm" onClick={() => remove(index)}><i class="fa-solid fa-trash"></i></button>
                  </div>
                </li>
              ))}
            <button type="button" className='text-sm p-0.5 w-full bg-neutral-700 rounded-lg' onClick={() => append({ cmfsKey: "", store_name: "" })}>  
              Add <icon className="fa-solid fa-plus"></icon>
            </button>
            </ul>
          </div>
        </form>
        <button className='bg-neutral-700 rounded-3xl text-sm' onClick={deleteForm}>Delete <i className="fa-solid fa-trash"></i></button>
      </div>
    </div> 
  );
};

export default NewDealerForm;