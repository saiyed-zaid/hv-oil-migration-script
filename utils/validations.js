const { body } = require('express-validator');

exports.CREATE_LOCATION = [
    body('name').notEmpty().withMessage('name field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in location');
            return true;
        })
        .withMessage('Special characters are not allowed in location')
]

const PASSWORD = [
    body('password').notEmpty().withMessage('password field is required')
        .isString().isLength({ min: 5, max: 20 }).withMessage('password should be minimum 5 and maximum 20 characters long')
]

exports.RESET_PASSWORD = [
    body('new_password').notEmpty().withMessage('new_password field is required')
        .isLength({ min: 5, max: 20 }).withMessage('password should be minimum 5 and maximum 20 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~]{8,20}$/)
        .withMessage('Password must contain: uppercase, lowercase, number, special character, and be 8-20 characters long')
        .trim()
        .custom((value, { req }) => {
            if (value == req.body.password) throw new Error('new password can not be as same as old password')
            if (value != req.body.confirm_password) throw new Error('confirm password does not match')
            return true;
        })
]

exports.LOGIN = [
    body('username').notEmpty().withMessage('field username is required')
        .custom(value => {
            const specialCharactersPattern = new RegExp("\\s", "g").test(value);
            if (specialCharactersPattern) throw new Error('White space is not allowed in the username');
            return true;
        }),
    ...PASSWORD
]

exports.FORGET_PASSWORD = [
    body('username').notEmpty().withMessage('field username is required')
        .custom(value => {
            const specialCharactersPattern = new RegExp("\\s", "g").test(value);
            if (specialCharactersPattern) throw new Error('White space is not allowed in the username');
            return true;
        })
]

exports.RESET_PASSWORD_AUTH = [
    body('new_password').notEmpty().withMessage('new password field is required')
        .isLength({ min: 5, max: 20 }).withMessage('password should be minimum 5 and maximum 20 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~]{8,20}$/)
        .withMessage('Password must contain: uppercase, lowercase, number, special character, and be 8-20 characters long')
        .trim(),
    body('confirm_password').notEmpty().withMessage('confirm password field is required')
        .isLength({ min: 5, max: 20 }).withMessage('password should be minimum 5 and maximum 20 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~]{8,20}$/)
        .withMessage('Password must contain: uppercase, lowercase, number, special character, and be 8-20 characters long')
        .trim(),
    body('token').notEmpty().withMessage('field token is required')
]

exports.CHANGE_PASSWORD = [
    ...PASSWORD,
    body('new_password').notEmpty().withMessage('new password field is required')
        .isLength({ min: 5, max: 20 }).withMessage('password should be minimum 5 and maximum 20 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~]{8,20}$/)
        .withMessage('Password must contain: uppercase, lowercase, number, special character, and be 8-20 characters long')
        .trim()
        .custom((value, { req }) => {
            if (value == req.body.password) throw new Error('new password can not be as same as old password')
            if (value != req.body.confirm_password) throw new Error('confirm password does not match')
            return true;
        })
]

exports.NEW_USER_CHANGE_PASSWORD = [
    body('new_password').notEmpty().withMessage('New Password is required'),
    body('id').notEmpty().withMessage('User id is required'),
    body('confirm_password').notEmpty().withMessage('Confirmation of a new password is required')
]

exports.CREATE_COMPANY = [
    body('name').notEmpty().withMessage('name field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in name');
            return true;
        })
        .withMessage('Special characters are not allowed in name'),
]

exports.UPDATE_COMPANY = [
    body('name').optional().notEmpty().withMessage('name field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in name');
            return true;
        })
        .withMessage('Special characters are not allowed in name'),
]

exports.CREATE_DIVISION = [
    body('location_id').notEmpty().withMessage('location field is required'),
    body('company_id').notEmpty().withMessage('company field is required'),
    body('name')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in division name.');
            return true;
        })
        .withMessage('Special characters are not allowed in division name.'),
    body('city').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in city.');
            return true;
        })
        .withMessage('Special characters are not allowed in city.'),
    body('street1').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in street 1.');
            return true;
        })
        .withMessage('Special characters are not allowed in street 1.'),
    body('street2').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in street 2.');
            return true;
        })
        .withMessage('Special characters are not allowed in street 2.'),
    body('state').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in state.');
            return true;
        })
        .withMessage('Special characters are not allowed in state.'),
    body('country').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in country.');
            return true;
        })
        .withMessage('Special characters are not allowed in country.'),
    body('postalcode').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in postal code.');
            return true;
        })
        .withMessage('Special characters are not allowed in postal code.')
        .isLength({ max: 15 }).withMessage('Postal code should be maximum 15 characters long'),
    body('phone_number').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in phone number.');
            return true;
        })
        .withMessage('Special characters are not allowed in phone number.')
        .isLength({ max: 15 })
        .withMessage('Phone number should be maximum 15 digits long'),
    body('fax').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in fax.');
            return true;
        })
        .withMessage('Special characters are not allowed in fax'),
    body('attention').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in attention.');
            return true;
        })
        .withMessage('Special characters are not allowed in attention'),
]

