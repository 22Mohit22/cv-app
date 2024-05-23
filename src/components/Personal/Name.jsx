function Name ({firstName, lastName, handleName}) {
    return (
        <div className="fl-name">
            <div className="f-n">
                <label htmlFor="f-name">First name</label>
                <input type="text" id="f-name" value={firstName} onChange={handleName} />
            </div>
            <div className="l-n">
                <label htmlFor="l-name">Last name</label>
                <input type="text" id="l-name" value={lastName} onChange={handleName} />
            </div>
        </div>
    )
}

export default Name;