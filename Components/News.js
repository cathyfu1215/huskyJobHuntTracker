import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { newsAPIKey } from "@env";

function News({ company }) {
    const [headline, setHeadline] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/everything?q=${company}&from=2024-07-15&sortBy=publishedAt&language=en&apiKey=${newsAPIKey}`);
                const data = await response.json();
                console.log('data', data);
                if (data.articles && data.articles.length > 0) {
                    setHeadline(data.articles[0].title);
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
    }, [company]); // Add company as a dependency to refetch news when company changes

    return (
        <View style={{ margin: 10, borderWidth: 2, borderColor: 'grey', padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Top news today:</Text>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text>{headline || error}</Text>}
        </View>
    );
}

export default News;
