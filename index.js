import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.send("OK");
});

server.post("/tweets", (req, res) => {
    const newTweet = req.body;
    tweets.push(newTweet);
    res.send("OK");
});

server.get("/tweets", (req, res) => {
    const visibleTweets = getVisibleTweets();

    res.send(visibleTweets);
});


server.listen(5000);



function getAvatar(username) {
    const user = users.find(value => value.username === username);

    return user.avatar;
}

function getVisibleTweets() {
    const visibleTweets = [];

    if (tweets.length > 0) {
        for (let i = tweets.length - 1; (i >= tweets.length - 10 && i >= 0); i--) {
            const value = tweets[i];

            visibleTweets.push({
                username: value.username,
                avatar: getAvatar(value.username),
                tweet: value.tweet
            });
        }
    }

    return visibleTweets;
}