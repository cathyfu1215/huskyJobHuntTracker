import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { newsAPIKey } from "@env";

function News() {
    const [headlines, setHeadlines] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=ca&apiKey=${newsAPIKey}`);
                const data = await response.json();
                //console.log('data', data);
                if (data.articles && data.articles.length > 0) {
                    setHeadlines(data.articles.slice(0, 3).map(article => article.title));
                } else {
                    setError('No news found');
                }
            } catch (error) {
                setError('Error fetching news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []); // Empty dependency array to fetch news only once

    return (
        <View style={{
            margin: 10,
            borderWidth: 2,
            borderColor: 'grey',
            padding: 10,
            backgroundColor: 'white', 
            }}>
            <Text style={{ 
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 10,
                color: 'grey',
             }}>Top news today:</Text>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                headlines.length > 0 ? (
                    <View>
                        {headlines.map((headline, index) => (
                            <Text style={{
                                fontSize: 16,
                                marginBottom: 5,
                                color: 'black',
                            }}key={index}>• {headline}</Text>
                        ))}
                    </View>
                ) : (
                    <Text>{error}</Text>
                )
            )}
        </View>
    );
}

export default News;
