function Email ({email, handleEmail}) {
    return (
        <div className="email">
            <label htmlFor="e-mail">Email</label>
            <input type="email" id="e-mail" value={email} onChange={handleEmail} />
        </div>
    )
}

export default Email;