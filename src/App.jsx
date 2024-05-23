import { v4 as uuidV4 } from 'uuid';
import { useState } from 'react';
import {parse, format} from 'date-fns'
import PersonalInputs from './components/PersonalInputs';
import './styles/app.css';
import Education from './components/Education';

function App() {

    // personal details area

    const [person, setPerson] = useState({firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com', phoneNo: '444-555-444'});

    function handleChange(e) {
        const id = e.target.id;
        if (id == 'f-name') {
            setPerson({...person, firstName: e.target.value})
        } else if (id == 'l-name') {
            setPerson({...person, lastName: e.target.value})
        } else if (id == 'e-mail') {
            setPerson({...person, email: e.target.value})
        } else if (id == 'ph-no') {
            setPerson({...person, phoneNo: e.target.value})
        }
    }

    // add more personal details area 

    const [inputs, setInputs] = useState([]);

    const handlePersonalChange = (id, event) => {
        const newInputs = inputs.map(input => {
        if (input.id === id) {
            return { ...input, value: event.target.value };
        }
        return input;
        });
        setInputs(newInputs);
    };

    const addPersonal = () => {
        const newInput = { id: uuidV4(), value: '' };
        setInputs([...inputs, newInput]);
    };

    const deletePersonal = (id) => {
        const newInputs = inputs.filter(input => input.id !== id);
        setInputs(newInputs);
    };

    // education details area

    const [edu, setEdu] = useState({schoolName: 'APS', startDate: '2012-03-21', endDate: '2014-03-30'});

    function handleEducation (e) {
        let id = e.target.id;

        if (id == 'school-name') {
            setEdu({...edu, schoolName: e.target.value});
        } else if (id == 's-date') {
            setEdu({...edu, startDate: e.target.value});
        } else if (id == 'e-date') {
            setEdu({...edu, endDate: e.target.value});
        }
    }

    // add more education

    const [eduFields, setEduFields] = useState([]);

    const handleEduFields = (id, ev) => {
        const { name, value } = ev.target;
        const newFields = eduFields.map(field => {
            if (field.id === id) {
                return { ...field, [name]: { ...field[name], value } };
            }
            return field;
        });
        setEduFields(newFields);
    };

    const addEdu = () => {
        const newEdu = {
            id: uuidV4(),
            schoolName: { id: uuidV4(), value: '' },
            startDate: { id: uuidV4(), value: '' },
            endDate: { id: uuidV4(), value: '' },
        };
        setEduFields([...eduFields, newEdu]);
    };

    const delEdu = (id) => {
        const newEduFields = eduFields.filter(eduField => eduField.id !== id);
        setEduFields(newEduFields);
    };

    // add more work

    const [workFields, setWorkFields] = useState([{
        id: uuidV4(),
        companyName: { id: uuidV4(), value: 'Simons pvt ltd' },
        position: {id: uuidV4(), value: 'Sr. dev'},
        workStartDate: { id: uuidV4(), value: '2016-04-03' },
        workEndDate: { id: uuidV4(), value: '2014-03-10' },
        resp: [{id: uuidV4(), res: 'Handling servers'}, {id: uuidV4(), res: 'server maintenance'}]
    }]);

    const handleWorkFields = (id, ev) => {
        const { name, value } = ev.target;
        const newFields = workFields.map(field => {
            if (field.id === id) {
                return { ...field, [name]: { ...field[name], value } };
            }
            return field;
        });
        setWorkFields(newFields);
    };

    const addWork = () => {
        const newWork = {
            id: uuidV4(),
            companyName: { id: uuidV4(), value: '' },
            position: {id: uuidV4(), value: ''},
            workStartDate: { id: uuidV4(), value: '' },
            workEndDate: { id: uuidV4(), value: '' },
            resp: []
        };
        setWorkFields([...workFields, newWork]);
    };

    const delWork = (id) => {
        const newWorkFields = workFields.filter(workField => workField.id !== id);
        setWorkFields(newWorkFields);
    };

    // responsibilties of work

    function addRes (workId) {
        const newFields = workFields.map(field => {
            if (field.id == workId) {
                const newRes = {id: uuidV4(), res: ''};
                return {...field, resp: [...field.resp, newRes]};
            }
            return field;
        });
        setWorkFields(newFields)
    }

    function handleRes (workId, resId, ev) {
        const {value} = ev.target;
        const newField = workFields.map(field => {
            if (field.id == workId) {
                const updateResp = field.resp.map(res => {
                    if (res.id == resId) {
                        return {...res, res: value};
                    }
                    return res;
                });
                return {...field, resp: updateResp};
            }
            return field;
        });
        setWorkFields(newField);
    }

    function delRes (workId, resId) {
        const newFields = workFields.map(field => {
            if (field.id == workId) {
                const updateResp = field.resp.filter(res => res.id !== resId);
                return { ...field, resp: updateResp };
            }
            return field;
        });
        setWorkFields(newFields);
    }

    // edit mode 

    const [editMode, setEditMode] = useState(true);

    function handleEditMode() {
        setEditMode(!editMode);
    }

    // date formatting 

    function formatDate (date) {
        const Fdate = 'yyyy-mm-dd';
        const parsedDate = parse(date, Fdate, new Date());

        return ( format(parsedDate, 'dd-mm-yyyy'));

    }

    return (
        <main className='cv-app'>
            <button type='button' className='edit-btn' onClick={handleEditMode}>{editMode ? 'Save Changes' : 'Edit CV'}</button> 
            
            {editMode ? <aside className="form-area">
                <section className='con-1'>
                    <PersonalInputs person={person} 
                    handleChange={handleChange}
                    inputs={inputs}
                    handlePersonalChange={handlePersonalChange}
                    addPersonal={addPersonal}
                    deletePersonal={deletePersonal} />
                </section>
                <section className='con-2'>
                    <Education schoolName={edu.schoolName} startDate={edu.startDate} endDate={edu.endDate} handleEducation={handleEducation} />
                    <button type="button" className='add-btn' onClick={addEdu}>Add school</button>
                    {eduFields.map(field => (
                    <div className="edu-field" key={field.id}>
                        <div className="scl-con">
                            <label htmlFor={field.schoolName.id}>School name</label>
                            <input
                                type="text"
                                id={field.schoolName.id}
                                name="schoolName"
                                value={field.schoolName.value}
                                onChange={(ev) => handleEduFields(field.id, ev)}
                            />
                        </div>
                        <div className="start-date">
                            <label htmlFor={field.startDate.id}>Start date</label>
                            <input
                                type="date"
                                id={field.startDate.id}
                                name="startDate"
                                value={field.startDate.value}
                                onChange={(ev) => handleEduFields(field.id, ev)}
                            />
                        </div>
                        <div className="end-date">
                            <label htmlFor={field.endDate.id}>End date</label>
                            <input
                                type="date"
                                id={field.endDate.id}
                                name="endDate"
                                value={field.endDate.value}
                                onChange={(ev) => handleEduFields(field.id, ev)}
                            />
                        </div>
                        <button type="button" className='del-btn' onClick={() => delEdu(field.id)}>Del</button>
                    </div>
                    ))}
                </section>
                <section className="con-3">
                    <button type="button" className='add-btn' onClick={addWork}>Add Work</button>
                    {workFields.map(field => (
                    <div className="work-field" key={field.id}>
                        <div className="work-con">
                            <label htmlFor={field.companyName.id}>Company name</label>
                            <input
                                type="text"
                                id={field.companyName.id}
                                name="companyName"
                                value={field.companyName.value}
                                onChange={(ev) => handleWorkFields(field.id, ev)}
                            />
                        </div>
                        <div className="pos-con">
                            <label htmlFor={field.position.id}>Position</label>
                            <input
                                type="text"
                                id={field.position.id}
                                name="position"
                                value={field.position.value}
                                onChange={(ev) => handleWorkFields(field.id, ev)}
                            />
                        </div>
                        <div className='date'>
                            <div className="start-date">
                                <label htmlFor={field.workStartDate.id}>Start date</label>
                                <input
                                    type="date"
                                    id={field.workStartDate.id}
                                    name="workStartDate"
                                    value={field.workStartDate.value}
                                    onChange={(ev) => handleWorkFields(field.id, ev)}
                                    />
                            </div>
                            <div className="end-date">
                                <label htmlFor={field.workEndDate.id}>End date</label>
                                <input
                                    type="date"
                                    id={field.workEndDate.id}
                                    name="workEndDate"
                                    value={field.workEndDate.value}
                                    onChange={(ev) => handleWorkFields(field.id, ev)}
                                    />
                            </div>
                        </div>
                        <div>
                            <div className="res-field">
                            <button type='button' className='add-btn' onClick={() => addRes(field.id)}>Add Responsiblity</button>
                                <label>Responsiblities</label>
                                {field.resp.map(res => (
                                    <div key={res.id} className='resp'>
                                        <input type="text" value={res.res} onChange={(ev) => handleRes(field.id, res.id, ev)} />
                                        <button type='button' className='del-btn' onClick={() => delRes(field.id, res.id)} >Del res</button>
                                    </div>
                                ))}
                            </div>
                        <button type="button" className='del-btn' onClick={() => delWork(field.id)}>Del</button>
                        </div>
                    </div>
                    ))}
                    
                </section>
            </aside> : null }
            <div className='cv-area'>
                <div className='personal-details-display'>
                    <h1>{person.firstName} {person.lastName}</h1>
                    <h2>{person.email} </h2>
                    <h2>{person.phoneNo} </h2>
                    {inputs.map(detail => (
                        <h2 key={detail.id}>{detail.value}</h2>
                    ))}
                </div>
                <div className='education-details-display'>
                    <h2>Education</h2>
                    <div className='education-school'>
                        <p>Started studying at {edu.schoolName} from {formatDate(edu.startDate)} to {formatDate(edu.endDate)}. </p>
                    </div>
                    {eduFields.map(field => (
                        <div className='education-school' key={field.id}>
                            <p>Started studying at {field.schoolName.value} from {formatDate(field.startDate.value)} to {formatDate(field.endDate.value)}. </p>
                        </div>
                    ))}        
                </div>
                <div className="work-details-display">
                    <h2>Work experience</h2>
                    {workFields.map(work => (
                        <div key={work.id} className='work-area'>
                            <h2 className='company-name'>{work.companyName.value} </h2>
                            <h3 className='position-name'>Position: {work.position.value} </h3>
                            <p>Started working at {work.companyName.value} as a {work.position.value} from {formatDate(work.workStartDate.value)}  to {formatDate(work.workEndDate.value)}. </p>
                            <p>I was responsible for the following activities:</p>
                            <ul className='resp-list'>
                                {work.resp.map(res => (
                                    <li key={res.id}>{res.res}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </main>

    )
}

export default App;