exports.UPDATE_DIVISION = [
    body('location_id').notEmpty().withMessage('location field is required'),
    body('company_id').notEmpty().withMessage('company field is required'),
    body('name')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in division name.');
            return true;
        })
        .withMessage('Special characters are not allowed in division name.'),
    body('city').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in city.');
            return true;
        })
        .withMessage('Special characters are not allowed in city'),
    body('street1').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in street address 1');
            return true;
        })
        .withMessage('Special characters are not allowed in street address 1.'),
    body('street2').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in street address 2.');
            return true;
        })
        .withMessage('Special characters are not allowed in street address 2.'),
    body('state').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in state.');
            return true;
        })
        .withMessage('Special characters are not allowed in state.'),
    body('country').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in country.');
            return true;
        })
        .withMessage('Special characters are not allowed in country.'),
    body('postalcode').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in postal code.');
            return true;
        })
        .withMessage('Special characters are not allowed in postal code.')
        .isLength({ max: 15 }).withMessage('Postal code should be  maximum 15 characters long'),
    body('phone_number').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in phone number.');
            return true;
        })
        .withMessage('Special characters are not allowed in phone number.')
        .isLength({ max: 15 }).withMessage('Phone number should be  maximum 15 characters long'),
    body('fax').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in fax.');
            return true;
        })
        .withMessage('Special characters are not allowed in fax.'),
    body('attention').trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in postal code.');
            return true;
        })
        .withMessage('Special characters are not allowed in postal code.'),
]

exports.CREATE_SHIPPING = [
    body('tracking_number').notEmpty().withMessage('tracking number field is required'),
    body('shipping_date').notEmpty().withMessage('shipping date field is required'),
    body('shipping_type').notEmpty().withMessage('shipping type field is required'),
]

exports.CREATE_SHIPPING_REQUEST = [
    body('shipping_date').notEmpty().withMessage('shipping date field is required')
]

exports.UPDATE_SHIPPING = [
    body('courier').optional().notEmpty().withMessage('courier name field is required'),
    body('tracking_number').optional().notEmpty().withMessage('tracking number field is required'),
    body('shipping_date').optional().notEmpty().withMessage('shipping date field is required'),
    body('shipping_type').optional().notEmpty().withMessage('shipping type field is required'),
    body('no_of_syringes').optional().notEmpty().withMessage('no of syringes field is required'),
]

exports.CREATE_USER = [
    body('role_id').notEmpty().withMessage('role id field is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('first_name').notEmpty().withMessage('first name field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in first name');
            return true;
        })
        .withMessage('Special characters are not allowed'),
    body('last_name').notEmpty().withMessage('last name field is required in first name')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in last name.');

            return true;
        })
        .withMessage('Special characters are not allowed in last name'),
    body('username').notEmpty().withMessage('username field is required').isLength({ min: 10, max: 40 }).withMessage('username should be minimum 10 and maximum 40 characters long')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in username');
            const whiteSpaceCharactersPattern = new RegExp("\\s", "g").test(value);
            if (whiteSpaceCharactersPattern) throw new Error('White space is not allowed in username');
            return true;
        })
        .withMessage('Special characters are not allowed in username'),
    body('division_id').custom(async (value, { req }) => {
        if (parseInt(req.body.role_id) === 1) {
            delete req.body.location_id;
            delete req.body.company_id;
            delete req.body.division_id;
            return true;
        }
        if (req.body.location_id === undefined) {
            throw new Error('location is required');
        } else if (req.body.company_id === undefined) {
            throw new Error('company is required');
        }
        else if (req.body.division_id === undefined) {
            throw new Error('division is required');
        }
        return true;
    }),
    body('status').optional().notEmpty().withMessage('status field is required')
        .isIn(['active', 'in-active']).withMessage('invalid value of field status')
]

exports.UPDATE_USER = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('first_name').optional().notEmpty().withMessage('first name field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in first name');
            return true;
        })
        .withMessage('Special characters are not allowed in first name'),
    body('last_name').optional().notEmpty().withMessage('last name field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in last name');
            return true;
        })
        .withMessage('Special characters are not allowed in last name'),
    body('username').optional().notEmpty().withMessage('username field is required').isLength({ min: 10, max: 40 }).withMessage('username should be minimum 10 and maximum 40 characters long')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in username');
            return true;
        })
        .withMessage('Special characters are not allowed in username'),
    body('status').optional().notEmpty().withMessage('status field is required')
        .isIn(['active', 'in-active']).withMessage('invalid value of field status')
]

exports.IMPORT_FILE = [
    body('path').custom((value, { req }) => {
        if (req.files === null) throw new Error('CSV is required');
        return true;
    }),
]

exports.IMPORT_REPORT_FILE = [
    body('location_id').notEmpty().withMessage('location field is required'),
    body('company_id').notEmpty().withMessage('company field is required'),
    body('division_id').optional().notEmpty().withMessage('division field is required'),
    body('path').custom((value, { req }) => {
        if (req.files === null) throw new Error('CSV is required');
        return true;
    }),
]

exports.CREATE_APPR_TYPE = [
    body('type').notEmpty().withMessage('type field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in type name');
            return true;
        })
        .withMessage('Special characters are not allowed in type name'),
]

exports.CREATE_PERMISSION = [
    body('name').notEmpty().withMessage('name field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in permission name');
            return true;
        })
        .withMessage('Special characters are not allowed in permission name'),
]

exports.CREATE_USER_PERMISSION = [
    body('user_id').notEmpty().withMessage('user_id field is required'),
    body('permission_id').notEmpty().withMessage('permission_id field is required'),
]

exports.CREATE_ROLE = [
    body('name').notEmpty().withMessage('name field is required')
        .trim()
        .custom(value => {
            const specialCharactersPattern = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/);
            if (specialCharactersPattern.test(value)) throw new Error('Special characters are not allowed in role name');
            return true;
        })
        .withMessage('Special characters are not allowed in role name')
]

exports.CREATE_ROLE_PERMISSION = [
    body('role_id').notEmpty().withMessage('role_id field is required'),
    body('permission_id').notEmpty().withMessage('permission_id field is required'),
]