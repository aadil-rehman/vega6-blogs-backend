const validateEditProfileData = (req) => {
	const allowedEditFields = [
		"firstName",
		"lastName",
		"profileImage",
		"age",
		"gender",
	];

	const isEditAllwoed = Object.keys(req.body).every((field) =>
		allowedEditFields.includes(field)
	);
	return isEditAllwoed;
};

module.exports = { validateEditProfileData };
