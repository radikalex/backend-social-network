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
                        example: "6374d93fdf49562705c9296f"
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
            posts: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'objectId',
                        description: "Post identification number",
                        example: "6374db44df49562705c92994"
                    },
                    title: {
                        type: 'string',
                        description: "Title of the post",
                        example: "Title 1"
                    },
                    content: {
                        type: "string",
                        description: "Content of the post",
                        example: "This is the content of a post"
                    },
                    userId: {
                        type: "objectId",
                        description: "Id that references the author",
                        example: "6374d93fdf49562705c9296f"
                    },
                    post_img: {
                        type: "string",
                        description: "Path to post image",
                        example: "uploads/posts_images/image.png"
                    },
                    likes: {
                        type: "array",
                        description: "Array with the ids of the users that liked this post",
                        example: []
                    },
                    commentsIds: {
                        type: "array",
                        description: "Array with the ids of the comment in this post",
                        example: []
                    }
                }
            },
            comments: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'objectId',
                        description: "Comment identification number",
                        example: "6374db44df49562705c92994"
                    },
                    content: {
                        type: "string",
                        description: "Content of the comment",
                        example: "This is the content of a comment"
                    },
                    userId: {
                        type: "objectId",
                        description: "Id that references the author of the comment",
                        example: "6374d93fdf49562705c9296f"
                    },
                    postId: {
                        type: "objectId",
                        description: "Id that references the post to which the comment belongs",
                        example: "6374db44df49562705c92994"
                    },
                    comment_img: {
                        type: "string",
                        description: "Path to comment image",
                        example: "uploads/comments_images/image.png"
                    },
                    likes: {
                        type: "array",
                        description: "Array with the ids of the users that liked this post",
                        example: []
                    },
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
            },
            postInput: {
                type: "object",
                properties: {
                    title: {
                        name: "title",
                        schema: {
                            type: "string",
                        },
                        in: "formData",
                        description: "Post title",
                    },
                    content: {
                        name: "content",
                        schema: {
                            type: "string",
                        },
                        in: "formData",
                        description: "Post content",
                    },
                    post_img: {
                        name: "post_img",
                        type: "file",
                        in: "formData",
                        description: "Post image",
                    }
                }
            },
            commentInput: {
                type: "object",
                properties: {
                    content: {
                        name: "content",
                        schema: {
                            type: "string",
                        },
                        in: "formData",
                        description: "Comment content",
                    },
                    comment_img: {
                        name: "comment_img",
                        type: "file",
                        in: "formData",
                        description: "Comment image",
                    }
                }
            }
        }
    }
}