module.exports = {
    components: {
        securitySchemes: {
            ApiKeyAuth: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        },
        schemas: {
            users: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'objectId',
                        description: "User identification number",
                        example: "6374d93fdf49562705c9296f",
                        required: true
                    },
                    username: {
                        type: 'string',
                        description: "User username",
                        example: "user123"
                    },
                    email: {
                        type: "string",
                        description: "User email",
                        example: "user@gmail.com"
                    },
                    password: {
                        type: "string",
                        description: "User password",
                        example: "123@456"
                    },
                    user_img: {
                        type: "string",
                        description: "Path to user image",
                        example: "uploads/users_images/image.png"
                    },
                    followers: {
                        type: "array",
                        description: "Array with the ids of the followers",
                        example: []
                    },
                    following: {
                        type: "array",
                        description: "Array with the ids of the users that the user follows",
                        example: []
                    },
                    tokens: {
                        type: "array",
                        description: "Array that stores session tokens",
                        example: []
                    },
                    postIds: {
                        type: "array",
                        description: "Array with the ids of post made by user",
                        example: []
                    }
                }
            },
            userInput: {
                type: "object",
                properties: {
                    username: {
                        name: "username",
                        schema: {
                            type: "string",
                        },
                        in: "formData",
                        description: "User username",
                    },
                    email: {
                        name: "email",
                        schema: {
                            type: "string",
                        },
                        in: "formData",
                        description: "User email",
                    },
                    password: {
                        name: "password",
                        schema: {
                            type: "string",
                        },
                        in: "formData",
                        description: "User password",
                    },
                    user_img: {
                        name: "user_img",
                        type: "file",
                        in: "formData",
                        description: "User image",
                    }
                }
            }
        }
    }
}