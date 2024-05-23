function PhoneNo ({phoneNo, handlephone}) {
    return (
        <div className="phone-no">
            <label htmlFor="ph-no">Phone no</label>
            <input type="tel" id="ph-no" value={phoneNo} onChange={handlephone} />
        </div>
    )
}

export default PhoneNo;