var stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];
var diningLocations = [
    {
        diningLocationName: 'Worcester Dining Commons',
        shortName: 'worcester',
        diningLocationId: '636803044459bcab97ecca71'
    },
    {
        diningLocationName: 'Hampshire Dining Commons',
        shortName: 'hampshire',
        diningLocationId: '636803734459bcab97ecca73'
    },
    {
        diningLocationName: 'Berkshire Dining Commons',
        shortName: 'berkshire',
        diningLocationId: '636803ac4459bcab97ecca74'
    },
    {
        diningLocationName: 'Franklin Dining Commons',
        shortName: 'franklin',
        diningLocationId: '636803f74459bcab97ecca75'
    },
    {
        diningLocationName: 'Procrastination Station',
        shortName: 'procrastination_station',
        diningLocationId: '6369d25f504ed6a0ee5d3638'
    },
    {
        diningLocationName: 'Courtside Cafe',
        shortName: 'courtside_cafe',
        diningLocationId: '6369d48c504ed6a0ee5d3639'
    },
    {
        diningLocationName: 'Roots Café',
        shortName: 'roots_caf',
        diningLocationId: '6369d67f5e1f2faf4db226c2'
    },
    {
        diningLocationName: 'ISB Café',
        shortName: 'isb_caf',
        diningLocationId: '6369dfb161f9f44931d66006'
    },
    {
        diningLocationName: 'Snack Overflow',
        shortName: 'snack_overflow',
        diningLocationId: '6369e02b61f9f44931d66007'
    },
    {
        diningLocationName: 'Whitmore Cafe',
        shortName: 'whitmore_cafe',
        diningLocationId: '63752554c497b09c299218db'
    },
    {
        diningLocationName: 'Worcester Café',
        shortName: 'worcester_caf',
        diningLocationId: '637527b0c497b09c299218de'
    },
    {
        diningLocationName: 'Hampshire Café',
        shortName: 'hampshire_caf',
        diningLocationId: '6376c81d9d51035f3540cf02'
    },
    {
        diningLocationName: 'Morrill Café',
        shortName: 'morrill_caf',
        diningLocationId: '6376c8c39d51035f3540cf03'
    },
    {
        diningLocationName: 'Newman Café',
        shortName: 'newman_caf',
        diningLocationId: '6376cacc9d51035f3540cf04'
    },
    {
        diningLocationName: 'Post & Bean Café',
        shortName: 'post__bean_caf',
        diningLocationId: '6376cfca9d51035f3540cf05'
    },
    {
        diningLocationName: 'Carney Café',
        shortName: 'carney_caf',
        diningLocationId: '6376d1449d51035f3540cf06'
    },
    {
        diningLocationName: 'The Commonwealth Restaurant',
        shortName: 'the_commonwealth_restaurant',
        diningLocationId: '6376d2189d51035f3540cf07'
    },
    {
        diningLocationName: "People's Organic Coffee",
        shortName: 'peoples_organic_coffee',
        diningLocationId: '6376d2819d51035f3540cf08'
    },
    {
        diningLocationName: 'Harvest Market',
        shortName: 'harvest-blue-wall-menu',
        diningLocationId: '6376d2c89d51035f3540cf09'
    },
    {
        diningLocationName: 'Tavola',
        shortName: 'tavola',
        diningLocationId: '6376d31e9d51035f3540cf0a'
    },
    {
        diningLocationName: 'Yum! Bakery',
        shortName: 'yum_bakery',
        diningLocationId: '6376d3509d51035f3540cf0b'
    },
    {
        diningLocationName: 'Green Fields',
        shortName: 'green_fields',
        diningLocationId: '6376d5e89d51035f3540cf0c'
    },
    {
        diningLocationName: 'Tamales',
        shortName: 'tamales',
        diningLocationId: '6376d7879d51035f3540cf0d'
    },
    {
        diningLocationName: 'Wasabi',
        shortName: 'wasabi',
        diningLocationId: '6376d9929d51035f3540cf0e'
    },
    {
        diningLocationName: 'Deli Delish',
        shortName: 'deli_delish',
        diningLocationId: '6376d9f59d51035f3540cf0f'
    },
    {
        diningLocationName: 'Star Ginger',
        shortName: 'star_ginger',
        diningLocationId: '6376dacd9d51035f3540cf10'
    },
    {
        diningLocationName: 'The Grill',
        shortName: 'the_grill',
        diningLocationId: '6376db529d51035f3540cf11'
    },
    {
        diningLocationName: 'Paciugo',
        shortName: 'paciugo',
        diningLocationId: '6376dbc69d51035f3540cf12'
    }
]
module.exports = { stopwords, diningLocations };