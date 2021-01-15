const express = require('express');
const router = express.Router();
const data = require('../data/flashcardData.json').data;
const cards = data.cards;

const getRandomCard = () => {
    let id = Math.floor(Math.random() * cards.length)
    return id;
}

router.get('/', (req, res) => {
    res.redirect(`/cards/${getRandomCard()}?side=question`)
});


// working with query strings
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const side = req.query.side;
    const name = req.cookies.username;

    if ( !side ) {
        return res.redirect(`/cards/${id}?side=question`)
    }
    const text = cards[id][side];
    if (side === 'question') {
        const hint = cards[id].hint;
        const otherSide = `${id}?side=answer`;
        const textData = { name, text, hint, otherSide}
        res.render('card.pug', textData)
    } else {
        const otherSide = `${id}?side=question`;
        const textData = { name,text, otherSide}
        res.render('card.pug', textData)
    }
})

module.exports = router;