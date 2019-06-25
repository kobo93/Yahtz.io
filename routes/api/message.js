const express = require("express");
const router = express.Router();
const axios = require("axios");

const giphyKey = process.env.giphyKey || require("../../config/keys").giphyKey;

//@route    GET api/message/giphy
//@desc     Get gifs from giphy API
//@access   Public
router.get("/giphy/:search", (req, res) => {
  axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${
        req.params.search
      }&limit=9&offset=0&rating=G&lang=en`
    )
    .then(response => {
      const gifs = response.data.data.map(gifData => {
        var gif = {};
        gif.preview = gifData.images.downsized_small.mp4;
        gif.gif = gifData.images.fixed_height_small.url;
        return gif;
      });
      res.json(gifs);
    })
    .catch(err => {
            res.status(404).json({ giphy: 'No gifs found' });
    });
});

module.exports = router;
