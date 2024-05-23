import Email from "./Personal/Email";
import Name from "./Personal/Name";
import PhoneNo from "./Personal/PhoneNo";

function PersonalInputs ({person, handleChange, inputs, handlePersonalChange, addPersonal, deletePersonal}) {
    return (
        <div className="p-inp">
            <Name firstName={person.firstName} lastName={person.lastName} handleName={handleChange} />
            <div className="wrapper">
                <Email email={person.email} handleEmail={handleChange} />
                <PhoneNo phoneNo={person.phoneNo} handlephone={handleChange} />
            </div>
            <button type="button" className="add-btn" onClick={() => addPersonal()}>Add More Details</button>

            {/* dynamic added inputs */}

            {inputs.map(input => (
                <div className="i-d" key={input.id}>
                    <input
                        type="text"
                        value={input.value}
                        onChange={(event) => handlePersonalChange(input.id, event)}
                    />
                    <button type="button" className="del-btn" onClick={() => deletePersonal(input.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default PersonalInputs;