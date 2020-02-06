const path = require("path");

module.exports = function (i18n) {
    return global.utils = {
        dirPath: path.join(__dirname, "/../"),
        fixtures: {
            autoLoad: false,
            emptyBase: false
        },
        locales: {
            language: i18n.getLocale(),
            languages: [
                {
                    id: "en",
                    base64: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggc3R5bGU9ImZpbGw6IzQxNDc5QjsiIGQ9Ik00NzMuNjU1LDg4LjI3NkgzOC4zNDVDMTcuMTY3LDg4LjI3NiwwLDEwNS40NDMsMCwxMjYuNjIxVjM4NS4zOGMwLDIxLjE3NywxNy4xNjcsMzguMzQ1LDM4LjM0NSwzOC4zNDVoNDM1LjMxYzIxLjE3NywwLDM4LjM0NS0xNy4xNjcsMzguMzQ1LTM4LjM0NVYxMjYuNjIxQzUxMiwxMDUuNDQzLDQ5NC44MzMsODguMjc2LDQ3My42NTUsODguMjc2eiIvPjxwYXRoIHN0eWxlPSJmaWxsOiNGNUY1RjU7IiBkPSJNNTExLjQ2OSwxMjAuMjgyYy0zLjAyMi0xOC4xNTktMTguNzk3LTMyLjAwNy0zNy44MTQtMzIuMDA3aC05Ljk3N2wtMTYzLjU0LDEwNy4xNDdWODguMjc2aC04OC4yNzZ2MTA3LjE0N0w0OC4zMjIsODguMjc2aC05Ljk3N2MtMTkuMDE3LDAtMzQuNzkyLDEzLjg0Ny0zNy44MTQsMzIuMDA3bDEzOS43NzgsOTEuNThIMHY4OC4yNzZoMTQwLjMwOUwwLjUzMSwzOTEuNzE3YzMuMDIyLDE4LjE1OSwxOC43OTcsMzIuMDA3LDM3LjgxNCwzMi4wMDdoOS45NzdsMTYzLjU0LTEwNy4xNDd2MTA3LjE0N2g4OC4yNzZWMzE2LjU3N2wxNjMuNTQsMTA3LjE0N2g5Ljk3N2MxOS4wMTcsMCwzNC43OTItMTMuODQ3LDM3LjgxNC0zMi4wMDdsLTEzOS43NzgtOTEuNThINTEydi04OC4yNzZIMzcxLjY5MUw1MTEuNDY5LDEyMC4yODJ6Ii8+PGc+PHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGNEI1NTsiIHBvaW50cz0iMjgyLjQ4Myw4OC4yNzYgMjI5LjUxNyw4OC4yNzYgMjI5LjUxNywyMjkuNTE3IDAsMjI5LjUxNyAwLDI4Mi40ODMgMjI5LjUxNywyODIuNDgzIDIyOS41MTcsNDIzLjcyNCAyODIuNDgzLDQyMy43MjQgMjgyLjQ4MywyODIuNDgzIDUxMiwyODIuNDgzIDUxMiwyMjkuNTE3IDI4Mi40ODMsMjI5LjUxNyAiLz48cGF0aCBzdHlsZT0iZmlsbDojRkY0QjU1OyIgZD0iTTI0Ljc5Myw0MjEuMjUybDE4Ni41ODMtMTIxLjExNGgtMzIuNDI4TDkuMjI0LDQxMC4zMUMxMy4zNzcsNDE1LjE1NywxOC43MTQsNDE4Ljk1NSwyNC43OTMsNDIxLjI1MnoiLz48cGF0aCBzdHlsZT0iZmlsbDojRkY0QjU1OyIgZD0iTTM0Ni4zODgsMzAwLjEzOEgzMTMuOTZsMTgwLjcxNiwxMTcuMzA1YzUuMDU3LTMuMzIxLDkuMjc3LTcuODA3LDEyLjI4Ny0xMy4wNzVMMzQ2LjM4OCwzMDAuMTM4eiIvPjxwYXRoIHN0eWxlPSJmaWxsOiNGRjRCNTU7IiBkPSJNNC4wNDksMTA5LjQ3NWwxNTcuNzMsMTAyLjM4N2gzMi40MjhMMTUuNDc1LDk1Ljg0MkMxMC42NzYsOTkuNDE0LDYuNzQ5LDEwNC4wODQsNC4wNDksMTA5LjQ3NXoiLz48cGF0aCBzdHlsZT0iZmlsbDojRkY0QjU1OyIgZD0iTTMzMi41NjYsMjExLjg2MmwxNzAuMDM1LTExMC4zNzVjLTQuMTk5LTQuODMxLTkuNTc4LTguNjA3LTE1LjY5OS0xMC44NkwzMDAuMTM4LDIxMS44NjJIMzMyLjU2NnoiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+"
                },
                {
                    id: "fr",
                    base64: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggc3R5bGU9ImZpbGw6IzQxNDc5QjsiIGQ9Ik0zOC4zNDUsODguMjczQzE3LjE2Nyw4OC4yNzMsMCwxMDUuNDQsMCwxMjYuNjE4djI1OC43NTljMCwyMS4xNzcsMTcuMTY3LDM4LjM0NSwzOC4zNDUsMzguMzQ1aDEzMi4zMjJWODguMjczSDM4LjM0NXoiLz48cmVjdCB4PSIxNzAuNjciIHk9Ijg4LjI3NyIgc3R5bGU9ImZpbGw6I0Y1RjVGNTsiIHdpZHRoPSIxNzAuNjciIGhlaWdodD0iMzM1LjQ1Ii8+PHBhdGggc3R5bGU9ImZpbGw6I0ZGNEI1NTsiIGQ9Ik00NzMuNjU1LDg4LjI3M0gzNDEuMzMzdjMzNS40NDhoMTMyLjMyMmMyMS4xNzcsMCwzOC4zNDUtMTcuMTY3LDM4LjM0NS0zOC4zNDVWMTI2LjYxOEM1MTIsMTA1LjQ0LDQ5NC44MzMsODguMjczLDQ3My42NTUsODguMjczeiIvPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg=="
                }
            ]
        },
        version: require("./../package").version,
        retrieveLocales: false,
        translations: {
            cosmos: {
                singular: "cosmo",
                plural: "cosmos",
                path: "cosmos/",
                cdn: "translations/cosmos/"
            },
            skills: {
                singular: "skill",
                plural: "skills",
                path: "skills/",
                cdn: "translations/skills/"
            },
            saints: {
                singular: "saint",
                plural: "saints",
                path: "saints/",
                cdn: "translations/saints/"
            }
        }
    };
};
