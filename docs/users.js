module.exports = {
    paths: {
        "/users": {
            get: {
                tags: ["users"],
                description: "Get all users",
                operationId: "getAllUsers",
                parameters: [],
                responses: {
                    200: {
                        description: "All users",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
            post: {
                tags: ["users"],
                description: "Create a user",
                operationId: "createUser",
                consumes: "multipart/form-data",
                parameters: [],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/userInput",
                            },
                        },
                    },
                },

                responses: {
                    201: {
                        description: "User created",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        },
        "/users/getLoggedUser": {
            get: {
                tags: ["users"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "Get logged user with their posts and the username of their followers",
                operationId: "getLoggedUser",
                parameters: [],
                responses: {
                    200: {
                        description: "Get logged user",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    401: {
                        description: "You are not authenticated"
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        },
        "/users/id/{_id}": {
            get: {
                tags: ["users"],
                description: "Get user by id",
                operationId: "getUsedById",
                parameters: [{
                    name: "_id",
                    schema: {
                        type: "objectId",
                    },
                    in: "path",
                    description: "Id of user",
                }],
                responses: {
                    200: {
                        description: "User with this id",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    404: {
                        description: "No user with this id"
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        },
        "/users/getUsersByUsername/{username}": {
            get: {
                tags: ["users"],
                description: "Get users with username param in their username",
                operationId: "getUsersByUsername",
                parameters: [{
                    name: "username",
                    schema: {
                        type: "string",
                    },
                    in: "path",
                    description: "Username query",
                }],
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        },
        "/users/confirm/{email}": {
            get: {
                tags: ["users"],
                description: "Confirm email of user",
                operationId: "confirm",
                parameters: [{
                    name: "email",
                    schema: {
                        type: "string",
                    },
                    in: "path",
                    description: "Username email",
                }],
                responses: {
                    201: {
                        description: "Succesful operation",
                        content: {
                            "text/plain": {
                                schema: {
                                    type: "string",
                                    example: "User confirmed successfully"
                                }
                            }
                        },
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        },

        "/users/login": {
            post: {
                tags: ["users"],
                description: "User log in",
                operationId: "logIn",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "email@gmail.com"
                                    },
                                    password: {
                                        type: "string",
                                        example: "123456"
                                    }
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Log in successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Welcome!"
                                        },
                                        token: {
                                            type: "string",
                                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc0ZGEzZGRmNDk1NjI3MDVjOTI5N2UiLCJpYXQiOjE2Njg2ODk0MTR9.oEeI5iEKgKs-n7xS2H2ytOzu48sWd0afQSQVKXvTK3Y"
                                        },

                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Email or password incorrect"
                    },
                    500: {
                        description: "Server error",
                    },
                },
            }
        },
        "/users/logout": {
            post: {
                tags: ["users"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "User log out",
                operationId: "logOut",
                parameters: [],
                responses: {
                    201: {
                        description: "Log in successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Disconnected succesfully"
                                        }
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "You are not authenticated"
                    },
                    500: {
                        description: "Server error",
                    },
                },
            }
        },

        "/users/follow/{_id}": {
            put: {
                tags: ["users"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "User follow",
                operationId: "follow",
                parameters: [{
                    name: "_id",
                    schema: {
                        type: "objectId",
                    },
                    in: "path",
                    description: "Id of user to follow",
                }],
                responses: {
                    201: {
                        description: "Follow successful",
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Follow successful"
                                        }
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad request"
                    },
                    401: {
                        description: "You are not authenticated"
                    },
                    500: {
                        description: "Server error",
                    },
                },
            }
        },

        "/users/unfollow/{_id}": {
            put: {
                tags: ["users"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "User unfollow",
                operationId: "unfollow",
                parameters: [{
                    name: "_id",
                    schema: {
                        type: "objectId",
                    },
                    in: "path",
                    description: "Id of user to unfollow",
                }],
                responses: {
                    201: {
                        description: "Unfollow successful",
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Unfollow successful"
                                        }
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad request"
                    },
                    401: {
                        description: "You are not authenticated"
                    },
                    500: {
                        description: "Server error",
                    },
                },
            }
        },
        "/users/updateLoggedUser": {
            put: {
                tags: ["users"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "Update Logged User",
                operationId: "updateLoggedUser",
                parameters: [],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/userInput",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                }
                            },
                        },
                    },
                    401: {
                        description: "You are not authenticated"
                    },
                    500: {
                        description: "Server error",
                    },
                },
            }
        },
        "/users/{_id}": {
            delete: {
                tags: ["users"],
                description: "Delete user by id",
                operationId: "deleteUsedById",
                parameters: [{
                    name: "_id",
                    schema: {
                        type: "objectId",
                    },
                    in: "path",
                    description: "Id of user",
                }],
                responses: {
                    200: {
                        description: "User with this id",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    404: {
                        description: "No user with this id"
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        }
    },
};