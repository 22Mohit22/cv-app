function Education ({schoolName, startDate, endDate, handleEducation}) {
    return (
        <div className="edu-field">
            <div className="scl-con">
                <label htmlFor="school-name">School name</label>
                <input type="text" id="school-name" value={schoolName} onChange={handleEducation} />
            </div>
            <div className="date">
                <div className="start-date">
                    <label htmlFor="s-date">Start date</label>
                    <input type="date" id="s-date" value={startDate} onChange={handleEducation} />
                </div>
                <div className="end-date">
                    <label htmlFor="e-date">End date</label>
                    <input type="date" id="e-date" value={endDate} onChange={handleEducation} />
                </div>
            </div>
        </div>
    )
}

export default Education;