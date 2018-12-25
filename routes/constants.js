exports.twitter={
    url_get        : "https://api.twitter.com/1.1/statuses/user_timeline.json",
    search_tweet   : "https://api.twitter.com/1.1/search/tweets.json",
    favorite_tweet : "https://api.twitter.com/1.1/favorites/list.json"
}

exports.status ={
    "USER_ALREADY_EXIST" : 201,
    "NO_DATA_FOUND"      : 404,
    "SHOW_ERROR_MESSAGE" : 400,
    "ACTION_COMPLETE"    : 200
 }