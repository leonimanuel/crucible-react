import React, { useState, useEffect } from "react"

const FormWrapper = ({ children }) => {
	return (
		<div className="modal-form-wrapper">
			{children}
		</div>
	)
}

export default FormWrapper;