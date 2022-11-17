module.exports = {
    paths: {
        "/comments/{post_id}": {
            get: {
                tags: ["comments"],
                description: "Get all comments in a post",
                operationId: "getAllCommentsPost",
                parameters: [
                    {
                        name: "post_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the post",
                    }
                ],
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/comments",
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
                tags: ["comments"],
                description: "Create a comment in the post. User must be authenticated.",
                security: [{
                    ApiKeyAuth: []
                }],
                operationId: "createComment",
                parameters: [
                    {
                        name: "post_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the post",
                    }
                ],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/commentInput",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/comments",
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
        "/comments/{_id}": {
            put: {
                tags: ["comments"],
                description: "Update a comment. User must be authenticated as comment author.",
                security: [{
                    ApiKeyAuth: []
                }],
                operationId: "updateComment",
                parameters: [
                    {
                        name: "_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the comment",
                    }
                ],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/commentInput",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/comments",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Comment not found"
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
            delete: {
                tags: ["comments"],
                description: "Delete a comment. User must be authenticated as comment author.",
                security: [{
                    ApiKeyAuth: []
                }],
                operationId: "deleteComment",
                parameters: [
                    {
                        name: "_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the comment",
                    }
                ],
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/comments",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Comment not found"
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        },
        "/comments/giveLike/{_id}": {
            put: {
                tags: ["comments"],
                description: "Give like to a comment. User must be authenticated",
                security: [{
                    ApiKeyAuth: []
                }],
                operationId: "giveLikeComment",
                parameters: [
                    {
                        name: "_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the comment",
                    }
                ],
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "text/plain": {
                                schema: {
                                    type: "string",
                                    example: "Succesful like to a comment"
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
        "/comments/removeLike/{_id}": {
            put: {
                tags: ["comments"],
                description: "Remove like from a comment. User must be authenticated",
                security: [{
                    ApiKeyAuth: []
                }],
                operationId: "removeLikeComment",
                parameters: [
                    {
                        name: "_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the comment",
                    }
                ],
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "text/plain": {
                                schema: {
                                    type: "string",
                                    example: "Succesful remove like from a post"
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
    }
};