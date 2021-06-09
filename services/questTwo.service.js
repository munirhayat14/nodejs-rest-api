const q1 = require('../services/questOne.service');

module.exports = {
    answer: async (req, res) => {
        try {
            // fetch comment data
            const comments = await q1.fetchData('comments');
            const filters = req.query;

            // filtered comment based on searched words
            const filteredComments = comments.filter(comment => {
                let isValid = true; isMatch = true;
                for (key in filters) {
                    if (!comment[key]){
                        isMatch = false;
                    }
                    if (comment[key].toString().search(filters[key].toString()) < 0) {
                        isMatch = false;
                    }
                    isValid = isValid && isMatch;
                }
                return isValid;
            });

            return res.status(200).json(filteredComments);
        } catch (error) {
            console.log(error);
        }

    }
}