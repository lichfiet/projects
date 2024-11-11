import { useEffect, useState, version } from 'react';
import yaml from 'js-yaml';
import { CopyBlock, dracula } from 'react-code-blocks';
import NewDealerForm from './forms/NewDealerForm';
import AddDealerForm from './forms/AddDealerForm';
import { v4 as uuidv4 } from 'uuid';

const MyForm = () => {
  const [formDataArray, setFormDataArray] = useState([]);
  const [yamlData, setYamlData] = useState("");
  const [environment, setEnvironment] = useState("prod");
  const [internal, setInternal] = useState("false");
  const [version, setVersion] = useState("2024.10.1");

  class NewDealerFormData {
    constructor(company_name, go_live, user_count, time_zone, cmfsKey, store_name, account, region, version, internal, contract_type) { constructor
      this.company_name = company_name;
      this.go_live = go_live;
      this.user_count = user_count;
      this.time_zone = time_zone;
      this.account = account;
      this.region = region;
      this.version = version;
      this.internal = internal;
      this.contract_type = "new";
      this.uuid = uuidv4();
    }
  };

  class AddDealerFormData {
    constructor(company_name, cid, account, region, cmfs, uuid) { constructor
      this.company_name = company_name;
      this.cid = cid;
      this.cmfs = cmfs;
      this.account = account;
      this.region = region;
      this.contract_type = "add";
      this.uuid = uuidv4();
    }
  }

  function MyCodeComponent(props) {
    return (
      <CopyBlock
        text={props.text}
        language={props.language}
        showLineNumbers={props.showLineNumbers}
        theme={dracula}
        codeBlock
        wrapLines={true}
      />
    );
  }

  const handleFormChange = (uuid, formData) => {
    setFormDataArray((prevForms) =>
      prevForms.map((form) =>
        form.uuid === uuid ? { ...form, ...formData[0] } : form
      )
    );
  };

  const deleteForm = (uuid) => {
    const filteredForms = formDataArray.filter((form, i) => uuid !== form.uuid);
    setFormDataArray(filteredForms);
  };

  const addForm = (type) => {
    if (type === "new") {
      setFormDataArray((prevForms) => [...prevForms, new NewDealerFormData()]);
    } else if (type === "add") {
      setFormDataArray((prevForms) => [...prevForms, new AddDealerFormData()]);
    }
  };

  const initForms = () => {
    setFormDataArray([new NewDealerFormData()]);  // Add an initial empty form object
  };
  
  useEffect(() => { 
    initForms();
  }, []);

  useEffect(() => {
    const outputData = formDataArray.map((form) => {
      if (form.contract_type === "new") {
        return {
          company_name: form.company_name || "",
          go_live: form.go_live || "",
          user_count: Number(form.user_count || 0),
          time_zone: form.time_zone || "",
          cmfs: form.cmfs,
          account: environment,
          region: form.region || "",
          version: version,
          internal: internal,
          contract_type: form.contract_type || "",
        }
      } else if (form.contract_type === "add") {
        return {
          company_name: form.company_name || "",
          cid: form.cid || "",
          cmfs: form.cmfs,
          account: environment || "",
          region: form.region || "",
          contract_type: form.contract_type || "",
        }
      }
    });
    const yamlDataRaw = yaml.dump(outputData);
  
    // Add line breaks between top-level objects
    const yamlDataWithSpaces = yamlDataRaw.replace(/^- /gm, '\n- ');
    
    setYamlData(yamlDataWithSpaces);
    console.log("Yaml data with spaces:", yamlDataWithSpaces);
  }, [formDataArray, environment, version, internal]);

  return (
    <div className='m-auto max-w-6xl'>
      <div className='m-auto pt-10'>
        <h1 className="text-1xl font-bold underline"> Global Settings </h1>
        <form className='flex flex-col gap-1'>
          <div>
            <label>Environment:</label>
            <select onChange={(e) => setEnvironment(e.target.value)} value={environment}>
              <option value="prod">Prod</option>
              <option value="dev">Dev</option>
              <option value="stage">Stage</option>
            </select>
          </div>
          <div>
            <label>Internal</label>
            <select onChange={(e) => setInternal(e.target.value)} value={internal}>
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
          <div>
            <label>Version:</label>
            <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} />
          </div>
        </form>
      </div>
      <div className='flex flex-row justify-center gap-4'>
        <div className='p-10 flex flex-col gap-4'>
          {formDataArray.map((form) => (
            form.contract_type === "new" ? (
              <NewDealerForm
                key={form.uuid}
                onChange={handleFormChange}
                deleteForm={() => deleteForm(form.uuid)}
                formData={form}
              />
            ) : (
              <AddDealerForm
                key={form.uuid}
                onChange={handleFormChange}
                deleteForm={() => deleteForm(form.uuid)}
                formData={form}
              />
            ) 
          ))}
          <div className='flex justify-center items-center gap-8'>
            <button className='bg-neutral-600 p-2 rounded-2xl' onClick={() => addForm("new")}>Add New Dealer</button>
            <button className='bg-neutral-600 p-2 rounded-2xl' onClick={() => addForm("add")}>Add Addtl Dealer</button>
          </div>
      </div>
      <div className='m-auto w-full'>
        <h1 className="text-1xl font-bold underline">
          Output
        </h1>
        <MyCodeComponent
          text={yamlData}
          language="yaml"
          showLineNumbers={true}
        />
      </div>

      </div>
    </div>
  );
};

export default MyForm;