export default {
    "scalars": [
        1,
        2,
        5
    ],
    "types": {
        "Billboard": {
            "createdAt": [
                1
            ],
            "deletedAt": [
                1
            ],
            "description": [
                1
            ],
            "id": [
                2
            ],
            "title": [
                1
            ],
            "updatedAt": [
                1
            ],
            "userId": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "ID": {},
        "Mutation": {
            "createBillboard": [
                0,
                {
                    "description": [
                        1,
                        "String!"
                    ],
                    "title": [
                        1,
                        "String!"
                    ],
                    "userID": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "billboard": [
                0,
                {
                    "billboardID": [
                        1,
                        "String!"
                    ]
                }
            ],
            "billboards": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {}
    }
}