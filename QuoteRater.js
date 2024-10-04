const QuoteRater = () => {
    const [quotes, setQuotes] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [ratings, setRatings] = React.useState([]);

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    React.useEffect(() => {
        const savedState = localStorage.getItem('quoteRaterState');
        if (savedState) {
            const { quotes, currentIndex, ratings } = JSON.parse(savedState);
            setQuotes(quotes);
            setCurrentIndex(currentIndex);
            setRatings(ratings);
        } else {
            fetch('readwise_data_json_sample.json')
                .then(response => response.json())
                .then(data => {
                    const shuffledData = shuffleArray(data);
                    setQuotes(shuffledData);
                    setRatings(new Array(shuffledData.length).fill(0));
                });
        }
    }, []);

    React.useEffect(() => {
        if (quotes.length > 0) {
            localStorage.setItem('quoteRaterState', JSON.stringify({ quotes, currentIndex, ratings }));
        }
    }, [quotes, currentIndex, ratings]);

    const handleRate = (rating) => {
        const newRatings = [...ratings];
        newRatings[currentIndex] = rating;
        setRatings(newRatings);
        
        // Automatically move to the next unrated quote
        const nextUnratedIndex = newRatings.findIndex((r, i) => r === 0 && i > currentIndex);
        if (nextUnratedIndex !== -1) {
            setCurrentIndex(nextUnratedIndex);
        } else if (currentIndex < quotes.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const exportRatings = () => {
        const ratedQuotes = quotes.map((quote, index) => ({
            bookTitle: quote["Book Title"],
            highlight: quote.Highlight,
            rating: ratings[index]
        }));
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ratedQuotes));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "quote_ratings.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    if (quotes.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuote = quotes[currentIndex];
    const ratedQuotes = ratings.filter(r => r > 0).length;
    const isLastQuote = currentIndex === quotes.length - 1;

    return (
        <div className="quote-rater">
            <div className="quote-card">
                <h2>{currentQuote["Book Title"]}</h2>
                <p>{currentQuote.Highlight}</p>
                <div className="rating">
                    {[1, 2, 3].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= ratings[currentIndex] ? 'filled' : ''}`}
                            onClick={() => handleRate(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <div className="navigation">
                <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous Quote</button>
                <button onClick={exportRatings}>Export Ratings</button>
            </div>
            <div className="progress">
                <p>Quotes rated: {ratedQuotes} / {quotes.length}</p>
                <p>Current quote: {currentIndex + 1} / {quotes.length}</p>
                {isLastQuote && <p>You've reached the last quote. Use the 'Previous' button to review your ratings.</p>}
            </div>
        </div>
    );
};