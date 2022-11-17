module.exports = {
    paths: {
        "/posts/getAllPosts": {
            get: {
                tags: ["posts"],
                description: "Get all posts with author and comments",
                operationId: "getAllPosts",
                parameters: [],
                responses: {
                    200: {
                        description: "All posts",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/posts",
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
        "/posts/getPosts?page={page}&limit={limit}": {
            get: {
                tags: ["posts"],
                description: "Get all posts with pagination",
                operationId: "getPostsPagination",
                parameters: [ 
                    {
                        name: "page",
                        schema: {
                            type: "integer",
                            example: 1
                        },
                        in: "query",
                        description: "Page for the paginations (Default 1)"
                    },
                    {
                        name: "limit",
                        schema: {
                            type: "integer",
                            example: 10
                        },
                        in: "query",
                        description: "Limit of posts obtained (Default 10)"
                    }
                ],
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/posts",
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
        "/posts/getPostById/{_id}": {
            get: {
                tags: ["posts"],
                description: "Get post by id",
                operationId: "getPostById",
                parameters: [{
                    name: "_id",
                    schema: {
                        type: "objectId",
                    },
                    in: "path",
                    description: "Id of the post",
                }],
                responses: {
                    200: {
                        description: "Post with this id",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/posts",
                                },
                            },
                        },
                    },
                    404: {
                        description: "No post with this id"
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        },
        "/posts/getPostsByTitle/{title}": {
            get: {
                tags: ["posts"],
                description: "Get posts with '{title}' param in their title",
                operationId: "getPostsByTitle",
                parameters: [{
                    name: "title",
                    schema: {
                        type: "string",
                    },
                    in: "path",
                    description: "Title query",
                }],
                responses: {
                    200: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/posts",
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
        "/posts": {
            post: {
                tags: ["posts"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "Create a post. User needs to be authenticated.",
                operationId: "createPost",
                consumes: "multipart/form-data",
                parameters: [],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/postInput",
                            },
                        },
                    },
                },

                responses: {
                    201: {
                        description: "Post created",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/posts",
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
        "/posts/id/{_id}": {
            put: {
                tags: ["posts"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "Update a post. You need to be authenticated as the post author.",
                operationId: "updatePost",
                consumes: "multipart/form-data",
                parameters: [ 
                    {
                        name: "_id",
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
                                $ref: "#/components/schemas/postInput",
                            },
                        },
                    },
                },

                responses: {
                    201: {
                        description: "Post updated",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/posts",
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
            delete: {
                tags: ["posts"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "Delete post by id. User needs to be authenticated as post author.",
                operationId: "deletePost",
                parameters: [ 
                    {
                        name: "_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the post",
                    }
                ],
                responses: {
                    201: {
                        description: "Succesful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/posts",
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
                    404: {
                        description: "Post not found"
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        },
        "/posts/giveLike/{_id}": {
            put: {
                tags: ["posts"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "Give like to a post. User needs to be authenticated.",
                operationId: "giveLike",
                consumes: "multipart/form-data",
                parameters: [ 
                    {
                        name: "_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the post",
                    }
                ],
                responses: {
                    201: {
                        description: "Succesful operation",
                        content: {
                            "text/plain": {
                                schema: {
                                    type: "string",
                                    example: "Succesful like to a post"
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
                        description: "Server error"
                    }
                },
            },
        },
        "/posts/removeLike/{_id}": {
            put: {
                tags: ["posts"],
                security: [{
                    ApiKeyAuth: []
                }],
                description: "Remove like from a post. User needs to be authenticated.",
                operationId: "removeLike",
                parameters: [ 
                    {
                        name: "_id",
                        schema: {
                            type: "objectId",
                        },
                        in: "path",
                        description: "Id of the post",
                    }
                ],
                responses: {
                    201: {
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
                    400: {
                        description: "Bad request"
                    },
                    401: {
                        description: "You are not authenticated"
                    },
                    500: {
                        description: "Server error"
                    }
                },
            },
        }
    }
};