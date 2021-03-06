// const express = require('express');
const fetch = require('node-fetch');

const url = "https://jsonplaceholder.typicode.com";

// retrieve JSON data from provided url
async function fetchData(link) {
    const data = await fetch(`${url}/${link}`);
    return await data.json();
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

module.exports = {
    answer: async (req, res) => {
        try {
            const posts = await fetchData('posts');
            const comments = await fetchData('comments');

            //  iterate posts to find total number of comment for each post
            posts.forEach(post => {
                let totalComments = 0
                totalComments = comments.filter((obj) => obj.postId === post.id).length;
                post.total_number_of_comments = totalComments;
            });

            // sort posts list ordered by their number of comments
            const sortedPosts = sortByKey(posts, 'total_number_of_comments');

            // relabel and remove unneeded key
            sortedPosts.forEach(function (post) { 
                post.post_id = post.id;
                delete post.id; 
                post.post_title = post.title;
                delete post.title; 
                post.post_body = post.body;
                delete post.body;
                delete post.userId 
            });

            return res.status(200).json(sortedPosts);
        } catch (error) {
            console.log(error);
        }

    },
    fetchData
}