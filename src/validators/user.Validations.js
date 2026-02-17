import { body } from "express-validator";

export const userValidations = {
    createUser: [
        body("name").notEmpty().withMessage("Name is required").trim(),
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .trim()
            .isEmail()
            .withMessage("Invalid email format"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long"),
        body("role")
            .notEmpty().withMessage("Role is required")
            .trim()
            .isIn(["admin", "user", "owner", "captain"])
            .withMessage("Role must be either 'admin', 'user', 'captain', or 'owner'")
    ],
    loginUser: [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .trim().isEmail()
            .withMessage("Invalid email format"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
    ],
    updateUser: [
        body("name").optional().notEmpty().withMessage("Name cannot be empty"),
        body("email")
            .optional()
            .isEmail()
            .withMessage("Invalid email format")
            .notEmpty()
            .withMessage("Email is required"),
        body("password")
            .optional()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
            .notEmpty()
            .withMessage("Password is required"),
        body("role")
            .optional()
            .isIn(["admin", "user", "owner", "captain"])
            .withMessage("Role must be either 'admin', 'user', 'captain', or 'owner'")
    ]
};

export default userValidations