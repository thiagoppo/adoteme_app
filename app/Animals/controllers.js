const express = require('express'),
router = express.Router();

router.get('/', function(req, res) {
    res.json("bbbb");
});

module.exports = router;
